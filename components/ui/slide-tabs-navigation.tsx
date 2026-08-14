"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { LiquidMetalButton } from "./liquid-metal-button";
import styles from "./slide-tabs-navigation.module.css";

const items = [
  { label: "Hjem", href: "/#hjem" },
  { label: "Funksjoner", href: "/#funksjoner" },
  { label: "Oppsett", href: "/#oppsett" },
  { label: "Priser", href: "/#priser" },
  { label: "Referanser", href: "/referanser" },
  { label: "Kontakt", href: "/kontakt" },
];

export function SlideTabsNavigation() {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 4, width: 64 });
  const [open, setOpen] = useState(false);

  function movePill(index: number) {
    const list = listRef.current;
    const item = itemRefs.current[index];
    if (!list || !item) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    setPill({ left: itemBox.left - listBox.left, width: itemBox.width });
  }

  useEffect(() => {
    const currentTarget = window.location.pathname === "/"
      ? `/${window.location.hash || "#hjem"}`
      : window.location.pathname;
    const initialIndex = Math.max(0, items.findIndex(item => item.href === currentTarget));
    setActiveIndex(initialIndex);
    requestAnimationFrame(() => movePill(initialIndex));

    const resize = () => movePill(activeIndex);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [activeIndex]);

  function select(index: number) {
    setActiveIndex(index);
    movePill(index);
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Hovednavigasjon">
        <Link href="/" className={styles.logo} aria-label="Clovo forside">
          <Image src="/clovo-logo.png" alt="" width={38} height={38} priority /><b>Clovo</b>
        </Link>

        <div
          ref={listRef}
          className={styles.tabs}
          onMouseLeave={() => { setHoveredIndex(null); movePill(activeIndex); }}
        >
          <span
            className={styles.pill}
            style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
            aria-hidden="true"
          />
          {items.map((item, index) => (
            <a
              key={item.label}
              ref={element => { itemRefs.current[index] = element; }}
              href={item.href}
              className={index === (hoveredIndex ?? activeIndex) ? styles.active : ""}
              onMouseEnter={() => { setHoveredIndex(index); movePill(index); }}
              onFocus={() => { setHoveredIndex(index); movePill(index); }}
              onBlur={() => { setHoveredIndex(null); movePill(activeIndex); }}
              onClick={() => select(index)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/login" className={styles.login}>Logg inn</Link>
          <LiquidMetalButton href="/demo" />
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setOpen(value => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <div id="mobile-navigation" className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}>
        {items.map((item, index) => <a key={item.label} href={item.href} onClick={() => select(index)}>{item.label}<span>0{index + 1}</span></a>)}
        <div><Link href="/login">Logg inn</Link><Link href="/demo">Bestill demo <ArrowRight /></Link></div>
      </div>
    </header>
  );
}
