import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <main className="bg-gray-100 p-4 text-center font-medium dark:bg-zinc-800">
      Built with ❤️ by{" "}
      <Link
        href="https://github.com/0xterrytjw"
        className="underline transition-all hover:text-gray-500"
      >
        @0xterrytjw
      </Link>
    </main>
  );
};

export default Footer;
