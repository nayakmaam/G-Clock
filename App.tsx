
import React, { useState, useEffect, useCallback } from 'react';
import { GhaligeTime } from './types';
import { calculateGhaligeTime } from './utils/ghalige';
import ClockCard from './components/ClockCard';
import AIAssistant from './components/AIAssistant';
import { getGhaligeInsight } from './services/geminiService';

const App: React.FC = () => {
  const [time, setTime] = useState<GhaligeTime>(calculateGhaligeTime(new Date()));
  const [insight, setInsight] = useState<{ explanation: string; reflection: string } | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(calculateGhaligeTime(now));
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  // Fetch insight whenever the Ghalige changes
  const fetchInsight = useCallback(async (currentTime: GhaligeTime) => {
    setLoadingInsight(true);
    try {
      const data = await getGhaligeInsight(currentTime);
      setInsight(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingInsight(false);
    }
  }, []);

  // Initial insight fetch
  useEffect(() => {
    fetchInsight(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh insight when the ghalige segment changes (every 20 mins)
  useEffect(() => {
     const insightTimer = setInterval(() => {
        fetchInsight(time);
     }, 1000 * 60 * 20);
     return () => clearInterval(insightTimer);
  }, [time, fetchInsight]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 selection:bg-amber-500/20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-amber-900/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-zinc-800/20 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 w-full flex flex-col items-center max-w-lg">
        <header className="mb-12 text-center">
          <h1 className="text-sm font-medium text-zinc-500 uppercase tracking-[0.3em]">
            Vedic <span className="text-zinc-200">Chronometer</span>
          </h1>
        </header>

        <ClockCard timeData={time} />
        
        <AIAssistant insight={insight} loading={loadingInsight} />

        <footer className="mt-16 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => fetchInsight(time)}
            className="group flex flex-col items-center gap-2"
          >
            <div className="p-3 rounded-full border border-zinc-800 bg-zinc-900/50 group-active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-amber-500 transition-colors"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            </div>
            <span className="text-[9px] uppercase font-black tracking-widest text-zinc-700 group-hover:text-zinc-400 transition-colors">Recalibrate Insight</span>
          </button>
        </footer>
      </main>

      {/* Persistent Info Badges */}
      <div className="fixed bottom-6 left-6 flex items-center gap-2 text-[10px] text-zinc-600 font-mono tracking-tighter px-3 py-1 bg-zinc-900/30 border border-zinc-800/50 rounded-md">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        BASE 06:00
      </div>
      <div className="fixed bottom-6 right-6 flex items-center gap-2 text-[10px] text-zinc-600 font-mono tracking-tighter px-3 py-1 bg-zinc-900/30 border border-zinc-800/50 rounded-md">
        1 GHL = 20M
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
      </div>
    </div>
  );
};

export default App;
