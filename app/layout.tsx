import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Ania Gotuje",
  description: "Recipes, discussions and much more",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar/>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
