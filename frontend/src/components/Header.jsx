import React from 'react';
import { Droplets, Users, Lock, Trophy, Sun, Moon, Sparkles } from 'lucide-react';

export default function Header({
  currentUser,
  prxData,
  sharzzData,
  onSwitchUser,
  isConnected,
  theme,
  onToggleTheme
}) {
  const prxIntake = prxData?.todayIntake || 0;
  const sharzzIntake = sharzzData?.todayIntake || 0;
  const totalIntake = prxIntake + sharzzIntake;
  const totalTarget = 7000; // 3.5L + 3.5L
  const combinedPercent = Math.min(100, Math.round((totalIntake / totalTarget) * 100));
  const isBothCompleted = prxIntake >= 3500 && sharzzIntake >= 3500;

  const isDark = theme === 'dark';

  return (
    <header className="w-full glass-panel sticky top-0 z-40 px-4 py-3 sm:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 holo-shine animate-float-slow">
            <Droplets className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2 m-0">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Prx & Sharzz
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 dark:text-cyan-300">
                Hydration Hub 💧
              </span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                <span className="text-[11px]">
                  {isConnected ? 'Live Synced' : 'Connecting...'}
                </span>
              </span>
              <span>•</span>
              <span className="text-[11px]">Target: 3.5L each</span>
            </div>
          </div>
        </div>

        {/* Duo Combined Progress Pill */}
        <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-3.5 py-1.5 w-full sm:w-auto justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Cousin Duo Total
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <span>{(totalIntake / 1000).toFixed(2)} / 7.0L</span>
                <span className="text-cyan-600 dark:text-cyan-400">({combinedPercent}%)</span>
                {isBothCompleted && <Trophy className="w-3.5 h-3.5 text-amber-500 animate-bounce ml-1" />}
              </div>
            </div>
          </div>

          <div className="w-24 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${combinedPercent}%` }}
            />
          </div>
        </div>

        {/* Action Controls: Profile Switcher & Dark/Light Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Active User Label */}
          <div className="text-right hidden md:block">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">Active User</span>
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300">
              {currentUser === 'prx' ? '🌊 Prx' : currentUser === 'sharzz' ? '🌿 Sharzz' : 'Locked'}
            </span>
          </div>

          {/* Lock & Switch Button */}
          <button
            onClick={onSwitchUser}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 transition-all text-xs font-medium cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
            title="Lock and switch identity"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>Lock / Switch</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 holo-shine"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
