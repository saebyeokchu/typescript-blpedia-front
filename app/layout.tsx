import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "blpedia",
  description: "bl추천,집착광공,bl웹툰,bl소설,bl게임,bl커플,bl남자주인공,bl추천,bl검색",
  icons: {
        icon: "/favico.png",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EPV7PWV303"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EPV7PWV303', {
                page_path: window.location.pathname,
              });
            `,
          }}
        ></script>
      </head>
      <body className="bg-black text-black flex justify-center">
        <div className="w-full max-w-[430px] min-h-screen border-x border-gray-200">
          {children}
          {/* Floating Home Button */}
          <Link
            href="/"
            className="fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition z-50"
          >
            🏠 홈으로
          </Link>
        </div>
      </body>
    </html>
  );
}
