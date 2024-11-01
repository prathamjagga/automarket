import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

// import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AutoMarket",
  description: "The Web Platform for Micro-automations",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Suspense>
          <>{children}</>
        </Suspense>
      </body>
    </html>
  );
}
