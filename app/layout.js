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
        <Link href="/">
          <h1 className="text-center text-cyan-800 text-2xl m-2 font-black">
            JTW
          </h1>
          <hr />
        </Link>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center mx-auto max-w-[640px] w-2/3 mt-4 my-2">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
