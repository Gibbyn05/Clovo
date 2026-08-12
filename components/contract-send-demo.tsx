"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Send } from "lucide-react";
import styles from "@/app/landing.module.css";
import interactionStyles from "./contract-send-demo.module.css";

type SendState = "idle" | "sending" | "sent";

export function ContractSendDemo() {
  const [state, setState] = useState<SendState>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const simulateSend = () => {
    if (state !== "idle") return;

    setState("sending");
    timers.current.push(
      setTimeout(() => setState("sent"), 700),
      setTimeout(() => setState("idle"), 3300),
    );
  };

  return (
    <div className={`${styles.contract} ${interactionStyles.contractDemo}`} data-state={state}>
      <span>Avtale_NordicLabs.pdf</span>
      <b>{state === "sent" ? "Klar for mottaker" : "Klar for signering"}</b>
      <button
        type="button"
        onClick={simulateSend}
        disabled={state !== "idle"}
        aria-live="polite"
      >
        <span className={interactionStyles.buttonContent} key={state}>
          {state === "idle" && <><span>Send avtale</span><Send aria-hidden="true" /></>}
          {state === "sending" && <><i className={interactionStyles.spinner} aria-hidden="true" /><span>Sender...</span></>}
          {state === "sent" && <><i className={interactionStyles.check} aria-hidden="true"><Check /></i><span>Mail er sendt!</span></>}
        </span>
      </button>
    </div>
  );
}
