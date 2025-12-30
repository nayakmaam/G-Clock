
import React from 'react';
import { GhaligeTime } from '../types';

interface ClockCardProps {
  timeData: GhaligeTime;
}

const ClockCard: React.FC<ClockCardProps> = ({ timeData }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-700">
      {/* Normal Time Display */}
      <div className="text-center">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600 mb-3">
          Current Time
        </p>
        <div className="px-6 py-2 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
          <h1 className="text-5xl md:text-6xl font-light tracking-widest text-zinc-300 font-mono">
            {timeData.normalTime}
          </h1>
        </div>
      </div>

      {/* Ghalige Time Display (Primary focus) */}
      <div className="text-center relative">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-600/80 mb-4">
          Ghalige Time
        </p>
        <div className="relative group">
          <div className="absolute -inset-4 bg-amber-500/5 rounded-[2rem] blur-2xl group-hover:bg-amber-500/10 transition-all duration-500" />
          <h2 className="relative text-[9rem] md:text-[12rem] font-bold text-amber-500 font-mono leading-none tracking-tighter">
            {timeData.ghalige}<span className="text-zinc-800 animate-pulse">:</span>{timeData.minutesWithinSlot.toString().padStart(2, '0')}
          </h2>
        </div>
        
        {/* ShatGhaliga Indicator */}
        <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900/80 shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span className="text-xs font-bold text-zinc-400 tracking-wider">
            ShatGhaliga <span className="text-zinc-100">{timeData.shatGhaliga}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClockCard;
