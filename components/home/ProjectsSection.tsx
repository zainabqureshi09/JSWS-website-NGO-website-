"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeader } from "@/components/premium/SectionHeader";
import { PremiumBackground } from "@/components/premium/PremiumBackground";
import { ScrollReveal } from "@/components/premium/ScrollReveal";

const programs = [
  {
    id: "jsmdc",
    logo: "/jsmdc-logo.png",
    image: "/gp/gp1.jpeg",
    href: "/jsmdc" as const,
  },
  {
    id: "sarc",
    logo: "/sarc-logo.png",
    image: "/rehab1.jpeg",
    href: "/sarc" as const,
  },
  {
    id: "awareness",
    logo: "/cap.png",
    image: "/home-sec/WhatsApp Image 2026-08-22 at 8.31.40 PM.jpeg",
    href: "/awareness" as const,
  },
  {
    id: "masp",
    logo: "/masp.png",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    href: "/scholarships" as const,
  },
];

export function ProjectsSection() {
  const t = useTranslations("HomeProjects");

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <PremiumBackground variant="muted" showParticles={false} />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("badge")}
          title={t("section_title")}
          description={t("section_description")}
        />

        <ScrollReveal
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
          stagger={0.08}
        >
          {programs.map((program) => {
            const title = t(`${program.id}.title`);
            const services = t.raw(`${program.id}.services`) as string[];

            return (
              <article
                key={program.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-[16/8] overflow-hidden bg-gray-100">
                  <Image
                    src={program.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    quality={80}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/45 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/80 bg-white p-2 shadow-sm sm:bottom-5 sm:left-5">
                    <Image
                      src={program.logo}
                      alt=""
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-xl font-semibold leading-snug text-gray-900 sm:text-2xl">
                    {title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {services.slice(0, 2).map((service) => (
                      <li
                        key={service}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={program.href}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
                  >
                    {t("explore_btn")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
