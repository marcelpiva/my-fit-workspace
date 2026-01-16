'use client';

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { flags, localeNames, Locale } from "@/lib/i18n";

export default function Header() {
  const { t, locale, setLocale, flag } = useLocale();
  const locales: Locale[] = ['pt', 'en', 'es'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="myfitplatform"
              width={56}
              height={56}
            />
            <span className="text-2xl tracking-tight"><span className="font-extrabold">myfit</span>platform</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.resources}
            </Link>
            <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.pricing}
            </Link>
            <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.faq}
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.contact}
            </Link>
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
              <div className="absolute right-0 top-full mt-2 bg-card border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[140px]">
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

            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.signIn}
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2.5 hover:bg-primary/90 transition-all"
            >
              {t.getStarted}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
