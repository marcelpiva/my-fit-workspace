'use client';

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const { t } = useLocale();

  const values = [
    { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: t.value1Title, desc: t.value1Desc, color: "primary" },
    { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", title: t.value2Title, desc: t.value2Desc, color: "secondary" },
    { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: t.value3Title, desc: t.value3Desc, color: "accent" },
    { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: t.value4Title, desc: t.value4Desc, color: "primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6">
            {t.company}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {t.aboutTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.aboutSubtitle}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">{t.ourMission}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.missionText}
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 p-8">
              <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">{t.ourVision}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t.ourValues}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-card border border-border/50 p-6 text-center">
                <div className={`w-12 h-12 bg-${value.color}/10 flex items-center justify-center mx-auto mb-4`}>
                  <svg className={`w-6 h-6 text-${value.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                {t.ourStory}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.storyText}
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">2k+</div>
                  <div className="text-sm text-muted-foreground">{t.professionals}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">50k+</div>
                  <div className="text-sm text-muted-foreground">{t.activeClients}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">4.9</div>
                  <div className="text-sm text-muted-foreground">{t.rating}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl opacity-50" />
              <Image
                src="/logo.png"
                alt="myfitplatform App"
                width={250}
                height={250}
                className="relative mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary via-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t.joinUs}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            {t.joinUsText}
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 font-semibold hover:opacity-90 transition-all"
          >
            {t.viewOpenings}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
