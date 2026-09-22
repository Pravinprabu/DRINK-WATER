import React from 'react';
import { Flame, Clock, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BottleCard({
  userId,
  userData,
  isCurrentUser,
  theme = 'cyan' // 'cyan' for Prx, 'emerald' for Sharzz
}) {
  const name = userData?.name || (userId === 'prx' ? 'Prx' : 'Sharzz');
  const avatar = userId === 'prx' ? '🌊' : '🌿';
  const intake = userData?.todayIntake || 0;
  const target = userData?.target || 3500;
  const streak = userData?.streak || 1;
  const lastTime = userData?.lastDrinkTime;
  const lastAmount = userData?.lastAmountLogged;

  // Percentage calculation (can exceed 100%)
  const rawPercentage = Math.round((intake / target) * 100);
  const fillPercentage = Math.min(100, rawPercentage);
  const isGoalReached = intake >= target;

  const isCyan = theme === 'cyan';
  const accentBorder = isCyan ? 'border-cyan-500/30' : 'border-emerald-500/30';
  const glowShadow = isGoalReached 
    ? 'shadow-2xl shadow-amber-500/30 border-amber-400/50' 
    : isCyan 
      ? 'shadow-xl shadow-cyan-950/40' 
      : 'shadow-xl shadow-emerald-950/40';

  const waveColor = isGoalReached
    ? 'from-amber-400 via-cyan-400 to-blue-500'
    : isCyan
      ? 'from-cyan-400 via-blue-500 to-indigo-600'
      : 'from-emerald-400 via-teal-500 to-cyan-600';

  return (
    <div className={`relative flex flex-col items-center bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border ${isGoalReached ? 'border-amber-400/50' : accentBorder} ${glowShadow} transition-all duration-300 w-full`}>
      {/* Background Accent Glow */}
      <div 
        className={`absolute -top-10 ${isCyan ? '-left-10 bg-cyan-500/10' : '-right-10 bg-emerald-500/10'} w-40 h-40 rounded-full blur-3xl pointer-events-none`} 
      />

      {/* Top Identity & Status Bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-11 h-11 rounded-2xl ${isCyan ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'} border flex items-center justify-center text-xl shadow-inner`}>
            {avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-xl text-white tracking-tight">{name}</h3>
              {isCurrentUser && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  You
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              Target: <span className="font-semibold text-slate-200">{target} ml (3.5L)</span>
            </p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm" title={`${streak} day streak`}>
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="text-xs font-bold text-orange-200">{streak}d streak</span>
        </div>
      </div>

      {/* The Animated Liquid Water Bottle Container */}
      <div className="relative w-44 sm:w-48 h-72 sm:h-80 my-2 rounded-[3rem] p-2 bg-slate-950/80 border-2 border-slate-700/60 shadow-2xl flex flex-col justify-end overflow-hidden">
        {/* Glass Bottle Reflections */}
        <div className="absolute top-4 left-4 w-2 h-20 bg-white/10 rounded-full blur-[1px] pointer-events-none z-30" />
        <div className="absolute top-4 right-4 w-1.5 h-12 bg-white/10 rounded-full blur-[1px] pointer-events-none z-30" />

        {/* Milestone Indicator Lines */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between py-6 px-3">
          {/* 3.5L Goal Line */}
          <div className="w-full flex items-center justify-between border-b border-amber-400/60 pb-0.5">
            <span className="text-[10px] font-extrabold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-400/40">
              3.5L GOAL 🏆
            </span>
            <span className="text-[9px] font-mono text-amber-300">100%</span>
          </div>

          {/* 3.0L Line */}
          <div className="w-full flex items-center justify-between border-b border-slate-700/50 pb-0.5">
            <span className="text-[9px] font-medium text-slate-400">3.0L</span>
            <span className="text-[8px] font-mono text-slate-500">86%</span>
          </div>

          {/* 2.0L Line */}
          <div className="w-full flex items-center justify-between border-b border-slate-700/50 pb-0.5">
            <span className="text-[9px] font-medium text-slate-400">2.0L</span>
            <span className="text-[8px] font-mono text-slate-500">57%</span>
          </div>

          {/* 1.0L Line */}
          <div className="w-full flex items-center justify-between border-b border-slate-700/50 pb-0.5">
            <span className="text-[9px] font-medium text-slate-400">1.0L</span>
            <span className="text-[8px] font-mono text-slate-500">29%</span>
          </div>
        </div>

        {/* Liquid Wave Surface & Water Body */}
        <div 
          className="relative w-full transition-all duration-700 ease-out z-10 overflow-hidden rounded-b-[2.6rem]"
          style={{ height: `${fillPercentage}%` }}
        >
          {/* Animated Wave SVG at the top of water */}
          <div className="absolute -top-4 left-0 w-[200%] h-8 opacity-70 animate-wave-primary pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-cyan-300/40">
              <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
          <div className="absolute -top-3 left-0 w-[200%] h-8 opacity-50 animate-wave-secondary pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-blue-400/40">
              <path d="M0,30 C300,90 450,-20 700,50 C950,120 1050,20 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>

          {/* Water Body Gradient */}
          <div className={`w-full h-full bg-gradient-to-t ${waveColor} opacity-90 relative`}>
            {/* Floating bubbles */}
            <div className="bubble w-2 h-2 left-6 bottom-4 [animation-delay:0.5s]" />
            <div className="bubble w-3 h-3 left-20 bottom-8 [animation-delay:1.2s]" />
            <div className="bubble w-1.5 h-1.5 left-32 bottom-2 [animation-delay:2.1s]" />
          </div>
        </div>

        {/* Center Percentage Display over Bottle */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/50 shadow-lg text-center">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {rawPercentage}%
            </span>
            <div className="text-[11px] font-bold text-cyan-300">
              {intake} / {target} ml
            </div>
          </div>
        </div>
      </div>

      {/* Goal Status Badge */}
      <div className="mt-3 w-full text-center">
        {isGoalReached ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold animate-pulse">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Target Conquered! ({rawPercentage}%)</span>
          </div>
        ) : intake === 0 ? (
          <span className="text-xs text-slate-400 font-medium">
            Haven't drunk any water today yet 🌵
          </span>
        ) : (
          <span className="text-xs text-cyan-300 font-medium">
            {target - intake} ml remaining for 3.5L goal
          </span>
        )}
      </div>

      {/* Last Drink Activity */}
      <div className="w-full mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-500" />
          {lastTime ? `Last sip at ${lastTime}` : "No sips logged today"}
        </span>
        {lastAmount && (
          <span className="font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
            +{lastAmount}ml
          </span>
        )}
      </div>
    </div>
  );
}
