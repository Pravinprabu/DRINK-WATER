import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, X, PartyPopper, Heart } from 'lucide-react';

export default function CelebrationModal({ gifData, userName, intakeMl, onClose }) {
  useEffect(() => {
    // Burst multi-color confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };

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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl shadow-amber-500/20 relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Close celebration"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold text-sm mb-4 shadow-sm">
          <Trophy className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>3.5L HYDRATION GOAL CRUSHED!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
          {userName} is in God-Tier Mode! 🌊✨
        </h2>
        <p className="text-cyan-300 font-medium text-base mb-4">
          Current Intake: <span className="font-bold text-white text-lg">{(intakeMl / 1000).toFixed(2)} Liters</span>
        </p>

        {/* The Cute Motivational GIF */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-inner mb-4 max-h-64 sm:max-h-72 flex items-center justify-center">
          <img
            src={gifData?.url}
            alt={gifData?.title || "Motivational GIF"}
            className="w-full h-full object-cover max-h-64 sm:max-h-72"
            loading="eager"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{gifData?.title}</span>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3.5 mb-6 text-slate-200 text-sm italic font-medium flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-rose-400 shrink-0" />
          <span>"{gifData?.quote}"</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={triggerMoreConfetti}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer hover:scale-[1.02]"
          >
            <PartyPopper className="w-4 h-4" />
            More Confetti!
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-[1.02]"
          >
            Keep Chugging 💧
          </button>
        </div>
      </div>
    </div>
  );
}
