"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function PlatformHeader() {
  const locale = useLocale();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile header bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[var(--border)] h-14 flex items-center justify-between px-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-1.5 -ml-1.5 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <Link
          href={`/${locale}/platform/chat`}
          className="font-display italic text-[17px] text-[var(--foreground)] tracking-tight"
        >
          CoupleCheck
        </Link>
        {/* spacer */}
        <div className="w-8" />
      </header>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Sidebar drawer */}
          <div className="relative z-10 h-full flex flex-col animate-in slide-in-from-left duration-200">
            <Sidebar onClose={() => setDrawerOpen(false)} />
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-4 right-4 p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
