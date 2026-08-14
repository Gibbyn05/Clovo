"use client";

import { CheckCircle2, LockKeyhole } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./dashboard-demo-interactions.module.css";

type DemoInteractionsProps = { theme: "growth" | "nord" | "pulse" };

export function DashboardDemoInteractions({ theme }: DemoInteractionsProps) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-demo-action]");
      if (!target) return;
      event.preventDefault();
      const tabGroup = target.dataset.demoTabGroup;
      if (tabGroup) document.querySelectorAll<HTMLElement>(`[data-demo-tab-group="${tabGroup}"]`).forEach(item => item.setAttribute("aria-pressed", String(item === target)));
      setMessage(target.dataset.demoAction || "Denne handlingen er kun en forhåndsvisning.");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(""), 2600);
    }
    document.addEventListener("click", handleClick);
    return () => { document.removeEventListener("click", handleClick); if (timer.current) clearTimeout(timer.current); };
  }, []);

  return <div className={`${styles.toast} ${styles[theme]} ${message ? styles.visible : ""}`} role="status" aria-live="polite"><span>{message.includes("Skrivebeskyttet") ? <LockKeyhole /> : <CheckCircle2 />}</span><div><b>Interaktiv demo</b><p>{message}</p></div></div>;
}
