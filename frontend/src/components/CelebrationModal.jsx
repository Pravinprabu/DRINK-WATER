import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, X, PartyPopper, Heart, Shuffle, ChevronRight } from 'lucide-react';
import { MOTIVATIONAL_GIFS, getRandomMotivationalGif } from '../data/motivationalGifs';

export default function CelebrationModal({ gifData: initialGif, userName, intakeMl, onClose }) {
  const [currentGif, setCurrentGif] = useState(initialGif || MOTIVATIONAL_GIFS[0]);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // Burst multi-color confetti on open
    const count = 220;
    const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const triggerMoreConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleNextGif = () => {
    setImgLoaded(false);
    const next = getRandomMotivationalGif(currentGif?.id);
    setCurrentGif(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="glass-panel holo-border rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl">
        {/* Holographic Glow behind */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer shadow-sm"
          title="Close celebration"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-600 dark:text-amber-300 font-black text-xs sm:text-sm mb-4 shadow-sm animate-pulse">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>3.5L HYDRATION GOAL CONQUERED!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
          {userName} is in God-Tier Mode! 🌊✨
        </h2>
        <p className="text-cyan-600 dark:text-cyan-300 font-bold text-base mb-4">
          Current Intake: <span className="font-black text-slate-900 dark:text-white text-lg">{(intakeMl / 1000).toFixed(2)} Liters</span>
        </p>

        {/* The Cute Motivational GIF Container */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 bg-slate-950 shadow-inner mb-4 min-h-56 max-h-64 sm:max-h-72 flex items-center justify-center">
          <img
            key={currentGif?.url}
            src={currentGif?.url}
            alt={currentGif?.title || "Motivational GIF"}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover max-h-64 sm:max-h-72 transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-40'}`}
            loading="eager"
          />
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-white/20">
            {currentGif?.vibe || "Champion"}
          </div>
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{currentGif?.title}</span>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-3.5 mb-4 text-slate-700 dark:text-slate-200 text-sm italic font-medium flex items-center justify-center gap-2 shadow-inner">
          <Heart className="w-4 h-4 text-rose-500 shrink-0" />
          <span>"{currentGif?.quote}"</span>
        </div>

        {/* Cycle Next Motivational GIF button */}
        <button
          onClick={handleNextGif}
          className="w-full py-2 px-3 mb-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-700 dark:text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer holo-shine"
        >
          <Shuffle className="w-3.5 h-3.5 text-cyan-500" />
          <span>Next Motivational GIF</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={triggerMoreConfetti}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-300 font-bold text-sm transition-all flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 cursor-pointer hover:scale-[1.02] shadow-sm"
          >
            <PartyPopper className="w-4 h-4" />
            Confetti!
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-black text-sm transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-[1.02] holo-shine"
          >
            Keep Chugging 💧
          </button>
        </div>
      </div>
    </div>
  );
}
