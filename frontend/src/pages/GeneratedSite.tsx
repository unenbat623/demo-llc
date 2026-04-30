import { useEffect, useState } from 'react';
import { fetchClientSite } from '../services/api';
import { SettingsProvider } from '../context/SettingsContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Footer from '../components/Footer';

export default function GeneratedSite() {
  const userId = window.location.pathname.split('/').pop();
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSite = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const data = await fetchClientSite(userId);
        setSiteData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSite();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">Generating Site...</p>
        </div>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 text-center">
        <div>
          <h1 className="text-4xl font-black mb-4">404</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{error || 'Site not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <SettingsProvider overrideSettings={siteData.settings}>
      <div className="bg-white min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Team overrideMembers={siteData.teamMembers} />
        </main>
        <Footer />
      </div>
    </SettingsProvider>
  );
}
