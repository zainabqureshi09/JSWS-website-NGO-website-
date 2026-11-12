"use client";

import * as React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Activity, Stethoscope, GraduationCap, Megaphone, Pill, HandCoins, Heart, Hospital, ShieldPlus, HeartHandshake, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DonateModal } from "@/components/donate/DonateModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = React.useState(false);
  const [selectedDonateCause] = React.useState<string>("general");
  
  const [activeDesktopDropdown, setActiveDesktopDropdown] = React.useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = React.useState<string | null>(null);

  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const tc = useTranslations('FooterCommon');
  const th = useTranslations('Hero');
  const dropdownTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDesktopDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    dropdownTimeout.current = setTimeout(() => {
      setActiveDesktopDropdown(null);
    }, 150);
  };

  interface NavDropdownItem {
    href: string;
    label: string;
    icon: LucideIcon;
    desc?: string;
    disabled?: boolean;
    cause?: string;
  }

  const programsDropdown: NavDropdownItem[] = [
    { href: "/jsmdc", label: t('jsmdc_full'), icon: Stethoscope, desc: "Medical and Dental Services" },
    { href: "/sarc", label: t('sarc_full'), icon: Activity, desc: "Rehabilitation & Therapy" },
    { href: "/scholarships", label: t('masp_full'), icon: GraduationCap, desc: "Muhammad Aslam Scholarship Program" },
    { href: "/awareness", label: t('awareness'), icon: Megaphone, desc: "Community Health Drives" },
    { href: "#", label: t('dialysis'), icon: ShieldPlus, desc: "Future Expansion Project", disabled: true },
  ];

  const donateDropdown: NavDropdownItem[] = [
    { href: "/donate?cause=zakat", label: t('zakat'), icon: HandCoins, cause: "zakat" },
    { href: "/donate?cause=sadqah", label: t('sadqah'), icon: Heart, cause: "sadqah" },
    { href: "/donate?cause=general", label: t('general_donation'), icon: Heart, cause: "general" },
    { href: "/donate?cause=patient", label: t('sponsor_patient'), icon: Activity, cause: "patient" },
    { href: "/donate?cause=clinic", label: t('sponsor_clinic'), icon: Hospital, cause: "clinic" },
    { href: "/donate?cause=medicines", label: t('sponsor_medicines'), icon: Pill, cause: "medicines" },
    { href: "/donate?cause=equipment", label: t('sponsor_equipment'), icon: Stethoscope, cause: "equipment" },
  ];

  const navLinks = [
    { href: "/", label: t('home') },
    { href: "/about", label: t('about') },
    { id: "programs", label: t('programs'), type: "dropdown", items: programsDropdown },
    { id: "donate", label: t('donate_dropdown'), type: "dropdown", items: donateDropdown },

    { href: "/blog", label: t('blog') },
    { href: "/registration", label: t('registration') },
    { href: "/gallery", label: t('gallery') },
    { href: "/careers", label: t('careers') },
    { href: "/contact", label: t('contact') },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md transition-shadow duration-200",
          isScrolled && "shadow-sm"
        )}
      >
        <div className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-1 px-3 py-1 sm:gap-4 sm:px-6 lg:px-8",
          isScrolled
            ? "h-14 min-h-[3.5rem] sm:h-16 sm:min-h-[4rem]"
            : "h-16 min-h-[4rem] sm:h-18 sm:min-h-[4.5rem]"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group" aria-label="JSWS Home">
            <div className="flex flex-col items-center justify-center">
              <div className={cn(
                "relative flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.02]",
                isScrolled
                  ? "h-9 sm:h-12"
                  : "h-10 sm:h-14"
              )}>
                <Image
                  src="/jsws-logo.png"
                  alt="JSWS Logo"
                  width={180}
                  height={70}
                  priority
                  quality={90}
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="mt-0.5 hidden whitespace-nowrap text-[8px] font-semibold tracking-tight text-gray-600 transition-all duration-300 sm:block sm:text-[10px] md:text-xs">
                {tc('registration_no')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Link Items */}
          <nav
            className="hidden items-center gap-2 2xl:flex 2xl:gap-4"
            aria-label="Main navigation"
            onKeyDown={(event) => {
              if (event.key === "Escape") setActiveDesktopDropdown(null);
            }}
          >
            {navLinks.map((link) => {
              if (link.type === "dropdown") {
                const isOpen = activeDesktopDropdown === link.id;
                return (
                  <div
                    key={link.id}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(link.id as string)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={`navigation-${link.id}`}
                      onClick={() => setActiveDesktopDropdown(isOpen ? null : link.id as string)}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 hover:text-[var(--color-primary)]",
                        isOpen ? "text-[var(--color-primary)]" : "text-black"
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
                    </button>

                    {/* Mega Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          id={`navigation-${link.id}`}
                          className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 border border-gray-100 z-50"
                        >
                          <div className="space-y-1">
                            {link.items?.map((item, idx) => {
                              const ItemIcon = item.icon;
                              return item.disabled ? (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl opacity-50 cursor-not-allowed bg-gray-50/50">
                                  <div className="mt-0.5 p-2 rounded-lg bg-gray-100 text-gray-400">
                                    <ItemIcon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700">{item.label}</h4>
                                    {item.desc && <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>}
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  key={idx}
                                  href={item.href as "/"}
                                  onClick={() => setActiveDesktopDropdown(null)}
                                  className={cn(
                                    "flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-red-50 group/item",
                                    pathname === item.href ? "bg-red-50/50" : ""
                                  )}
                                >
                                  <div className="mt-0.5 p-2 rounded-lg bg-red-50 text-[var(--color-primary)] group-hover/item:bg-[var(--color-primary)] group-hover/item:text-white transition-colors">
                                    <ItemIcon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className={cn(
                                      "text-sm font-medium transition-colors group-hover/item:text-[var(--color-primary)]",
                                      pathname === item.href ? "text-[var(--color-primary)]" : "text-gray-700"
                                    )}>
                                      {item.label}
                                    </h4>
                                    {item.desc && <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href as "/"}
                  className={cn(
                    "whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors",
                    link.href === "/contact" && "border border-gray-300 text-gray-900 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
                    pathname === link.href
                      ? "text-[var(--color-primary)]"
                      : "text-black"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden shrink-0 items-center gap-3 2xl:flex">
            <LanguageSwitcher />
            <Button
              onClick={() => setIsDonateModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-dark)]"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{th("donate_now")}</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 2xl:hidden">
            <Button
              onClick={() => setIsDonateModalOpen(true)}
              aria-label={th("donate_now")}
              size="sm"
              className="whitespace-nowrap rounded-full bg-[var(--color-primary)] px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-primary-dark)] sm:px-3"
            >
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{th("donate_now")}</span>
            </Button>
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="rounded-full bg-white/50 p-2 text-gray-700 transition-colors hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              id="mobile-navigation"
              className="absolute top-full left-0 right-0 overflow-hidden border-b border-gray-200 bg-white shadow-lg 2xl:hidden"
            >
              <nav className="flex max-h-[80vh] flex-col space-y-0.5 overflow-y-auto p-3 sm:space-y-1 sm:p-4" aria-label="Main navigation">
                {navLinks.map((link) => {
                  if (link.type === "dropdown") {
                    const isMobileActive = activeMobileDropdown === link.id;
                    return (
                      <div key={link.id} className="flex flex-col">
                        <button
                          onClick={() => setActiveMobileDropdown(isMobileActive ? null : link.id as string)}
                          className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px]"
                        >
                          {link.label}
                          <ChevronDown className={cn("w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 shrink-0", isMobileActive && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {isMobileActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-5 sm:pl-6 pr-3 sm:pr-4 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1 bg-gray-50/50 rounded-xl mt-1">
                                {link.items?.map((item, idx) => (
                                  item.disabled ? (
                                    <div key={idx} className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-400 cursor-not-allowed min-h-[40px] flex items-center">
                                      {item.label}
                                    </div>
                                  ) : (
                                    <Link
                                      key={idx}
                                      href={item.href as "/"}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className={cn(
                                        "block px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[40px]",
                                        pathname === item.href
                                          ? "text-[var(--color-primary)] bg-red-50"
                                          : "text-black hover:text-gray-500 hover:bg-gray-50"
                                      )}
                                    >
                                      {item.label}
                                    </Link>
                                  )
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href as "/"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-colors min-h-[44px]",
                        pathname === link.href
                          ? "text-[var(--color-primary)] bg-red-50"
                          : "text-black hover:text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 sm:pt-4 mt-2 border-t border-gray-100">
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsDonateModalOpen(true);
                    }}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] py-4 text-sm font-semibold shadow-sm hover:bg-[var(--color-primary-dark)] sm:py-5 sm:text-base"
                  >
                    <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{th("donate_now")}</span>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Quick Donate Modal */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        defaultCategory={selectedDonateCause}
      />
    </>
  );
}
