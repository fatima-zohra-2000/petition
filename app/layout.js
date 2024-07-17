// import { Inter } from "next/font/google";
import Head from 'next/head';
import "./globals.css";
// import "globals.css";
// import "../public/fonts/style.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "National Moroccan Student Petition",
  description: "Petion against the normalization of the Moroccan government and some universities with Israel",
  icons: {
    icon: '/logo_unem.png', // /public path
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="ar" dir="rtl">
        <body>
          {children}
        </body>
      </html>
    </>
  );
}