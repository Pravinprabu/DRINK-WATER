import React, { useState, useEffect, useRef } from 'react';
import { 
  subscribeToDuoData, 
  logWaterIntake, 
  sendNudge, 
  checkDailyReset,
  setupMidnightTimer
} from './firebase';
import { getRandomMotivationalGif, getRandomSlackingGif } from './data/motivationalGifs';
import Header from './components/Header';
import BottleCard from './components/BottleCard';
import LogControls from './components/LogControls';
import NudgeBar from './components/NudgeBar';
import CelebrationModal from './components/CelebrationModal';
import SlackingModal from './components/SlackingModal';
import IdentityModal from './components/IdentityModal';
import HistoryDrawer from './components/HistoryDrawer';
import { Sparkles, HeartHandshake, Skull } from 'lucide-react';

// Web Audio synthesizer for crisp water drop & celebration sounds
function playSound(type = 'drop') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'drop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'celebrate') {
      const now = ctx.currentTime;
      [440, 554, 659, 880].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + i * 0.1);
        g.gain.setValueAtTime(0.2, now + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
        o.start(now + i * 0.1);
        o.stop(now + i * 0.1 + 0.3);
      });
    } else if (type === 'warn') {
      const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // AudioContext blocked or unsupported
  }
}

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hydration_theme') || 'dark';
  });

  // Session storage ensures secret PIN (0412 / 0808) is entered whenever opening the site
  const [currentUser, setCurrentUser] = useState(() => {
    return sessionStorage.getItem('prx_sharzz_user') || null;
  });

  const [mobileActiveTab, setMobileActiveTab] = useState('prx');
  const [duoData, setDuoData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [celebrationState, setCelebrationState] = useState(null);
  const [slackingState, setSlackingState] = useState(null);
  const [celebratedUsers, setCelebratedUsers] = useState(new Set());

  const previousIntakesRef = useRef({ prx: 0, sharzz: 0 });

  // Manage Dark/Light theme class on <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('hydration_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // 1. Subscribe to Firebase Realtime Database & schedule 12:00 AM reset
  useEffect(() => {
    checkDailyReset();
    const cleanupMidnight = setupMidnightTimer();

    const unsubscribe = subscribeToDuoData((data) => {
      setDuoData(data);
      setIsConnected(true);

      const prxIntake = data?.users?.prx?.todayIntake || 0;
      const sharzzIntake = data?.users?.sharzz?.todayIntake || 0;

      // Check if either user just crossed 3500ml
      const prevPrx = previousIntakesRef.current.prx;
      const prevSharzz = previousIntakesRef.current.sharzz;

      if (prxIntake >= 3500 && prevPrx < 3500 && !celebratedUsers.has('prx')) {
        triggerCelebration('Prx', prxIntake);
        setCelebratedUsers(prev => new Set(prev).add('prx'));
      }

      if (sharzzIntake >= 3500 && prevSharzz < 3500 && !celebratedUsers.has('sharzz')) {
        triggerCelebration('Sharzz', sharzzIntake);
        setCelebratedUsers(prev => new Set(prev).add('sharzz'));
      }

      previousIntakesRef.current = { prx: prxIntake, sharzz: sharzzIntake };
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      if (typeof cleanupMidnight === 'function') cleanupMidnight();
    };
  }, [celebratedUsers]);

  const triggerCelebration = (userName, intake) => {
    const gif = getRandomMotivationalGif();
    playSound('celebrate');
    setCelebrationState({
      userName,
      gifData: gif,
      intake
    });
  };

  const triggerSlackingModal = (userName, intake) => {
    const gif = getRandomSlackingGif();
    playSound('warn');
    setSlackingState({
      userName,
      gifData: gif,
      intake
    });
  };

  const handleSelectUser = (userKey) => {
    setCurrentUser(userKey);
    setMobileActiveTab(userKey);
    sessionStorage.setItem('prx_sharzz_user', userKey);
  };

  const handleLockAndSwitch = () => {
    sessionStorage.removeItem('prx_sharzz_user');
    setCurrentUser(null);
  };

  const handleLogWater = async (amount) => {
    if (!currentUser) return;
    playSound('drop');
    await logWaterIntake(currentUser, amount);
  };

  const handleUndoLast = async () => {
    if (!currentUser) return;
    await logWaterIntake(currentUser, -250);
  };

  const handleSendNudge = async (fromUser, toUser, nudge) => {
    playSound('drop');
    await sendNudge(fromUser, toUser, nudge);
  };

  const prxData = duoData?.users?.prx || { todayIntake: 0, target: 3500, streak: 1 };
  const sharzzData = duoData?.users?.sharzz || { todayIntake: 0, target: 3500, streak: 1 };
  const lastNudge = duoData?.lastNudge;

  const otherUser = currentUser === 'prx' ? 'sharzz' : 'prx';
  const otherUserName = otherUser === 'prx' ? 'Prx' : 'Sharzz';

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-400">
      {/* Ambient Holomorphic Light Blobs in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-indigo-400/20 dark:bg-purple-500/10 blur-3xl animate-float-slow [animation-delay:3s]" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-pink-400/20 dark:bg-pink-500/10 blur-3xl animate-float-slow [animation-delay:5s]" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-3xl animate-float-slow [animation-delay:2s]" />
      </div>

      {/* 1. Identity Selection Modal with Secret PIN */}
      {!currentUser && (
        <IdentityModal onSelectUser={handleSelectUser} />
      )}

      {/* 2. Motivational GIF Celebration Modal when > 3.5L */}
      {celebrationState && (
        <CelebrationModal
          userName={celebrationState.userName}
          gifData={celebrationState.gifData}
          intake={celebrationState.intake}
          onClose={() => setCelebrationState(null)}
        />
      )}

      {/* 3. Incomplete Task / Dehydration Roast Modal */}
      {slackingState && (
        <SlackingModal
          userName={slackingState.userName}
          gifData={slackingState.gifData}
          intakeMl={slackingState.intake}
          targetMl={3500}
          onQuickHydrate={currentUser ? handleLogWater : null}
          onClose={() => setSlackingState(null)}
        />
      )}

      {/* 4. Header with live status, duo stats & theme toggle */}
      <Header
        currentUser={currentUser}
        prxData={prxData}
        sharzzData={sharzzData}
        onSwitchUser={handleLockAndSwitch}
        isConnected={isConnected}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:px-6 flex flex-col gap-6">
        
        {/* Mobile View Switcher (Comfortable tab navigation for phones) */}
        <div className="flex md:hidden glass-panel rounded-2xl p-1.5 shadow-md">
          <button
            onClick={() => setMobileActiveTab('prx')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mobileActiveTab === 'prx'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🌊 Prx's Station</span>
            <span className="text-xs bg-white/20 dark:bg-slate-950/60 px-2 py-0.5 rounded-full">
              {Math.round(((prxData.todayIntake || 0) / 3500) * 100)}%
            </span>
          </button>

          <button
            onClick={() => setMobileActiveTab('sharzz')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mobileActiveTab === 'sharzz'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🌿 Sharzz's Station</span>
            <span className="text-xs bg-white/20 dark:bg-slate-950/60 px-2 py-0.5 rounded-full">
              {Math.round(((sharzzData.todayIntake || 0) / 3500) * 100)}%
            </span>
          </button>
        </div>

        {/* Dual Bottle Dashboard:
            - Side-by-side split on laptops/desktops
            - Single active tab on mobile for thumb comfort */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Prx Column */}
          <div className={`${mobileActiveTab !== 'prx' ? 'hidden md:flex' : 'flex'} flex-col gap-4 w-full`}>
            <BottleCard
              userId="prx"
              userData={prxData}
              isCurrentUser={currentUser === 'prx'}
              theme="cyan"
            />
            {/* Show log controls here if Prx is active user, or on mobile */}
            {currentUser === 'prx' && (
              <LogControls
                activeUserId="prx"
                currentUserName="Prx"
                onLogWater={handleLogWater}
                onUndoLast={handleUndoLast}
                isCurrentUser={true}
              />
            )}
            {/* If over 3.5L: show Celebration GIF */}
            {prxData.todayIntake >= 3500 ? (
              <button
                onClick={() => triggerCelebration('Prx', prxData.todayIntake)}
                className="w-full py-2.5 px-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md holo-shine"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Show Prx's Cute Motivation GIF Celebration 💖</span>
              </button>
            ) : (
              /* If below 3.5L: show Incomplete / Slacking Roast GIF */
              <button
                onClick={() => triggerSlackingModal('Prx', prxData.todayIntake)}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 text-rose-700 dark:text-rose-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm holo-shine"
              >
                <Skull className="w-4 h-4 text-rose-500" />
                <span>Prx Incomplete Task? See Roast GIF 🌵💀</span>
              </button>
            )}
          </div>

          {/* Sharzz Column */}
          <div className={`${mobileActiveTab !== 'sharzz' ? 'hidden md:flex' : 'flex'} flex-col gap-4 w-full`}>
            <BottleCard
              userId="sharzz"
              userData={sharzzData}
              isCurrentUser={currentUser === 'sharzz'}
              theme="emerald"
            />
            {/* Show log controls here if Sharzz is active user */}
            {currentUser === 'sharzz' && (
              <LogControls
                activeUserId="sharzz"
                currentUserName="Sharzz"
                onLogWater={handleLogWater}
                onUndoLast={handleUndoLast}
                isCurrentUser={true}
              />
            )}
            {/* If over 3.5L: show Celebration GIF */}
            {sharzzData.todayIntake >= 3500 ? (
              <button
                onClick={() => triggerCelebration('Sharzz', sharzzData.todayIntake)}
                className="w-full py-2.5 px-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md holo-shine"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Show Sharzz's Cute Motivation GIF Celebration 💖</span>
              </button>
            ) : (
              /* If below 3.5L: show Incomplete / Slacking Roast GIF */
              <button
                onClick={() => triggerSlackingModal('Sharzz', sharzzData.todayIntake)}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 text-rose-700 dark:text-rose-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm holo-shine"
              >
                <Skull className="w-4 h-4 text-rose-500" />
                <span>Sharzz Incomplete Task? See Roast GIF 🌵💀</span>
              </button>
            )}
          </div>
        </div>

        {/* Cousin Interactions & Nudges */}
        {currentUser && (
          <NudgeBar
            currentUserId={currentUser}
            targetUserId={otherUser}
            targetName={otherUserName}
            onSendNudge={handleSendNudge}
            lastNudge={lastNudge}
            onOpenSlackingModal={() => triggerSlackingModal(otherUserName, otherUser === 'prx' ? prxData.todayIntake : sharzzData.todayIntake)}
          />
        )}

        {/* History Drawer for Today's Logs */}
        <HistoryDrawer
          prxHistory={prxData?.history}
          sharzzHistory={sharzzData?.history}
        />

        {/* Wholesome Motivational Quote Footer */}
        <footer className="mt-auto py-4 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 font-medium">
            <HeartHandshake className="w-4 h-4 text-rose-500" />
            Built with care for Prx & Sharzz
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Stay healthy, stay hydrated, conquer 3.5L every single day! 🌊</span>
        </footer>
      </main>
    </div>
  );
}
