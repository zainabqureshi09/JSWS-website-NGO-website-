"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  Pill,
  HeartPulse,
  Eye,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Award,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { DonateModal } from "@/components/donate/DonateModal";
import { GlassCard } from "@/components/premium/GlassCard";
import { PremiumBackground } from "@/components/premium/PremiumBackground";
import { HeroTypewriter } from "./HeroTypewriter";
import { BlurRevealText } from "@/components/premium/TextAnimations";

export function Hero() {
  const t = useTranslations("Hero");
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const magneticBtnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const highlightCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const highlightCards = [
    { icon: Pill, text: t("cards.medicines"), badge: "100% Free" },
    { icon: HeartPulse, text: t("cards.healthcare"), badge: "General OPD" },
    { icon: Eye, text: t("cards.eye"), badge: "Free Screening" },
    { icon: Stethoscope, text: t("cards.dental"), badge: "SHCC Compliant" },
  ];

  const titleHighlight = t("title_highlight").trim();

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Hero Elements Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cursor",
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta-wrap",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          highlightCardsRef.current,
          { opacity: 0, y: 35, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.4"
        );

      // Continuous subtle floating motion on impact cards
      highlightCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: "-=6",
          duration: 2.2 + i * 0.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Magnetic Buttons Hover Interaction
      magneticBtnsRef.current.forEach((btn) => {
        if (!btn) return;
        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);

          gsap.to(btn, {
            x: relX * 0.35,
            y: relY * 0.35,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1.1, 0.4)",
          });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
      });

      // Hero Spotlight & Parallax Background Cursor Track
      const handleHeroMouseMove = (e: MouseEvent) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        heroRef.current?.style.setProperty("--hero-x", `${x}px`);
        heroRef.current?.style.setProperty("--hero-y", `${y}px`);

        // Subtle background video parallax
        const moveX = (e.clientX / window.innerWidth - 0.5) * 15;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 15;

        gsap.to(".hero-video-bg", {
          x: moveX,
          y: moveY,
          duration: 0.8,
          ease: "power1.out",
        });
      };

      heroRef.current?.addEventListener("mousemove", handleHeroMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, [t]);

  const scrollToStats = () => {
    const el = document.getElementById("impact-stats");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden bg-gray-950 py-12 sm:py-16 lg:py-20 text-white"
      >
        <PremiumBackground variant="dark" />

        {/* Cursor Spotlight Soft Radial Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-60"
          style={{
            background: "radial-gradient(600px circle at var(--hero-x, 50%) var(--hero-y, 50%), rgba(225, 29, 72, 0.12), transparent 70%)",
          }}
        />

        {/* Video Background with Gradient Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="hero-video-bg h-full w-full scale-105 object-cover opacity-[0.92] transition-transform duration-700"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero.jpg"
            aria-hidden="true"
          >
            <source src="/jsws-tour.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/45 to-gray-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(225,29,72,0.25),transparent_65%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        </div>

        <div className="container relative z-20 mx-auto flex flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl text-left rtl:text-right">
            
            {/* Credibility Badge */}
            <div className="hero-badge mb-6 inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/15 px-4 py-2 text-xs sm:text-sm font-bold text-red-200 backdrop-blur-xl shadow-lg">
              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{t("credibility_line")}</span>
            </div>

            {/* Live Typing Hero Headline with Cursor at Beginning */}
            <HeroTypewriter
              titleStart={t("title_start")}
              titleHighlight={titleHighlight}
              titleEnd={t("title_end")}
            />

            {/* Supporting Paragraph with Blur Reveal */}
            <BlurRevealText delay={0.4}>
              <p className="hero-desc mb-8 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed drop-shadow-sm font-medium">
                {t("description")}
              </p>
            </BlurRevealText>

            {/* CTAs Wrapper */}
            <div className="hero-cta-wrap mb-12 flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Primary CTA: Explore Impact */}
              <div
                ref={(el) => {
                  magneticBtnsRef.current[0] = el;
                }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={scrollToStats}
                  size="lg"
                  className="flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-rose-700 px-8 text-base font-bold text-white shadow-xl shadow-red-600/40 hover:from-red-500 hover:to-red-600 transition-all transform hover:scale-105"
                >
                  <Sparkles className="h-5 w-5 text-red-200" />
                  <span>{t("explore_impact")}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Button>
              </div>

              {/* Secondary CTA: Get Involved / Donate */}
              <div
                ref={(el) => {
                  magneticBtnsRef.current[1] = el;
                }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => setIsDonateModalOpen(true)}
                  size="lg"
                  variant="outline"
                  className="group flex h-14 w-full sm:w-auto items-center justify-center rounded-full border-white/30 bg-white/10 px-8 text-base font-semibold text-white shadow-lg backdrop-blur-md hover:bg-white hover:text-gray-950 transition-all"
                >
                  <HeartHandshake className="h-5 w-5 text-red-400 group-hover:text-red-600 transition-colors" />
                  <span>{t("get_involved")}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Layered Floating Highlight Badges */}
          <div className="mt-6 grid w-full max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
            {highlightCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    highlightCardsRef.current[index] = el;
                  }}
                >
                  <GlassCard dark tilt={false} className="p-4 sm:p-5 border border-white/10 hover:border-red-500/40 transition-colors">
                    <div className="flex flex-col items-start gap-3">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-800 text-white shadow-md shadow-red-900/50">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-300 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-800/40">
                          {card.badge}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold leading-snug text-white">
                        {card.text}
                      </span>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Donate Modal */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        defaultCategory="general"
      />
    </>
  );
}
