import React, { useState } from 'react';
import { BellRing, Skull } from 'lucide-react';

const NUDGE_OPTIONS = [
  {
    type: 'balloon',
    icon: '🎈💦',
    label: 'Water Balloon',
    text: 'threw a water balloon at you! Splash! Time to drink!'
  },
  {
    type: 'cactus',
    icon: '🌵💀',
    label: 'Cactus Roast',
    text: 'says: "Bro, are you turning into a cactus?! Drink water!"'
  },
  {
    type: 'ice',
    icon: '🧊',
    label: 'Ice Cold',
    text: 'sent you an ice-cold sip reminder!'
  },
  {
    type: 'cheer',
    icon: '🙌',
    label: 'High-Five',
    text: 'is cheering you on to conquer your 3.5L goal!'
  }
];

export default function NudgeBar({
  currentUserId,
  targetUserId,
  targetName,
  onSendNudge,
  lastNudge,
  onOpenSlackingModal
}) {
  const [justSent, setJustSent] = useState(false);

  const handleNudgeClick = async (option) => {
    if (justSent) return;
    await onSendNudge(currentUserId, targetUserId, option);
    setJustSent(true);
    setTimeout(() => setJustSent(false), 3000);
  };

  const isNudgeForMe = lastNudge && lastNudge.to === currentUserId;
  const isRecentNudge = lastNudge && (Date.now() - (lastNudge.timestamp || 0)) < 60000; // within 1 min

  return (
    <div className="w-full space-y-3">
      {/* Live Nudge Alert Banner for incoming notifications */}
      {isNudgeForMe && isRecentNudge && (
        <div className="bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl p-4 shadow-xl shadow-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lastNudge.icon}</span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {lastNudge.from === 'prx' ? 'Prx' : 'Sharzz'} {lastNudge.text}
              </p>
              <span className="text-[11px] text-cyan-600 dark:text-cyan-300 font-medium">Just now • Go take a sip!</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lastNudge.type === 'cactus' && onOpenSlackingModal && (
              <button
                onClick={onOpenSlackingModal}
                className="text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-700 dark:text-rose-300 px-3 py-1.5 rounded-full border border-rose-400/50 font-bold shadow-sm flex items-center gap-1 cursor-pointer transition-all"
              >
                <Skull className="w-3.5 h-3.5 text-rose-500" />
                <span>See Roast GIF</span>
              </button>
            )}
            <span className="text-xs bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-400/40 font-bold shadow-sm">
              💧 Hydrate!
            </span>
          </div>
        </div>
      )}

      {/* Send Cousin Nudges */}
      <div className="glass-panel rounded-3xl p-4 transition-all duration-300">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-500" />
            <h5 className="font-extrabold text-xs text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Nudge {targetName} to Drink
            </h5>
          </div>
          {justSent && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              Sent to {targetName}! 💦
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {NUDGE_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onClick={() => handleNudgeClick(opt)}
              disabled={justSent}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/80 hover:bg-cyan-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 hover:border-cyan-400 text-slate-700 dark:text-slate-200 transition-all cursor-pointer text-left active:scale-95 disabled:opacity-50 holo-shine shadow-sm"
            >
              <span className="text-lg">{opt.icon}</span>
              <div className="leading-tight">
                <span className="text-xs font-bold block">{opt.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
