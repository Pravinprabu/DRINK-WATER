import React, { useState, useRef, useEffect } from 'react';
import { Waves, Lock, ArrowLeft, KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';

const SECRET_PINS = {
  prx: '0412',
  sharzz: '0808'
};

export default function IdentityModal({ onSelectUser }) {
  const [selectedUser, setSelectedUser] = useState(null); // 'prx' | 'sharzz'
  const [pin, setPin] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (selectedUser) {
      inputRefs[0].current?.focus();
    }
  }, [selectedUser]);

  const handleSelect = (userKey) => {
    setSelectedUser(userKey);
    setPin(['', '', '', '']);
    setErrorMsg('');
    setIsSuccess(false);
  };

  const handlePinChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setErrorMsg('');

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (index === 3 && value) {
      const fullPin = newPin.join('');
      verifyPin(fullPin);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyPin = (enteredPin) => {
    const expected = SECRET_PINS[selectedUser];
    if (enteredPin === expected) {
      setIsSuccess(true);
      setErrorMsg('');
      setTimeout(() => {
        onSelectUser(selectedUser);
      }, 500);
    } else {
      setErrorMsg('Incorrect PIN. Please try again.');
      setPin(['', '', '', '']);
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 50);
    }
  };

  const userTitle = selectedUser === 'prx' ? 'Prx (🌊)' : 'Sharzz (🌿)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-xl p-4 transition-colors">
      <div className="glass-panel holo-border rounded-3xl p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
        {/* Glow backdrop blobs */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 holo-shine">
          {selectedUser ? (
            <Lock className="w-8 h-8 text-white animate-pulse" />
          ) : (
            <Waves className="w-8 h-8 text-white animate-pulse" />
          )}
        </div>

        {!selectedUser ? (
          /* Step 1: Pick Profile */
          <>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Hydration Hub 💧
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Select your identity to unlock your hydration dashboard with your secret PIN:
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelect('prx')}
                className="group relative flex flex-col items-center p-5 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-cyan-400/40 hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.02] holo-shine"
              >
                <div className="w-14 h-14 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
                  <span className="text-2xl">🌊</span>
                </div>
                <span className="text-lg font-black text-cyan-600 dark:text-cyan-300">Prx</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 font-medium">
                  <Lock className="w-3 h-3 text-cyan-500" /> Enter PIN
                </span>
              </button>

              <button
                onClick={() => handleSelect('sharzz')}
                className="group relative flex flex-col items-center p-5 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-emerald-400/40 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.02] holo-shine"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
                  <span className="text-2xl">🌿</span>
                </div>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-300">Sharzz</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 font-medium">
                  <Lock className="w-3 h-3 text-emerald-500" /> Enter PIN
                </span>
              </button>
            </div>
          </>
        ) : (
          /* Step 2: Secret PIN Pad */
          <div>
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
              Enter Secret PIN
            </h2>
            <p className="text-cyan-600 dark:text-cyan-300 text-sm font-bold mb-6">
              Verifying {userTitle}
            </p>

            {/* 4 Digit Boxes */}
            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="password"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pin[index]}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isSuccess}
                  className={`w-13 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl border-2 transition-all duration-200 outline-none shadow-md ${
                    isSuccess
                      ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                      : errorMsg
                      ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                      : pin[index]
                      ? 'border-cyan-500 text-slate-900 dark:text-white bg-white/90 dark:bg-slate-950/80'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-950/50 focus:border-cyan-500'
                  }`}
                />
              ))}
            </div>

            {/* Status / Error Message */}
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> PIN Verified! Logging in...
              </div>
            ) : errorMsg ? (
              <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-xs">
                <ShieldAlert className="w-4 h-4" /> {errorMsg}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <KeyRound className="w-3.5 h-3.5 text-cyan-500" /> 4-digit security code required
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
