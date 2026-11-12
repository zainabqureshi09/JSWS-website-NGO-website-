"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Camera } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/premium/ScrollReveal";

const galleryImages = [
  {
    src: "/gp/gp1.jpeg",
    alt: "General Physician Patient Consultation",
  },
  {
    src: "/pt/pt1.jpeg",
    alt: "Physical Therapy Motor Exercises",
  },
  {
    src: "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.10 AM.jpeg",
    alt: "Physical Therapy SARC",
  },
  {
    src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.24 PM (1).jpeg",
    alt: "JSMDC Clinical OPD",
  },
  {
    src: "/rehab3.jpeg",
    alt: "Rehabilitation at JSWS",
  },
  {
    src: "/home-sec/WhatsApp Image 2026-08-22 at 8.31.40 PM.jpeg",
    alt: "JSWS community welfare activity",
  },
];

export function GalleryHighlights() {
  const t = useTranslations("GalleryHighlights");

  return (
    <section className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
              <Camera className="h-4 w-4" aria-hidden="true" />
              {t("badge")}
            </span>
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden rounded-full border-gray-300 bg-white px-5 font-semibold text-gray-900 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] sm:inline-flex"
          >
            <Link href="/gallery">
              {t("view_all")}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galleryImages.map((image) => (
            <Link
              key={image.src}
              href="/gallery"
              aria-label={image.alt}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] sm:rounded-2xl"
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 420px"
                quality={80}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          ))}
        </ScrollReveal>

        <div className="mt-6 sm:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-gray-300 bg-white font-semibold text-gray-900"
          >
            <Link href="/gallery">
              {t("view_all")}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
