import "@/styles/globals.css";

import { cookies } from "next/headers";
import { Rubik } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Big Awards",
  description: "The BigAwards Nominations",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${rubik.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <div className="relative h-full w-full justify-center bg-[url(/BigAwardsBG.png)] bg-cover p-5 md:h-screen md:px-40 md:py-4">
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
