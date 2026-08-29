"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Users, Building2, Activity, HeartHandshake, Sparkles, ArrowUpRight } from "lucide-react";
import { BidiLTR } from "@/components/ui/BidiLTR";
import { PremiumBackground } from "@/components/premium/PremiumBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StatsSection() {
  const t = useTranslations("StatsSection");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    {
      id: "patients",
      icon: Users,
      value: 500000,
      suffix: "+",
      label: t("patients"),
      desc: t("patients_desc"),
      accent: "from-red-600 to-rose-700",
      glow: "rgba(225, 29, 72, 0.08)",
      numberColor: "text-red-700",
    },
    {
      id: "camps",
      icon: Building2,
      value: 1500,
      suffix: "+",
      label: t("camps"),
      desc: t("camps_desc"),
      accent: "from-emerald-600 to-teal-700",
      glow: "rgba(16, 185, 129, 0.08)",
      numberColor: "text-emerald-700",
    },
    {
      id: "tests",
      icon: Activity,
      value: 200000,
      suffix: "+",
      label: t("tests"),
      desc: t("tests_desc"),
      accent: "from-cyan-600 to-blue-700",
      glow: "rgba(6, 182, 212, 0.08)",
      numberColor: "text-cyan-700",
    },
    {
      id: "volunteers",
      icon: HeartHandshake,
      value: 500,
      suffix: "+",
      label: t("volunteers"),
      desc: t("volunteers_desc"),
      accent: "from-amber-500 to-orange-600",
      glow: "rgba(245, 158, 11, 0.08)",
      numberColor: "text-amber-700",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Header Animation
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

      // Cards Entrance & Number Count-Up Animation
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const stat = stats[idx];
        const numberEl = card.querySelector(".stat-number");
        const iconEl = card.querySelector(".stat-icon");
        const shineEl = card.querySelector(".stat-shine");

        if (prefersReducedMotion) {
          gsap.set(card, { opacity: 1, y: 0 });
          if (numberEl) {
            numberEl.textContent = stat.value.toLocaleString() + stat.suffix;
          }
          return;
        }

        // Entrance
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

        // Count-Up Tween
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

        // Mouse Hover & Tilt Interactions - Caching rect on enter to prevent layout thrashing
        let cachedRect: DOMRect | null = null;

        const handleMouseEnter = () => {
          cachedRect = card.getBoundingClientRect();
          if (iconEl) {
            gsap.to(iconEl, {
              scale: 1.2,
              rotate: 6,
              duration: 0.4,
              ease: "elastic.out(1.2, 0.4)",
            });
          }
          if (shineEl) {
            gsap.fromTo(
              shineEl,
              { x: "-100%" },
              { x: "200%", duration: 0.85, ease: "power2.inOut" }
            );
          }
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!cachedRect) {
            cachedRect = card.getBoundingClientRect();
          }
          const rect = cachedRect;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);

          const rotateY = ((x / rect.width) - 0.5) * 12;
          const rotateX = -((y / rect.height) - 0.5) * 12;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        };

        const handleMouseLeave = () => {
          cachedRect = null;
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
          if (iconEl) {
            gsap.to(iconEl, {
              scale: 1,
              rotate: 0,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-red-50/20 py-20 sm:py-24 lg:py-28 text-gray-900 border-y border-gray-100"
    >
      <PremiumBackground variant="light" showParticles={false} />

      {/* Soft Ambient Radial Background Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="stats-header text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {t("title")}
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("desc")}
          </p>
        </div>

        {/* 4 Impact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group relative rounded-3xl p-6 sm:p-8 bg-white/90 border border-gray-200/90 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform-gpu overflow-hidden hover:border-gray-300"
              >
                {/* Cursor Following Soft Glow Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${stat.glow}, transparent 80%)`,
                  }}
                />

                {/* Shine / Light Sweep Effect */}
                <div className="stat-shine pointer-events-none absolute inset-0 z-10 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12" />

                {/* Card Content Header */}
                <div className="relative z-20 flex items-center justify-between mb-8">
                  <div
                    className={`stat-icon w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.accent} p-3.5 text-white shadow-md flex items-center justify-center`}
                  >
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  <span className="p-2 rounded-full bg-gray-100 border border-gray-200 text-gray-500 group-hover:text-red-600 group-hover:bg-red-50 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Metric Number */}
                <div className="relative z-20 space-y-2">
                  <h3 className={`font-heading text-4xl sm:text-5xl font-black ${stat.numberColor} tracking-tight drop-shadow-sm`}>
                    <BidiLTR className="stat-number">0{stat.suffix}</BidiLTR>
                  </h3>

                  <h4 className="text-base sm:text-lg font-bold text-gray-900 font-heading">
                    {stat.label}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                    {stat.desc}
                  </p>
                </div>

                {/* Bottom Highlight Accent Line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.accent} opacity-70 group-hover:opacity-100 transition-opacity`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
