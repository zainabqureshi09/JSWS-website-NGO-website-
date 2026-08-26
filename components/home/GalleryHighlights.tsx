"use client";

import { useTranslations } from "next-intl";
import { Camera } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/premium/PremiumBackground";
import { ScrollReveal } from "@/components/premium/ScrollReveal";
import DomeGallery from "@/components/DomeGallery";

const allPublicImages = [
  // Rehab photos in public root
  "/rehab1.jpeg",
  "/rehab2.jpeg",
  "/rehab3.jpeg",
  "/rehab4.jpeg",
  "/rehab5.jpeg",
  "/rehab6.jpeg",
  "/rehab7.jpeg",
  "/rehab8.jpeg",
  "/rehab9.jpeg",
  "/rehab10.jpeg",

  // JSMDC Doctor Consultation photos in public/doc-img
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.24 PM (1).jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.24 PM.jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.25 PM (1).jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.25 PM (2).jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.25 PM.jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.27 PM.jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.29 PM (1).jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.29 PM (2).jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.29 PM.jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.32 PM (1).jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.32 PM.jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.33 PM.jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.34 PM (1).jpeg",
  "/doc-img/WhatsApp Image 2026-08-25 at 5.00.34 PM.jpeg",

  // SARC Rehabilitation photos in public/sarc-img
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.10 AM.jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.11 AM (1).jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.11 AM (2).jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.11 AM.jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.12 AM (1).jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.12 AM (2).jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.12 AM (3).jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.12 AM.jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.13 AM (1).jpeg",
  "/sarc-img/WhatsApp Image 2026-08-21 at 11.44.13 AM.jpeg",

  // General OPD photos in public/gp
  "/gp/gp1.jpeg",
  "/gp/gp2.jpeg",
  "/gp/gp3.jpeg",
  "/gp/gp4.jpeg",
  "/gp/gp5.jpeg",

  // Physical Therapy photos in public/pt
  "/pt/pt1.jpeg",
  "/pt/pt2.jpeg",
  "/pt/pt3.jpeg",
  "/pt/pt4.jpeg",
  "/pt/pt5.jpeg",
  "/pt/pt6.jpeg",
  "/pt/pt7.jpeg",
  "/pt/pt8.jpeg",
  "/pt/pt9.jpeg",
  "/pt/pt10.jpeg",
  "/pt/pt11.jpeg",

  // Community Welfare photos in public/home-sec
  "/home-sec/WhatsApp Image 2026-08-22 at 8.31.40 PM (1).jpeg",
  "/home-sec/WhatsApp Image 2026-08-22 at 8.31.40 PM (2).jpeg",
  "/home-sec/WhatsApp Image 2026-08-22 at 8.31.40 PM (3).jpeg",
  "/home-sec/WhatsApp Image 2026-08-22 at 8.31.40 PM.jpeg",
  "/home-sec/WhatsApp Image 2026-08-22 at 8.31.41 PM.jpeg",
];

export function GalleryHighlights() {
  const t = useTranslations("GalleryHighlights");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-red-50/20 py-16 sm:py-20 md:py-24 lg:py-28 border-y border-gray-100">
      <PremiumBackground variant="light" showParticles={false} />

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        <ScrollReveal className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700 shadow-sm">
              <Camera className="h-3.5 w-3.5 text-red-600" /> {t("badge")}
            </span>
            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Interactive 3D dome showcase featuring live moments from JSWS healthcare OPD, SARC rehabilitation, doctor consultations, physical therapy, and community welfare camps.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="hidden items-center gap-2 rounded-full border-gray-300 bg-white px-6 font-semibold text-gray-900 shadow-sm hover:bg-red-50 hover:text-[var(--color-primary)] md:flex"
          >
            <Link href="/gallery">
              <span>{t("view_all")}</span>
            </Link>
          </Button>
        </ScrollReveal>

        {/* 3D Interactive Dome Gallery Component with White Theme */}
        <ScrollReveal variant="scale">
          <div className="relative mx-auto h-[550px] sm:h-[650px] md:h-[700px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <DomeGallery
              images={allPublicImages}
              fit={0.65}
              fitBasis="auto"
              overlayBlurColor="#ffffff"
              openedImageWidth="520px"
              openedImageHeight="520px"
              imageBorderRadius="16px"
              openedImageBorderRadius="24px"
              grayscale={false}
            />
          </div>
        </ScrollReveal>

        <div className="mt-8 text-center md:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-gray-300 bg-white py-6 font-semibold text-gray-900 shadow-sm"
          >
            <Link href="/gallery">{t("view_all")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
