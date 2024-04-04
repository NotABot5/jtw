import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ColorSchemeSwitch from "@/components/color_scheme_switch";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JTW - Just The Wisdom",
  description:
    "Aplikacja do tworzenia i rozwiązywania zestawów pytań przygotowujących do sprawdzianów",
  icons: { icon: "./favicon.ico" },
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const color_scheme = cookieStore.get("color_scheme");
  let type = "light";
  if (color_scheme != undefined) {
    type = color_scheme.value;
  }
  return (
    <html lang="en" color-s={type} className="bg-background transition-all">
      <body className={inter.className}>
        <nav className="fixed w-screen bg-background">
          <Link href="/">
            <h1 className="text-center text-primary text-2xl m-2 mb-0 font-black">
              JTW
            </h1>
            <h2 className="text-center text-secondary text-xs mt-0 m-2">
              in development
            </h2>
          </Link>
          <ColorSchemeSwitch type={type} />
          <hr />
        </nav>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center mx-auto max-w-[640px] w-2/3 my-2 mt-20">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
