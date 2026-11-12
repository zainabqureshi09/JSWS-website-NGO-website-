"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Hospital, 
  Activity, 
  Pill, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Phone, 
  MapPin,
  CheckCircle2,
  Calendar,
  Ear,
  HeartPulse,
  Eye,
  Baby,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BidiLTR } from "@/components/ui/BidiLTR";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function JSMDCPage() {
  const t = useTranslations("JSMDCPage");

  const departments = [
    { title: t("departments.items.opd.title"), icon: Stethoscope, desc: t("departments.items.opd.desc"), timing: t("departments.items.opd.timing") },
    { title: t("departments.items.dental.title"), icon: Activity, desc: t("departments.items.dental.desc"), timing: t("departments.items.dental.timing") },
    { title: t("departments.items.gynecology.title"), icon: Heart, desc: t("departments.items.gynecology.desc"), timing: t("departments.items.gynecology.timing") },
    { title: t("departments.items.ent.title"), icon: Ear, desc: t("departments.items.ent.desc"), timing: t("departments.items.ent.timing") },
    { title: t("departments.items.chest.title"), icon: HeartPulse, desc: t("departments.items.chest.desc"), timing: t("departments.items.chest.timing") },
    { title: t("departments.items.eye.title"), icon: Eye, desc: t("departments.items.eye.desc"), timing: t("departments.items.eye.timing") },
    { title: t("departments.items.mother_and_child.title"), icon: Baby, desc: t("departments.items.mother_and_child.desc"), timing: t("departments.items.mother_and_child.timing") },
    { title: t("departments.items.family_planning.title"), icon: Users, desc: t("departments.items.family_planning.desc"), timing: t("departments.items.family_planning.timing") },
    { title: t("departments.items.pharmacy.title"), icon: Pill, desc: t("departments.items.pharmacy.desc"), timing: t("departments.items.pharmacy.timing") },
    { title: t("departments.items.diagnostic.title"), icon: ShieldCheck, desc: t("departments.items.diagnostic.desc"), timing: t("departments.items.diagnostic.timing") },
  ];

  const docImages = [
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.24 PM (1).jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.24 PM.jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.25 PM (1).jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.25 PM (2).jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.25 PM.jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.27 PM.jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.29 PM (1).jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.29 PM (2).jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.29 PM.jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.32 PM (1).jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.32 PM.jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.33 PM.jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.34 PM (1).jpeg" },
    { src: "/doc-img/WhatsApp Image 2026-08-25 at 5.00.34 PM.jpeg" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/70">
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-xs font-bold text-teal-800 sm:text-sm">
              <Hospital className="h-4 w-4 text-teal-700" aria-hidden="true" />
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              {t("hero.desc")}
            </p>

            <div className="flex flex-wrap gap-2.5 text-xs font-semibold text-gray-700">
              <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                <span>Sindh Health Care Commission (SHCC) Registered &amp; Compliant</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                <span>Licensed Dental Services &amp; Dental X-Ray Facility</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/contact">
                <Button size="lg" className="h-12 rounded-full bg-[var(--color-primary)] px-7 text-white hover:bg-[var(--color-primary-dark)]">
                  <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t("hero.appointmentsBtn")}
                </Button>
              </Link>
              <Link href="/donate?cause=clinic">
                <Button size="lg" variant="outline" className="h-12 rounded-full border-gray-300 px-7 text-gray-800 hover:bg-gray-50">
                  {t("hero.sponsorBtn")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
            <Image
              src="/gp/gp1.jpeg"
              alt={t("gallery.title")}
              width={1000}
              height={750}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={85}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facilities & OPD Departments */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">
              {t("departments.title")}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {t("departments.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, idx) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="h-full rounded-3xl p-6 border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                        {dept.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        {dept.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50/60 px-3 py-2 rounded-xl">
                      <Clock className="w-4 h-4 shrink-0 text-teal-600" />
                      <span>{dept.timing}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-20 space-y-8 border-t border-gray-100 pt-16">
            <div className="mx-auto max-w-2xl space-y-3 text-center">
              <span className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-xs font-bold text-teal-800">
                {t("gallery.badge")}
              </span>
              <h3 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                {t("gallery.title")}
              </h3>
              <p className="text-sm text-gray-600 sm:text-base">
                {t("gallery.desc")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {docImages.map((image, index) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm"
                >
                  <Image
                    src={image.src}
                    alt={`${t("gallery.title")} ${index + 1}`}
                    width={640}
                    height={480}
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    quality={80}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Medicine & Zakat Impact */}

      {/* Free Medicine & Zakat Impact */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-teal-800 text-teal-300 text-xs font-bold">
                {t("gallery.images.6")}
              </div>
              <h2 className="font-heading text-3xl font-bold">
                {t("zakat.title")}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t("zakat.desc")}
              </p>
              <div className="space-y-2 text-sm text-teal-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>{t("zakat.points.1")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>{t("zakat.points.2")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>{t("zakat.points.3")}</span>
                </div>
              </div>
            </div>

            <Card className="p-6 rounded-3xl bg-white text-gray-900 space-y-4 shadow-xl">
              <h3 className="font-heading text-xl font-bold text-teal-950">{t("visit.title")}</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span>{t("visit.address")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-700 shrink-0" />
                  <span>Helpline: <BidiLTR className="font-bold text-gray-900">+92 307 2021882</BidiLTR></span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-700 shrink-0" />
                  <span>{t("visit.timing")}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/donate?cause=patient">
                  <Button className="w-full h-11 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold">
                    {t("visit.sponsorBtn")}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
