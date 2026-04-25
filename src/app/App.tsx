import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Features } from "./components/Features.jsx";
import { Benefits } from "./components/Benefits.jsx";
import { HowItWorks } from "./components/HowItWorks.jsx";
import { AIShowcase } from "./components/AIShowcase.jsx";
import { Pricing } from "./components/Pricing.jsx";
import { Testimonials } from "./components/Testimonials.jsx";
import { CTA } from "./components/CTA.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <Features />
        <Benefits />
        <HowItWorks />
        <AIShowcase />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
