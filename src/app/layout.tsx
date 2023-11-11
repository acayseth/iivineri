import "server-only";
import "@/app/globals.css";

import clsx from "clsx";
import React, { ReactNode, Suspense } from "react";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layouts/main.layout";

const inter = Inter({ subsets: ["latin"] });

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ro">
      <body className={clsx(inter.className, "bg-neutral-900")}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
