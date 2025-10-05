"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/ambassadors", label: "Ambassadors" },
    { href: "/products", label: "our products" },
    { href: "/sx", label: "$X" },
    { href: "/contact", label: "contact us" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity font-museo">
          xCombinator
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${isActive(link.href)
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
                } ${link.label === "$X" ? "font-medium" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}