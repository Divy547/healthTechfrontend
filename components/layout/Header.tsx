"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  function navClass(path: string) {
    return `text-sm px-3 py-1.5 rounded transition-colors ${
      pathname === path
        ? "bg-zinc-100 text-zinc-900"
        : "text-zinc-600 hover:text-zinc-900"
    }`;
  }

  return (
    <header className="bg-white border-b border-zinc-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  PG
                </span>
              </div>
              <h1 className="text-lg text-zinc-900">
                PharmaGuard
              </h1>
            </Link>

            <nav className="flex items-center gap-4">
              <Link href="/upload" className={navClass("/upload")}>
                Upload
              </Link>

              <Link
                href="/dashboard"
                className={navClass("/dashboard")}
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="text-xs text-zinc-500">
            RIFT 2026 • Precision Medicine Track
          </div>
        </div>
      </div>
    </header>
  );
}
