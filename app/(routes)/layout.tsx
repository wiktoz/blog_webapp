import type { Metadata } from "next"
import "../globals.css"
import Navbar from "@/app/components/Navbar"
import { UserProvider } from "../context/UserContext"

export const metadata: Metadata = {
  title: "Ania Gotuje",
  description: "Recipes, discussions and much more",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <UserProvider>
          <header>
            <Navbar/>
          </header>
          <main className="m-4">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
