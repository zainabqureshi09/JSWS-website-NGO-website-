"use client";

import Image from "next/image";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function DonationSection() {
  const t = useTranslations("DonatePage");
  const tn = useTranslations("Navigation");
  const th = useTranslations("Hero");

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-12">
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              {tn("donate_dropdown")}
            </span>
            <h2 className="max-w-xl font-heading text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              {t("hero_title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600">
              {t("hero_desc")}
            </p>
            <Link
              href="/donate"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
            >
              {th("donate_now")}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
          <div className="relative min-h-56 sm:min-h-72 md:min-h-full">
            <Image
              src="/home-sec/WhatsApp Image 2026-08-22 at 8.31.40 PM (1).jpeg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
