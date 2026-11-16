"use client";

import Link from "next/link";
import { useState } from "react";
import { INQUIRE, NAV } from "@/lib/nav";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`font-serif text-[15px] uppercase leading-[1.25] tracking-[0.28em] sm:text-[18px] ${light ? "text-paper" : "text-ocean"}`}
    >
      The
      <br />
      Islanders
      <br />
      Home<span className="text-[10px] tracking-normal">™</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const linkCls = "text-[12px] font-medium uppercase tracking-[0.18em] text-ocean no-underline hover:text-teal";

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-paper/95 backdrop-blur">
      <div className="wrap flex items-center justify-between gap-6 py-4">
        <Link href="/" aria-label="The Islanders Home, home page" className="no-underline" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {NAV.map((g) => (
            <div key={g.label} className="group relative py-3">
              <Link href={g.href} className={linkCls}>
                {g.label}
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 border-t border-gold bg-paper p-5 opacity-0 shadow-[0_18px_40px_-24px_rgba(30,79,91,0.45)] transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {g.items.map((it) => (
                  <Link key={it.label} href={it.href} className="block py-2 text-[14px] text-ink no-underline hover:text-teal">
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href={INQUIRE.href} className="btn btn-ocean !min-h-[46px] !px-4 sm:!px-6" onClick={() => setOpen(false)}>
            {INQUIRE.label}
          </Link>
          <button
            type="button"
            className="btn btn-line !min-h-[46px] !px-3.5 xl:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="site-menu"
          aria-label="Menu"
          className="max-h-[calc(100vh-88px)] overflow-y-auto border-t border-sand bg-ocean text-paper xl:hidden"
        >
          <div className="wrap grid gap-x-8 gap-y-7 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {NAV.map((g) => (
              <div key={g.label} className="border-t border-gold pt-3">
                <Link href={g.href} className="font-serif text-[26px] text-paper no-underline" onClick={() => setOpen(false)}>
                  {g.label}
                </Link>
                {g.items.map((it) => (
                  <Link
                    key={it.label}
                    href={it.href}
                    className="block py-2 text-[15px] text-paper no-underline"
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
