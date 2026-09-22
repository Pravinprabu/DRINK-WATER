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
    // Only accept numeric digit
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setErrorMsg('');

    // Auto-focus next box
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If 4 digits entered, auto-verify
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-700/60 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl shadow-cyan-950/40 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          {selectedUser ? (
            <Lock className="w-8 h-8 text-white animate-pulse" />
          ) : (
            <Waves className="w-8 h-8 text-white animate-pulse" />
          )}
        </div>

        {!selectedUser ? (
          /* Step 1: Pick Profile */
          <>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
              Hydration Hub 💧
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Select your identity to unlock your hydration dashboard with your secret PIN:
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelect('prx')}
                className="group relative flex flex-col items-center p-5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-800/40 border border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.02]"
              >
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🌊</span>
                </div>
                <span className="text-lg font-bold text-cyan-300">Prx</span>
                <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-cyan-400" /> Enter PIN
                </span>
              </button>

              <button
                onClick={() => handleSelect('sharzz')}
                className="group relative flex flex-col items-center p-5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-800/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-slate-800 transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.02]"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🌿</span>
                </div>
                <span className="text-lg font-bold text-emerald-300">Sharzz</span>
                <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> Enter PIN
                </span>
              </button>
            </div>
          </>
        ) : (
          /* Step 2: Secret PIN Pad */
          <div>
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
              Enter Secret PIN
            </h2>
            <p className="text-cyan-300 text-sm font-semibold mb-6">
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
                  className={`w-13 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-slate-950 border-2 transition-all duration-200 outline-none ${
                    isSuccess
                      ? 'border-emerald-400 text-emerald-400 bg-emerald-950/30'
                      : errorMsg
                      ? 'border-rose-500 text-rose-400 animate-shake'
                      : pin[index]
                      ? 'border-cyan-400 text-white'
                      : 'border-slate-700 text-slate-400 focus:border-cyan-400'
                  }`}
                />
              ))}
            </div>

            {/* Status / Error Message */}
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> PIN Verified! Logging in...
              </div>
            ) : errorMsg ? (
              <div className="flex items-center justify-center gap-2 text-rose-400 font-semibold text-xs">
                <ShieldAlert className="w-4 h-4" /> {errorMsg}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
                <KeyRound className="w-3.5 h-3.5" /> 4-digit security code required
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
