"use client";

import { type ReactNode } from "react";

import NavbarComponent from "@/components/ui/navbar/navbar.component";
import StandWithUkraineComponent from "@/components/ui/stand-with-ukraine/stand-with-ukraine.component";

interface IProps {
  children: ReactNode;
}

export default function MainLayout({ children }: IProps) {
  return (
    <>
      <NavbarComponent />
      <StandWithUkraineComponent />
      <main className="px-6 mx-auto max-w-screen-md pt-24">{children}</main>
    </>
  );
}
