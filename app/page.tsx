import { fetchSanityData } from "@/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  SERVICES_QUERY,
  PORTFOLIO_QUERY,
  TESTIMONIALS_QUERY,
  STATS_QUERY,
  defaultSiteSettings,
  defaultServices,
  defaultStats,
  defaultPortfolio,
  defaultTestimonials,
  SiteSettingsData,
  ServiceData,
  StatData,
  PortfolioData,
  TestimonialData,
} from "@/sanity/queries";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 60; // Revalidate every minute or via Sanity webhook

export default async function HomePage() {
  const [siteSettings, services, stats, portfolio, testimonials] = await Promise.all([
    fetchSanityData<SiteSettingsData>(SITE_SETTINGS_QUERY, defaultSiteSettings, ["siteSettings"]),
    fetchSanityData<ServiceData[]>(SERVICES_QUERY, defaultServices, ["service"]),
    fetchSanityData<StatData[]>(STATS_QUERY, defaultStats, ["stat"]),
    fetchSanityData<PortfolioData[]>(PORTFOLIO_QUERY, defaultPortfolio, ["portfolioItem"]),
    fetchSanityData<TestimonialData[]>(TESTIMONIALS_QUERY, defaultTestimonials, ["testimonial"]),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar
        phone={siteSettings.phone}
        whatsappNumber={siteSettings.whatsappNumber}
      />

      <main className="flex-grow">
        <Hero siteSettings={siteSettings} />
        <Stats stats={stats} />
        <Services services={services} whatsappNumber={siteSettings.whatsappNumber} />
        <About siteSettings={siteSettings} />
        <Portfolio portfolio={portfolio} />
        <Testimonials testimonials={testimonials} />
        <CTA whatsappNumber={siteSettings.whatsappNumber} />
        <Contact siteSettings={siteSettings} services={services} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFab whatsappNumber={siteSettings.whatsappNumber} />
    </div>
  );
}
