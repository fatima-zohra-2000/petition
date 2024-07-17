import Head from 'next/head';
import "./globals.css";


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