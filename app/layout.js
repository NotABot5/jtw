import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JTW - Just The Wisdom",
  description:
    "Aplikacja do tworzenia i rozwiązywania zestawów pytań przygotowujących do sprawdzianów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href="/">Back to homepage</Link>
        {children}
      </body>
    </html>
  );
}
