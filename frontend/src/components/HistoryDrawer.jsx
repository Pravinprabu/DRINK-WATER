import React, { useState } from 'react';
import { History, Clock, Droplet, ChevronDown, ChevronUp } from 'lucide-react';

export default function HistoryDrawer({ prxHistory, sharzzHistory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('prx');

  const historyObj = selectedUser === 'prx' ? prxHistory : sharzzHistory;
  const historyList = historyObj 
    ? Object.values(historyObj).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    : [];

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-4 shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <h5 className="font-bold text-xs text-slate-200 uppercase tracking-wider">
            Today's Sip Timeline & Logs
          </h5>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{isOpen ? 'Hide Timeline' : 'View Timeline'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          {/* User selector tab */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setSelectedUser('prx')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedUser === 'prx'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🌊 Prx's Logs ({historyList.length})
            </button>
            <button
              onClick={() => setSelectedUser('sharzz')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedUser === 'sharzz'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🌿 Sharzz's Logs ({Object.keys(sharzzHistory || {}).length})
            </button>
          </div>

          {/* List of logs */}
          {historyList.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-4 italic">
              No sips recorded yet today. Take a drink and log it above! 💧
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {historyList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-2 text-slate-300">
                    <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Hydrated</span>
                    <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                      +{item.amount} ml
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
