import React, { useState } from 'react';
import { BellRing, Send, Sparkles, AlertCircle } from 'lucide-react';

const NUDGE_OPTIONS = [
  {
    type: 'balloon',
    icon: '🎈💦',
    label: 'Water Balloon',
    text: 'threw a water balloon at you! Splash! Time to drink!'
  },
  {
    type: 'cactus',
    icon: '🌵',
    label: 'Cactus Alert',
    text: 'says: "Bro, are you turning into a cactus? Go drink water!"'
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
  lastNudge
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
        <div className="bg-gradient-to-r from-cyan-950 via-blue-950 to-indigo-950 border-2 border-cyan-400/60 rounded-2xl p-4 shadow-xl shadow-cyan-500/20 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lastNudge.icon}</span>
            <div>
              <p className="text-sm font-bold text-white">
                {lastNudge.from === 'prx' ? 'Prx' : 'Sharzz'} {lastNudge.text}
              </p>
              <span className="text-[11px] text-cyan-300">Just now • Go take a sip!</span>
            </div>
          </div>
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/40 font-semibold">
            💧 Hydrate!
          </span>
        </div>
      )}

      {/* Send Cousin Nudges */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400" />
            <h5 className="font-bold text-xs text-slate-200 uppercase tracking-wider">
              Nudge {targetName} to Drink
            </h5>
          </div>
          {justSent && (
            <span className="text-xs font-semibold text-emerald-400 animate-pulse">
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
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all cursor-pointer text-left active:scale-95 disabled:opacity-50"
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
