'use client';

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function Footer() {
  const { t } = useLocale();

  return (
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
              <li><Link href="/#features" className="hover:text-foreground transition-colors">{t.resources}</Link></li>
              <li><Link href="/#pricing" className="hover:text-foreground transition-colors">{t.pricing}</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground transition-colors">{t.faq}</Link></li>
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
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
