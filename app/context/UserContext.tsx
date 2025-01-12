'use client'

import React, { createContext, useContext, useState } from "react"
import useSWR from "swr"
import { fetcher } from "../utils/fetcher";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type UserContextType = {
  user: UserMeResponseInterface | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isLoggingOut: boolean;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: false,
  error: undefined,
  isLoggingOut: false,
  logout: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user, error, isLoading, mutate } = useSWR<UserMeResponseInterface>("/api/users/me", fetcher);

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const router = useRouter();

  const logout = async () => {
    setIsLoggingOut(true);

    const csrfAccessToken = Cookies.get("csrf_access_token");
    const csrfRefreshToken = Cookies.get("csrf_refresh_token");

    if (!csrfAccessToken || !csrfRefreshToken) {
      throw new Error("CSRF token is missing");
    }

    try {
      // Revoke refresh token
      await fetch("/api/auth/token/revoke/rtoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfRefreshToken,
        },
      });

      // Revoke access token
      await fetch("/api/auth/token/revoke/atoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfAccessToken,
        },
      });

      // Invalidate user cache and redirect
      await mutate(undefined, { revalidate: true });
      setIsLoggingOut(false);
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("Error during logout:", err);
      setIsLoggingOut(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, error, isLoggingOut, logout }}>
      {children}
    </UserContext.Provider>
  );
};
