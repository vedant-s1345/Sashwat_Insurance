import HeroSection from '../components/sections/HeroSection.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import ProductsSection from '../components/sections/ProductsSection.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import CalculatorSection from '../components/sections/CalculatorSection.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import PartnersBar from '../components/sections/PartnersBar.jsx'
import CareersSection from '../components/sections/CareersSection.jsx'
import Guides from '../components/sections/Guides.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductsSection />
      <HowItWorks />
      <CalculatorSection />
      <Testimonials />
      <PartnersBar />
      <CareersSection />
      <Guides />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
