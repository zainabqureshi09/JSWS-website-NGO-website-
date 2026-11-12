"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Users, Building2, Activity, HeartHandshake } from "lucide-react";
import { BidiLTR } from "@/components/ui/BidiLTR";
import { PremiumBackground } from "@/components/premium/PremiumBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StatsSection() {
  const t = useTranslations("StatsSection");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = useMemo(
    () => [
      {
        id: "patients",
        icon: Users,
        value: 500000,
        suffix: "+",
        label: t("patients"),
        desc: t("patients_desc"),
        accent: "from-red-700 to-red-800",
        numberColor: "text-gray-950",
      },
      {
        id: "camps",
        icon: Building2,
        value: 1500,
        suffix: "+",
        label: t("camps"),
        desc: t("camps_desc"),
        accent: "from-red-700 to-red-800",
        numberColor: "text-gray-950",
      },
      {
        id: "tests",
        icon: Activity,
        value: 200000,
        suffix: "+",
        label: t("tests"),
        desc: t("tests_desc"),
        accent: "from-red-700 to-red-800",
        numberColor: "text-gray-950",
      },
      {
        id: "volunteers",
        icon: HeartHandshake,
        value: 500,
        suffix: "+",
        label: t("volunteers"),
        desc: t("volunteers_desc"),
        accent: "from-red-700 to-red-800",
        numberColor: "text-gray-950",
      },
    ],
    [t]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".stats-header", { opacity: 1, y: 0 });
        cardsRef.current.forEach((card, idx) => {
          if (!card) return;
          gsap.set(card, { opacity: 1, y: 0 });
          const numberEl = card.querySelector(".stat-number");
          if (numberEl) {
            numberEl.textContent = stats[idx].value.toLocaleString() + stats[idx].suffix;
          }
        });
        return;
      }

      gsap.fromTo(
        ".stats-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const stat = stats[idx];
        const numberEl = card.querySelector(".stat-number");

        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: idx * 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );

        if (numberEl) {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: stat.value,
            duration: 2.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            onUpdate: () => {
              numberEl.textContent = Math.floor(counterObj.val).toLocaleString() + stat.suffix;
            },
          });
        }

      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-gray-200 bg-white py-16 text-gray-900 sm:py-20 lg:py-24"
    >
      <PremiumBackground variant="light" showParticles={false} />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="stats-header text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-red-800 sm:text-sm">
            <span>{t("badge")}</span>
          </div>

          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.accent} text-white`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className={`font-heading text-3xl font-semibold tracking-tight sm:text-4xl ${stat.numberColor}`}>
                    <BidiLTR className="stat-number">0{stat.suffix}</BidiLTR>
                  </p>

                  <h3 className="font-heading text-base font-semibold text-gray-900 sm:text-lg">
                    {stat.label}
                  </h3>

                  <p className="pt-1 text-sm leading-relaxed text-gray-600">
                    {stat.desc}
                  </p>
                </div>

                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.accent}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
