import React from 'react';
import { Flame, Clock, Trophy } from 'lucide-react';

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
  const streak = userData?.streak !== undefined ? userData.streak : 0;
  const lastTime = userData?.lastDrinkTime;
  const lastAmount = userData?.lastAmountLogged;

  // Percentage calculation
  const rawPercentage = Math.round((intake / target) * 100);
  const fillPercentage = Math.min(100, rawPercentage);
  const isGoalReached = intake >= target;

  const isCyan = theme === 'cyan';

  const waveColor = isGoalReached
    ? 'from-amber-400 via-pink-400 to-cyan-400'
    : isCyan
      ? 'from-cyan-400 via-sky-500 to-indigo-600'
      : 'from-emerald-400 via-teal-500 to-cyan-600';

  return (
    <div className={`relative flex flex-col items-center glass-panel holo-border rounded-3xl p-6 transition-all duration-300 w-full ${isGoalReached ? 'shadow-2xl shadow-amber-500/25 ring-2 ring-amber-400/50' : ''}`}>
      {/* Background Holographic Glow Orb */}
      <div 
        className={`absolute -top-12 ${isCyan ? '-left-12 bg-cyan-500/20 dark:bg-cyan-500/15' : '-right-12 bg-emerald-500/20 dark:bg-emerald-500/15'} w-44 h-44 rounded-full blur-3xl pointer-events-none`} 
      />

      {/* Top Identity & Status Bar */}
      <div className="w-full flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${isCyan ? 'bg-cyan-500/15 text-cyan-500 dark:text-cyan-300 border-cyan-400/40' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-400/40'} border flex items-center justify-center text-2xl shadow-md holo-shine`}>
            {avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">{name}</h3>
              {isCurrentUser && (
                <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40">
                  You
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
              Daily Target: <span className="font-bold text-slate-700 dark:text-slate-200">{target} ml (3.5L)</span>
            </p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 dark:bg-slate-800/80 border border-orange-400/30 dark:border-slate-700/60 shadow-sm" title={`${streak} day streak`}>
          <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="text-xs font-bold text-orange-600 dark:text-orange-300">{streak}d streak</span>
        </div>
      </div>

      {/* The Animated Liquid Water Bottle Container with Frosted Glass Aesthetics */}
      <div className="relative w-44 sm:w-48 h-72 sm:h-80 my-2 rounded-[3rem] p-2 bg-gradient-to-b from-white/40 to-white/10 dark:from-slate-950/80 dark:to-slate-900/80 border-2 border-white/80 dark:border-slate-700/60 shadow-2xl flex flex-col justify-end overflow-hidden backdrop-blur-md">
        {/* Glass Bottle Reflections */}
        <div className="absolute top-4 left-4 w-2.5 h-24 bg-white/40 dark:bg-white/15 rounded-full blur-[1px] pointer-events-none z-30" />
        <div className="absolute top-6 right-4 w-1.5 h-14 bg-white/30 dark:bg-white/10 rounded-full blur-[1px] pointer-events-none z-30" />

        {/* Milestone Indicator Lines */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between py-6 px-3">
          {/* 3.5L Goal Line */}
          <div className="w-full flex items-center justify-between border-b-2 border-amber-400 pb-0.5">
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-400/50 shadow-sm">
              3.5L GOAL 🏆
            </span>
            <span className="text-[9px] font-black text-amber-600 dark:text-amber-300">100%</span>
          </div>

          {/* 3.0L Line */}
          <div className="w-full flex items-center justify-between border-b border-slate-300 dark:border-slate-700/50 pb-0.5">
            <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">3.0L</span>
            <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500">86%</span>
          </div>

          {/* 2.0L Line */}
          <div className="w-full flex items-center justify-between border-b border-slate-300 dark:border-slate-700/50 pb-0.5">
            <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">2.0L</span>
            <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500">57%</span>
          </div>

          {/* 1.0L Line */}
          <div className="w-full flex items-center justify-between border-b border-slate-300 dark:border-slate-700/50 pb-0.5">
            <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">1.0L</span>
            <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500">29%</span>
          </div>
        </div>

        {/* Liquid Wave Surface & Water Body */}
        <div 
          className="relative w-full transition-all duration-700 ease-out z-10 overflow-hidden rounded-b-[2.6rem]"
          style={{ height: `${fillPercentage}%` }}
        >
          {/* Animated Wave SVG at the top of water */}
          <div className="absolute -top-4 left-0 w-[200%] h-8 opacity-70 animate-wave-primary pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-cyan-300/60 dark:fill-cyan-300/40">
              <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
          <div className="absolute -top-3 left-0 w-[200%] h-8 opacity-50 animate-wave-secondary pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-blue-400/60 dark:fill-blue-400/40">
              <path d="M0,30 C300,90 450,-20 700,50 C950,120 1050,20 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>

          {/* Water Body Gradient */}
          <div className={`w-full h-full bg-gradient-to-t ${waveColor} opacity-90 relative shadow-inner`}>
            {/* Floating bubbles */}
            <div className="bubble w-2 h-2 left-6 bottom-4 [animation-delay:0.5s]" />
            <div className="bubble w-3 h-3 left-20 bottom-8 [animation-delay:1.2s]" />
            <div className="bubble w-1.5 h-1.5 left-32 bottom-2 [animation-delay:2.1s]" />
          </div>
        </div>

        {/* Center Percentage Display over Bottle */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 dark:border-slate-700/60 shadow-xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {rawPercentage}%
            </span>
            <div className="text-[11px] font-extrabold text-cyan-600 dark:text-cyan-300">
              {intake} / {target} ml
            </div>
          </div>
        </div>
      </div>

      {/* Goal Status Badge */}
      <div className="mt-3 w-full text-center z-10">
        {isGoalReached ? (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-700 dark:text-amber-300 text-xs font-bold animate-pulse shadow-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Target Conquered! ({rawPercentage}%) 🌟</span>
          </div>
        ) : intake === 0 ? (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Haven't drunk any water today yet 🌵
          </span>
        ) : (
          <span className="text-xs text-cyan-700 dark:text-cyan-300 font-semibold">
            {target - intake} ml remaining for 3.5L goal
          </span>
        )}
      </div>

      {/* Last Drink Activity */}
      <div className="w-full mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {lastTime ? `Last sip at ${lastTime}` : "No sips logged today"}
        </span>
        {lastAmount && (
          <span className="font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
            +{lastAmount}ml
          </span>
        )}
      </div>
    </div>
  );
}
