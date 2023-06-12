"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaHome, FaDatabase, FaTv } from "react-icons/fa";
import CustomLink from "./CustomLink";
import DarkModeToggle from "./Toggle/DarkModeToggle";
import { ThemeContext } from "../utils/context";
import { useTheme } from "@/lib/hooks";
import { signOut } from "next-auth/react";
import Footer from "./Footer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NavbarProps = {
  children?: React.ReactNode;
};
const Navbar = ({ children }: NavbarProps) => {
  const drawerToggleRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // to automatically close daisyUI side drawer when route changes
  useEffect(() => {
    if (drawerToggleRef.current && drawerToggleRef.current.checked === true) {
      drawerToggleRef.current.checked = false;
    }
  }, [pathname, searchParams]);

  const [theme, toggleTheme] = useTheme();
  const themeMode = theme === "business" ? "dark" : "light"; // for tailwind CSS dark: prefix to work

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={themeMode}>
        <div className="drawer">
          <input
            id="drawer-toggle"
            ref={drawerToggleRef}
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content flex flex-col">
            {/* <!-- Navbar --> */}
            <div className="navbar fixed z-50 w-full bg-base-100 shadow-md">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="drawer-toggle"
                  className="btn-ghost btn-square btn"
                >
                  <HiOutlineMenuAlt2 className="h-6 w-6" />
                </label>
              </div>
              <div className="absolute left-1/2 flex-1 -translate-x-1/2 px-2 lg:static lg:left-0 lg:mx-2 lg:translate-x-0">
                <CustomLink
                  href="/"
                  className="text-xl font-extrabold tracking-tighter"
                >
                  Next.js GPT
                </CustomLink>
              </div>
              <div className="hidden lg:flex">
                {/* <CustomLink
                  href="/fe-playground"
                  className="mx-2 font-semibold"
                >
                  FE Playground
                </CustomLink>
                <CustomLink
                  href="/be-playground"
                  className="mx-2 font-semibold"
                >
                  BE Playground
                </CustomLink> */}
                <div className="mr-4 font-semibold">
                  <Popover>
                    <PopoverTrigger>Features</PopoverTrigger>
                    <PopoverContent className="mt-2">
                      <ul className="font-medium">
                        <li>🚀 LangChain</li>
                        <li>🚀 OpenAI GPT-3.5-turbo</li>
                        <li>🚀 OpenAI Embedding</li>
                        <li>🚀 Streaming</li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mx-4">
                  <DarkModeToggle />
                </div>
              </div>
            </div>
            {/* <!-- Page content here --> */}
            <div className="h-20" />

            {children}

            <Footer />
          </div>
          <div className="drawer-side">
            <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
            <ul className="menu w-80 bg-base-100 p-4 font-medium text-gray-500 dark:text-gray-100">
              {/* <!-- Sidebar content here --> */}
              <li>
                <Link href="/" className="active:bg-white/0">
                  <FaHome />
                  Home
                </Link>
              </li>

              <div className="divider mt-auto" />

              <div className="ml-2 pb-4">
                <DarkModeToggle />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Navbar;
