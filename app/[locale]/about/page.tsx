"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Target, Lightbulb, Users, Clock, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  return (
    <div className="flex flex-col min-h-screen pt-24 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 py-16 text-gray-900 sm:py-20 lg:py-24">
 <div className="absolute inset-y-0 end-0 hidden w-1/2 lg:block">
          <Image
     src="/gp/gp1.jpeg"
     alt="Medical consultation at the JSWS clinic"
     fill
     fetchPriority="high"
     sizes="50vw"
     quality={80}
     className="object-cover"
   />
   <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/70 to-transparent" />
 </div>
 <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className="mx-auto max-w-3xl space-y-6 text-center lg:mx-0 lg:text-left"
 >
 <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{t('hero_title')}</h1>
 <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
 {t('hero_desc')}
 </p>
 </motion.div>
 </div>
 </section>

 {/* Mission & Vision */}
 <section className="py-24 bg-[var(--color-gray-light)]">
 <div className="container mx-auto px-4 md:px-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-[var(--color-primary)]"
 >
 <Target className="w-12 h-12 text-[var(--color-primary)] mb-6"/>
 <h2 className="font-heading text-3xl font-bold mb-4 text-[var(--color-black)]">{t('mission_title')}</h2>
 <p className="text-gray-600 text-lg leading-relaxed">
 {t('mission_desc')}
 </p>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-[var(--color-black)]"
 >
 <Lightbulb className="w-12 h-12 text-[var(--color-black)] mb-6"/>
 <h2 className="font-heading text-3xl font-bold mb-4 text-[var(--color-black)]">{t('vision_title')}</h2>
 <p className="text-gray-600 text-lg leading-relaxed">
 {t('vision_desc')}
 </p>
 </motion.div>
 </div>
 </div>
 </section>

 {/* Core Values */}
 <section className="py-24 bg-white">
 <div className="container mx-auto px-4 md:px-6">
 <div className="text-center max-w-3xl mx-auto mb-16">
 <h2 className="font-heading text-4xl font-bold text-[var(--color-black)] mb-6">{t('values_title')}</h2>
 <p className="text-gray-600 text-lg">
 {t('values_desc')}
 </p>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
 {[
 { icon: Heart, title: t('values.compassion')},
 { icon: Users, title: t('values.humanity')},
 { icon: Trophy, title: t('values.excellence')},
 { icon: Clock, title: t('values.transparency')}
 ].map((value, index) => (
 <motion.div
 key={value.title}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, delay: index * 0.1 }}
 className="flex flex-col items-center text-center p-6 bg-red-50 rounded-2xl"
 >
 <value.icon className="w-10 h-10 text-[var(--color-primary)] mb-4"/>
 <h3 className="font-heading text-xl font-bold text-[var(--color-black)]">{value.title}</h3>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 </div>
 );
}
