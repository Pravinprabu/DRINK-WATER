import React, { useState } from 'react';
import { AlertTriangle, X, Shuffle, ChevronRight, Droplets, Flame, Skull } from 'lucide-react';
import { SLACKING_GIFS, getRandomSlackingGif } from '../data/motivationalGifs';

export default function SlackingModal({
  gifData: initialGif,
  userName,
  intakeMl,
  targetMl = 3500,
  onQuickHydrate,
  onClose
}) {
  const [currentGif, setCurrentGif] = useState(initialGif || SLACKING_GIFS[0]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const remaining = Math.max(0, targetMl - (intakeMl || 0));
  const percent = Math.round(((intakeMl || 0) / targetMl) * 100);

  const handleNextGif = () => {
    setImgLoaded(false);
    const next = getRandomSlackingGif(currentGif?.id);
    setCurrentGif(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="glass-panel holo-border rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl border-rose-500/30">
        {/* Glow behind */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer shadow-sm"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Warning Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-600 dark:text-rose-400 font-black text-xs sm:text-sm mb-4 shadow-sm animate-pulse">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>TASK INCOMPLETE: DEHYDRATION ALERT! 🌵</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
          {userName} is Slacking on Water! 💀
        </h2>
        <p className="text-rose-600 dark:text-rose-400 font-bold text-sm mb-4">
          Only at <span className="font-black text-slate-900 dark:text-white text-base">{intakeMl} ml ({percent}%)</span> • Need <span className="underline">{remaining} ml</span> more to reach 3.5L!
        </p>

        {/* The Slacking GIF Container */}
        <div className="relative rounded-2xl overflow-hidden border border-rose-400/40 dark:border-rose-900/60 bg-slate-950 shadow-inner mb-4 min-h-56 max-h-64 sm:max-h-72 flex items-center justify-center">
          <img
            key={currentGif?.url}
            src={currentGif?.url}
            alt={currentGif?.title || "Incomplete Task GIF"}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover max-h-64 sm:max-h-72 transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-40'}`}
            loading="eager"
          />
          <div className="absolute top-2 left-2 bg-rose-950/80 backdrop-blur-sm text-rose-200 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider border border-rose-500/40 flex items-center gap-1">
            <Skull className="w-3 h-3 text-rose-400" />
            <span>{currentGif?.vibe || "Dehydrated"}</span>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
            <span>{currentGif?.title}</span>
          </div>
        </div>

        {/* Slacking Quote */}
        <div className="bg-rose-500/10 dark:bg-rose-950/30 border border-rose-400/30 rounded-2xl p-3.5 mb-4 text-rose-700 dark:text-rose-300 text-sm italic font-semibold flex items-center justify-center gap-2 shadow-inner">
          <span>"{currentGif?.quote}"</span>
        </div>

        {/* Cycle Next Roast GIF button */}
        <button
          onClick={handleNextGif}
          className="w-full py-2 px-3 mb-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Shuffle className="w-3.5 h-3.5 text-rose-500" />
          <span>Next Roast GIF 🔀</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Actions */}
        <div className="flex gap-3">
          {onQuickHydrate ? (
            <button
              onClick={() => {
                onQuickHydrate(500);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-cyan-500/25 cursor-pointer flex items-center justify-center gap-2 holo-shine"
            >
              <Droplets className="w-4 h-4" />
              Chug 500ml Right Now!
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-cyan-500/25 cursor-pointer holo-shine"
            >
              Go Drink Water! 💧
            </button>
          )}
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
