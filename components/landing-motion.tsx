"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingMotion() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.timeline({ defaults: { ease: "power1.out" } })
      .from("[data-hero-line]", { autoAlpha: 0, y: 16, duration: 0.42, stagger: 0.07 })
      .from("[data-hero-copy]", { autoAlpha: 0, y: 10, duration: 0.34 }, "-=0.2")
      .from("[data-hero-dashboard]", { autoAlpha: 0, y: 16, duration: 0.48 }, "-=0.18");

    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: elements => gsap.from(elements, {
        autoAlpha: 0,
        y: 14,
        duration: 0.38,
        stagger: 0.035,
        ease: "power1.out",
        clearProps: "opacity,visibility,transform",
      }),
    });
  });

  return null;
}
