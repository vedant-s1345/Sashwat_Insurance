import HeroSection from '../components/sections/HeroSection.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import ProductsSection from '../components/sections/ProductsSection.jsx'
import CalculatorSection from '../components/sections/CalculatorSection.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import Guides from '../components/sections/Guides.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import PartnersBar from '../components/sections/PartnersBar.jsx'

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
      <Guides />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
