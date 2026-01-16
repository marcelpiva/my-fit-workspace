'use client';

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { flags, localeNames, Locale } from "@/lib/i18n";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PartnersLogos from "@/components/PartnersLogos";
import AnimatedCounter from "@/components/AnimatedCounter";
import StickyMobileCTA from "@/components/StickyMobileCTA";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const explode = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Animated Section Component
function AnimatedSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const { t, locale, setLocale, flag } = useLocale();
  const locales: Locale[] = ['pt', 'en', 'es'];

  // Parallax refs
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Animated Background Particles - using deterministic positions */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Deterministic positions based on index to avoid hydration mismatch
          const xPercent = ((i * 37) % 100);
          const yPercent = ((i * 53) % 100);
          const duration = 12 + (i % 8) * 2;
          const delay = (i % 5) * 1.2;
          const yOffset = -200 - (i % 5) * 100;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
              }}
              animate={{
                y: [0, yOffset],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Image src="/logo.png" alt="myfitplatform" width={56} height={56} />
              </motion.div>
              <span className="text-2xl tracking-tight"><span className="font-extrabold">myfit</span>platform</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {[
                { href: "#features", label: t.resources, isHash: true },
                { href: "#pricing", label: t.pricing, isHash: true },
                { href: "#faq", label: t.faq, isHash: true },
                { href: "/contact", label: t.contact, isHash: false },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {item.isHash ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                  <span className="text-base">{flag}</span>
                  {locale.toUpperCase()}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-2 bg-card border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[140px] overflow-hidden">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocale(loc)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors w-full text-left ${locale === loc ? 'bg-muted/50' : ''}`}
                    >
                      <span className="text-lg">{flags[loc]}</span>
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t.signIn}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -10px rgba(37, 99, 235, 0.5)" }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2.5 hover:bg-primary/90 transition-all">
                  {t.getStarted}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent"
          animate={{
            background: [
              "linear-gradient(to bottom, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.05), transparent)",
              "linear-gradient(to bottom, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.05), transparent)",
              "linear-gradient(to bottom, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.05), transparent)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Explosive circles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative max-w-5xl mx-auto text-center pt-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-8"
          >
            <motion.span
              className="w-2 h-2 bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {t.badge}
          </motion.div>

          {/* Main Title with staggered animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            {t.heroTitle1}
            <br />
            <motion.span
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              {t.heroTitle2}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-semibold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40"
              >
                {t.getStarted}
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 border-2 border-border bg-background px-8 py-4 font-semibold text-base hover:bg-muted/50 hover:border-foreground/20 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.watchDemo}
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm text-muted-foreground"
          >
            {t.noCard}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Image Showcase with Parallax */}
      <AnimatedSection className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid with hover effects */}
            <motion.div variants={fadeInLeft} className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large image */}
                <motion.div
                  variants={explode}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="col-span-2 relative h-72 overflow-hidden group cursor-pointer"
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop"
                    alt="Personal trainer with client"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <Image src="/logo.png" alt="myfitplatform" width={48} height={48} />
                      <div className="text-white">
                        <div className="font-semibold text-lg">{t.feature1Title}</div>
                        <div className="text-sm opacity-80">{t.exercises}</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Smaller images */}
                <motion.div
                  variants={explode}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative h-52 overflow-hidden group cursor-pointer"
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop"
                    alt="Healthy meal prep"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-semibold">{t.feature2Title}</div>
                  </div>
                </motion.div>

                <motion.div
                  variants={explode}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative h-52 overflow-hidden group cursor-pointer"
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
                    alt="Gym workout"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-semibold">{t.feature3Title}</div>
                  </div>
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 shadow-xl text-sm font-bold z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {t.aiIntegrated}
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInRight} className="lg:pl-8">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium mb-6">
                White-Label Platform
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                {t.featuresTitle}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground mb-8 leading-relaxed">
                {t.featuresSubtitle}
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-4">
                {[
                  { text: t.feature1Title },
                  { text: t.feature2Title },
                  { text: t.feature4Title },
                  { text: t.feature6Title },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <motion.div
                      className="w-6 h-6 bg-primary/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, backgroundColor: "rgba(37, 99, 235, 0.3)" }}
                    >
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    {t.getStarted}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats with Counter Animation */}
      <AnimatedSection className="py-20 px-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 2, suffix: "k+", label: t.professionals, decimals: 0 },
              { end: 50, suffix: "k+", label: t.activeClients, decimals: 0 },
              { end: 1, suffix: "M+", label: t.workoutsCreated, decimals: 0 },
              { end: 4.9, suffix: "", label: t.rating, decimals: 1 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={explode}
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center p-6 bg-background/50 backdrop-blur hover:bg-background transition-all cursor-pointer"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2000 + index * 200}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Partners/Trusted By Section */}
      <PartnersLogos />

      {/* Features with Hover Cards */}
      <AnimatedSection id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium mb-6">
              {t.resources}
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {t.featuresTitle}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t.featuresSubtitle}
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: t.feature1Title, description: t.feature1Desc, color: "primary", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=200&fit=crop" },
              { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: t.feature2Title, description: t.feature2Desc, color: "secondary", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop" },
              { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: t.feature3Title, description: t.feature3Desc, color: "accent", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=200&fit=crop" },
              { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: t.feature4Title, description: t.feature4Desc, color: "primary", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop" },
              { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: t.feature5Title, description: t.feature5Desc, color: "secondary", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: t.feature6Title, description: t.feature6Desc, color: "accent", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                className="group bg-card border border-border/50 overflow-hidden cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <motion.img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-6">
                  <div className={`w-12 h-12 bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                    <svg className={`w-6 h-6 text-${feature.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How it works */}
      <AnimatedSection className="py-24 px-6 bg-gradient-to-b from-muted/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 text-sm font-medium mb-6">
              {t.howItWorks}
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
              {t.howItWorksTitle}
            </motion.h2>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: t.step1Title, description: t.step1Desc },
              { step: "02", title: t.step2Title, description: t.step2Desc },
              { step: "03", title: t.step3Title, description: t.step3Desc },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={explode}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}
                <motion.div
                  className="relative bg-card p-8 border border-border/50 hover:border-primary/30 transition-all"
                  whileHover={{ boxShadow: "0 20px 40px -15px rgba(37, 99, 235, 0.2)" }}
                >
                  <motion.div
                    className="text-6xl font-bold text-primary/20 mb-4"
                    whileHover={{ scale: 1.2, color: "rgba(37, 99, 235, 0.4)" }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6">
              Testimonials
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {t.testimonialsTitle}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t.testimonialsSubtitle}
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: t.testimonial1Name,
                role: t.testimonial1Role,
                text: t.testimonial1Text,
                company: "FitLife Studio",
                img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&h=150&fit=crop&crop=face",
                verified: true
              },
              {
                name: t.testimonial2Name,
                role: t.testimonial2Role,
                text: t.testimonial2Text,
                company: "Elite Training",
                img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=150&h=150&fit=crop&crop=face",
                verified: true
              },
              {
                name: t.testimonial3Name,
                role: t.testimonial3Role,
                text: t.testimonial3Text,
                company: "Iron Gym",
                img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=150&h=150&fit=crop&crop=face",
                verified: true
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                className="bg-card border border-border/50 p-6 relative overflow-hidden"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />

                <div className="flex items-center gap-4 mb-4 relative">
                  <div className="relative">
                    <motion.img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                      whileHover={{ scale: 1.1 }}
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed relative">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection id="pricing" className="py-24 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6">
              {t.pricing}
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {t.pricingTitle}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              {t.pricingSubtitle}
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="p-8 bg-card border border-border/50 hover:border-border transition-all"
            >
              <div className="text-sm font-semibold text-muted-foreground mb-2">{t.free}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">R$0</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">{t.forever}</p>
              <ul className="space-y-4 text-sm mb-8">
                {[t.upTo5Clients, t.tenWorkouts, t.threeMealPlans, t.emailSupport].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/register" className="block w-full text-center py-3.5 border-2 border-border font-semibold text-sm hover:bg-muted/50 transition-all">
                  {t.startFree}
                </Link>
              </motion.div>
            </motion.div>

            {/* Pro - Featured */}
            <motion.div
              variants={explode}
              whileHover={{ y: -15, scale: 1.02 }}
              className="relative p-8 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground shadow-xl shadow-primary/25"
            >
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1.5 shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t.mostPopular}
              </motion.div>
              <div className="text-sm font-semibold opacity-80 mb-2">{t.pro}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">R$97</span>
                <span className="text-sm opacity-80">{t.month}</span>
              </div>
              <p className="text-sm opacity-80 mb-8">{t.everythingToGrow}</p>
              <ul className="space-y-4 text-sm mb-8">
                {[t.unlimitedClients, t.unlimitedWorkouts, t.customBrand, t.payments, t.realtimeChat, t.aiContent, t.prioritySupport].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/register?plan=pro" className="block w-full text-center py-3.5 bg-background text-foreground font-semibold text-sm hover:opacity-90 transition-all">
                  {t.startFreeTrial}
                </Link>
              </motion.div>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="p-8 bg-card border border-border/50 hover:border-border transition-all"
            >
              <div className="text-sm font-semibold text-muted-foreground mb-2">{t.enterprise}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{t.custom}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">{t.tailored}</p>
              <ul className="space-y-4 text-sm mb-8">
                {[t.everythingPro, t.apiAccess, t.ssoSaml, t.slaGuaranteed, t.dedicatedSupport].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" className="block w-full text-center py-3.5 border-2 border-border font-semibold text-sm hover:bg-muted/50 transition-all">
                  {t.talkToSales}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium mb-6">
              {t.faq}
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
              {t.faqTitle}
            </motion.h2>
          </div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A },
            ].map((item, index) => (
              <motion.details
                key={index}
                variants={fadeInUp}
                className="group bg-card border border-border/50 overflow-hidden"
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold hover:bg-muted/50 transition-colors">
                  {item.q}
                  <span className="ml-4 flex-shrink-0 w-8 h-8 bg-muted flex items-center justify-center group-open:bg-primary group-open:text-primary-foreground transition-all">
                    <svg className="w-4 h-4 group-open:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  {item.a}
                </div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={explode}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-secondary p-12 sm:p-16 text-primary-foreground text-center"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              >
                {t.ctaTitle}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl opacity-90 mb-10 max-w-lg mx-auto">
                {t.ctaSubtitle}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-10 py-4 font-semibold text-base hover:opacity-90 transition-all shadow-xl"
                >
                  {t.createFreeAccount}
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/logo.png" alt="myfitplatform" width={36} height={36} />
                <span className="text-xl tracking-tight"><span className="font-extrabold">myfit</span>platform</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.footerDesc}
              </p>
            </div>

            <div>
              <div className="font-semibold mb-4">{t.product}</div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">{t.resources}</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">{t.pricing}</Link></li>
                <li><Link href="#faq" className="hover:text-foreground transition-colors">{t.faq}</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-4">{t.company}</div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">{t.aboutUs}</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">{t.contact}</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">{t.careers}</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-4">{t.legal}</div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">{t.privacy}</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">{t.terms}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 myfitplatform. {t.allRights}</p>
            <div className="flex items-center gap-6">
              {['Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
