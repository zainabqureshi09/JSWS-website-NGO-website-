"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { HeartPulse, HeartHandshake, Pill, ShieldCheck, Eye, Stethoscope, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { DonateModal } from "@/components/donate/DonateModal";
import { HeroTypewriter } from "./HeroTypewriter";
import { GlassCard } from "@/components/premium/GlassCard";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const t = useTranslations("Hero");
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const highlights = [
    { icon: Pill, text: t("cards.medicines"), badge: "100% Free" },
    { icon: HeartPulse, text: t("cards.healthcare"), badge: "General OPD" },
    { icon: Eye, text: t("cards.eye"), badge: "Free Screening" },
    { icon: Stethoscope, text: t("cards.dental"), badge: "SHCC Compliant" },
  ];

  const scrollToStats = () => {
    document.getElementById("impact-stats")?.scrollIntoView({ behavior: "smooth" });
  };

  useGSAP(
    () => {
      const section = heroRef.current;
      if (!section) return;

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      entrance.fromTo(
        ".hero-entrance-badge",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0.15,
      );
      entrance.fromTo(
        ".hero-entrance-description",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.65 },
        0.65,
      );
      entrance.fromTo(
        ".hero-entrance-actions",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.82,
      );
      entrance.fromTo(
        ".hero-entrance-card",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
        0.95,
      );

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        entrance.progress(1);
        return;
      }

      const media = gsap.matchMedia();
      media.add("(hover: hover) and (pointer: fine)", () => {
        const spotlight = spotlightRef.current;
        if (!spotlight) return;

        gsap.set(spotlight, { xPercent: -50, yPercent: -50 });
        const moveX = gsap.quickTo(spotlight, "x", { duration: 0.65, ease: "power3.out" });
        const moveY = gsap.quickTo(spotlight, "y", { duration: 0.65, ease: "power3.out" });
        const onPointerMove = (event: PointerEvent) => {
          const bounds = section.getBoundingClientRect();
          moveX(event.clientX - bounds.left);
          moveY(event.clientY - bounds.top);
        };
        const onPointerEnter = () => gsap.to(spotlight, { autoAlpha: 1, duration: 0.35 });
        const onPointerLeave = () => gsap.to(spotlight, { autoAlpha: 0, duration: 0.4 });

        section.addEventListener("pointermove", onPointerMove);
        section.addEventListener("pointerenter", onPointerEnter);
        section.addEventListener("pointerleave", onPointerLeave);

        const magneticButtons = gsap.utils.toArray<HTMLButtonElement>(
          "[data-hero-magnetic]",
          section,
        );
        const removeMagneticListeners = magneticButtons.map((button) => {
          const onMove = (event: PointerEvent) => {
            const bounds = button.getBoundingClientRect();
            const offsetX = event.clientX - bounds.left - bounds.width / 2;
            const offsetY = event.clientY - bounds.top - bounds.height / 2;
            gsap.to(button, {
              x: offsetX * 0.08,
              y: offsetY * 0.08,
              duration: 0.35,
              ease: "power3.out",
              overwrite: true,
            });
          };
          const onLeave = () =>
            gsap.to(button, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.55)" });

          button.addEventListener("pointermove", onMove);
          button.addEventListener("pointerleave", onLeave);
          return () => {
            button.removeEventListener("pointermove", onMove);
            button.removeEventListener("pointerleave", onLeave);
          };
        });

        return () => {
          section.removeEventListener("pointermove", onPointerMove);
          section.removeEventListener("pointerenter", onPointerEnter);
          section.removeEventListener("pointerleave", onPointerLeave);
          removeMagneticListeners.forEach((remove) => remove());
          gsap.killTweensOf([spotlight, ...magneticButtons]);
        };
      });

      return () => media.revert();
    },
    { scope: heroRef },
  );

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[38rem] flex-col justify-center overflow-hidden bg-gray-950 py-16 text-white sm:min-h-[42rem] lg:min-h-[44rem]"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/hero.jpg"
            alt=""
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            fill
            quality={85}
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-gray-950/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-950/70 to-transparent" />
        </div>
        <div ref={spotlightRef} className="hero-spotlight" aria-hidden="true" />

        <div className="container relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-left rtl:text-right">
            <div className="hero-entrance-badge mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/20 bg-gray-950/45 px-4 py-2 text-xs font-semibold text-white/90 shadow-sm backdrop-blur-sm sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
              <span>{t("credibility_line")}</span>
            </div>

            <HeroTypewriter
              titleStart={t("title_start")}
              titleHighlight={t("title_highlight").trim()}
              titleEnd={t("title_end")}
            />

            <p className="hero-entrance-description mb-8 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {t("description")}
            </p>

            <div className="hero-entrance-actions mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                data-hero-magnetic
                onClick={scrollToStats}
                size="lg"
                className="h-12 w-full rounded-full bg-[var(--color-primary)] px-7 font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-dark)] sm:w-auto"
              >
                <span>{t("explore_impact")}</span>
                <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Button>
              <Button
                data-hero-magnetic
                onClick={() => setIsDonateModalOpen(true)}
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-full border-white/50 bg-white/5 px-7 font-semibold text-white hover:bg-white hover:text-gray-950 sm:w-auto"
              >
                <HeartHandshake className="me-2 h-4 w-4" />
                <span>{t("get_involved")}</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {highlights.map(({ icon: Icon, text, badge }) => (
              <GlassCard
                key={text}
                dark
                tilt={false}
                className="hero-entrance-card border-white/20 bg-gray-950/35 p-4 shadow-sm backdrop-blur-sm sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-red-100">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-right text-[10px] font-medium text-white/75 sm:text-xs">
                    {badge}
                  </span>
                </div>
                <p className="text-xs font-medium leading-snug text-white sm:text-sm">{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        defaultCategory="general"
      />
    </>
  );
}
