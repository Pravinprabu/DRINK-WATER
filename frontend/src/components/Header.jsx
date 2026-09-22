import React from 'react';
import { Droplets, Users, Wifi, UserCheck, RefreshCw, Trophy } from 'lucide-react';

export default function Header({
  currentUser,
  prxData,
  sharzzData,
  onSwitchUser,
  isConnected
}) {
  const prxIntake = prxData?.todayIntake || 0;
  const sharzzIntake = sharzzData?.todayIntake || 0;
  const totalIntake = prxIntake + sharzzIntake;
  const totalTarget = 7000; // 3.5L + 3.5L
  const combinedPercent = Math.min(100, Math.round((totalIntake / totalTarget) * 100));

  const isBothCompleted = prxIntake >= 3500 && sharzzIntake >= 3500;

  return (
    <header className="w-full bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-40 px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/25">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2 m-0">
              <span>Prx & Sharzz</span>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
                Hydration Hub 💧
              </span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                <span className="text-[11px] text-slate-400">
                  {isConnected ? 'Real-Time Synced' : 'Connecting...'}
                </span>
              </span>
              <span>•</span>
              <span className="text-[11px] text-slate-400">Base Goal: 3.5L each</span>
            </div>
          </div>
        </div>

        {/* Duo Combined Progress Pill */}
        <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl px-3.5 py-1.5 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Cousin Duo Total
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>{(totalIntake / 1000).toFixed(2)} / 7.0L</span>
                <span className="text-cyan-400">({combinedPercent}%)</span>
                {isBothCompleted && <Trophy className="w-3.5 h-3.5 text-amber-400 animate-bounce ml-1" />}
              </div>
            </div>
          </div>

          <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${combinedPercent}%` }}
            />
          </div>
        </div>

        {/* Profile Switcher */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden md:block">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Active Device</span>
            <span className="text-xs font-bold text-cyan-300">
              {currentUser === 'prx' ? '🌊 Prx' : '🌿 Sharzz'}
            </span>
          </div>

          <button
            onClick={onSwitchUser}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs font-medium cursor-pointer shadow-sm"
            title="Lock and switch identity"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lock & Switch</span>
          </button>
        </div>
      </div>
    </header>
  );
}
