"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  brandIcon?: React.ReactNode;
  className?: string;
}

const defaultNavLinks = [
  { label: "Hjem", href: "#hjem" },
  { label: "Funksjoner", href: "#funksjoner" },
  { label: "Oppsett", href: "#oppsett" },
  { label: "Priser", href: "#priser" },
  { label: "Referanser", href: "/referanser" },
  { label: "Kontakt", href: "/kontakt" },
];

const defaultSocialLinks = [
  {
    icon: <EnvelopeSimple className="size-5" aria-hidden="true" />,
    href: "/demo",
    label: "Bestill demo av Clovo",
  },
];

export function Footer({
  brandName = "Clovo",
  brandDescription = "Salgsdashboard bygget rundt teamet, prosessen og målene deres.",
  socialLinks = defaultSocialLinks,
  navLinks = defaultNavLinks,
  brandIcon,
  className,
}: FooterProps) {
  const reveal = "translate-y-0 opacity-100";

  return (
    <section
      data-reveal
      className={cn("relative mt-0 w-full overflow-hidden", className)}
    >
      <footer className="relative mt-20 overflow-hidden border-t border-[#e8e8e8] bg-[linear-gradient(180deg,#ffffff_0%,#fffaf8_100%)]">
        <div className="relative z-20 mx-auto flex min-h-[34rem] max-w-7xl flex-col justify-between px-5 py-12 sm:min-h-[38rem] sm:px-8 md:min-h-[42rem]">
          <div className={cn("flex w-full flex-col items-center", reveal)}>
            <Link
              href="/"
              className="group flex items-center gap-2 text-3xl font-bold tracking-[-0.04em] text-[#1b1b1d]"
            >
              <Image src="/clovo-logo.png" alt="" width={36} height={36} className="size-9 rounded-xl shadow-[0_8px_22px_rgba(255,91,53,0.24)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
              {brandName}
            </Link>

            <p className="mt-4 max-w-md px-4 text-center text-sm font-medium leading-6 text-[#747477] sm:text-base">
              {brandDescription}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="grid size-11 place-items-center rounded-full border border-[#e8e8e8] bg-white text-[#5f6064] transition-[color,border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#ffb8a7] hover:text-[#d94725] hover:shadow-[0_8px_24px_rgba(255,91,53,0.12)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#ffb8a7]"
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {navLinks.length > 0 && (
              <nav
                aria-label="Bunnavigasjon"
                className="mt-7 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-3 px-4 text-sm font-semibold text-[#747477]"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    className="relative flex min-h-11 items-center px-1 transition-colors duration-300 after:absolute after:bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#ff5b35] after:transition-[width] after:duration-300 hover:text-[#1b1b1d] hover:after:w-full focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#ffb8a7]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div
            className={cn(
              "flex flex-col items-center justify-center gap-2 px-4 text-center text-sm text-[#8b8b8f] md:flex-row md:justify-between md:px-0 md:text-left",
              reveal,
            )}
            style={{ transitionDelay: "140ms" }}
          >
            <p>© {new Date().getFullYear()} {brandName}. Alle rettigheter reservert.</p>
            <div className="flex gap-5">
              <Link href="/kontakt" className="flex min-h-11 items-center transition-colors hover:text-[#1b1b1d]">Kontakt</Link>
              <Link href="/login" className="flex min-h-11 items-center transition-colors hover:text-[#1b1b1d]">Logg inn</Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-36 left-1/2 max-w-[95vw] -translate-x-1/2 select-none bg-gradient-to-b from-[#ff5b35]/20 via-[#ff5b35]/8 to-transparent bg-clip-text px-4 text-center font-extrabold leading-none tracking-[-0.075em] text-transparent opacity-0 transition-opacity duration-1000 motion-reduce:opacity-100 motion-reduce:transition-none md:bottom-32",
            "opacity-100",
          )}
          style={{ fontSize: "clamp(4rem, 14vw, 11rem)", transitionDelay: "220ms" }}
        >
          {brandName.toUpperCase()}
        </div>

        <div
          className={cn(
            "absolute bottom-24 left-1/2 z-30 flex -translate-x-1/2 translate-y-5 items-center justify-center rounded-3xl border-2 border-[#ffd8cf] bg-white/70 p-3 opacity-0 shadow-[0_14px_50px_rgba(72,31,20,0.16)] backdrop-blur-md transition-[opacity,transform,border-color] duration-700 hover:border-[#ff5b35] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none md:bottom-20",
            "translate-y-0 opacity-100",
          )}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="grid size-16 place-items-center overflow-hidden rounded-2xl shadow-[0_12px_26px_rgba(255,91,53,0.28)] transition-transform duration-500 hover:rotate-6 hover:scale-105 md:size-24">
            {brandIcon || <Image src="/clovo-logo.png" alt="" width={96} height={96} className="size-full" />}
          </div>
        </div>

        <div className="absolute bottom-32 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffc6b8] to-transparent sm:bottom-[8.5rem]" />
        <div className="absolute bottom-28 h-24 w-full bg-gradient-to-t from-white via-white/85 to-white/20 blur-[1em]" />
      </footer>
    </section>
  );
}
