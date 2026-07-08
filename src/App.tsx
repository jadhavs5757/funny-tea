import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Philosophy from './components/sections/Philosophy';
import FeaturedCollection from './components/sections/FeaturedCollection';
import CafeExperience from './components/sections/CafeExperience';
import InfoSection from './components/sections/InfoSection';
import ThankYou from './components/sections/ThankYou';
import LoadingScreen from './components/ui/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRenderLoader, setShouldRenderLoader] = useState(true);

  useEffect(() => {
    // Check if loader already played in this browser session
    const hasLoaded = sessionStorage.getItem('funny-tea-loaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShouldRenderLoader(false);
    } else {
      // Simulate loading/progress bar completion
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('funny-tea-loaded', 'true');
        // Keep component mounted for 600ms fade transition
        const exitTimer = setTimeout(() => {
          setShouldRenderLoader(false);
        }, 600);
        return () => clearTimeout(exitTimer);
      }, 1500); // Loader plays for 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {shouldRenderLoader && (
        <LoadingScreen isExiting={!isLoading} />
      )}
      <div 
        style={{
          opacity: isLoading && shouldRenderLoader ? 0 : 1,
          transition: 'opacity 600ms ease-in-out',
          visibility: isLoading && shouldRenderLoader ? 'hidden' : 'visible'
        }}
      >
        <Layout>
          <Hero />
          <Philosophy />
          <FeaturedCollection />
          <CafeExperience />
          <InfoSection />
          <ThankYou />
        </Layout>
      </div>
    </>
  );
}
