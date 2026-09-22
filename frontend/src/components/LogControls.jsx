import React, { useState } from 'react';
import { Plus, Minus, GlassWater, Coffee, Milk, Droplets, RotateCcw } from 'lucide-react';

const PRESETS = [
  { amount: 250, label: 'Glass', icon: '💧', sub: '250ml' },
  { amount: 350, label: 'Sipper', icon: '🥛', sub: '350ml' },
  { amount: 500, label: 'Bottle', icon: '🍶', sub: '500ml' },
  { amount: 750, label: 'Gym Bottle', icon: '🚰', sub: '750ml' },
  { amount: 1000, label: 'Chug (1L)', icon: '⚡', sub: '1000ml' },
];

export default function LogControls({
  activeUserId,
  currentUserName,
  onLogWater,
  onUndoLast,
  isCurrentUser
}) {
  const [customMl, setCustomMl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickLog = async (amount) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onLogWater(amount);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    const parsed = parseInt(customMl, 10);
    if (!parsed || parsed <= 0 || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onLogWater(parsed);
      setCustomMl('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 border border-slate-800 shadow-xl w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-400" />
          <h4 className="font-bold text-white text-base">
            Log Hydration for {currentUserName}
          </h4>
        </div>
        {!isCurrentUser && (
          <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
            Switch profile to log as you
          </span>
        )}
      </div>

      {/* Preset Buttons Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-4">
        {PRESETS.map((preset) => (
          <button
            key={preset.amount}
            onClick={() => handleQuickLog(preset.amount)}
            disabled={isSubmitting}
            className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800/80 hover:bg-cyan-950/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-150 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
              {preset.icon}
            </span>
            <span className="text-xs font-bold text-white group-hover:text-cyan-300">
              +{preset.amount}
            </span>
            <span className="text-[10px] text-slate-400">
              {preset.label}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Log + Quick Action Bar */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-800">
        <form onSubmit={handleCustomSubmit} className="flex-1 flex gap-2">
          <input
            type="number"
            value={customMl}
            onChange={(e) => setCustomMl(e.target.value)}
            placeholder="Custom ml (e.g. 300)"
            min="10"
            max="3000"
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!customMl || isSubmitting}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-cyan-600/20"
          >
            <Plus className="w-4 h-4" /> Log
          </button>
        </form>

        {/* Undo / Deduct Last Log Button */}
        <button
          onClick={onUndoLast}
          className="px-3.5 py-2 bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          title="Deduct 250ml if logged by mistake"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Undo -250ml</span>
        </button>
      </div>
    </div>
  );
}
