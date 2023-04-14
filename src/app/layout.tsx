import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
   title: "Oikein",
};

const font = Inter({
   subsets: ["latin-ext"],
   variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="fi">
         <body className={`${font.variable} font-sans text-base`}>{children}</body>
      </html>
   );
}
