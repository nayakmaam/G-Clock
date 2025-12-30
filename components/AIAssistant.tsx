
import React from 'react';

interface AIAssistantProps {
  insight: { explanation: string; reflection: string } | null;
  loading: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ insight, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-lg mt-12 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 animate-pulse">
        <div className="h-4 bg-zinc-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="w-full max-w-lg mt-12 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm shadow-2xl transition-all duration-700">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Cosmic Insight</span>
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed mb-4 italic">
        "{insight.explanation}"
      </p>
      <div className="pt-4 border-t border-zinc-800">
        <p className="text-xs font-semibold text-amber-200 tracking-wide uppercase">
          Mantra: {insight.reflection}
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
