import Hero from '../components/landing/Hero'
import VideoSection from '../components/landing/VideoSection'
import Features from '../components/landing/Features'
import Testimonials from '../components/landing/Testimonials'
import CallToAction from '../components/landing/CallToAction'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main>
        <Hero />
        <VideoSection />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
    </div>
  );
}
