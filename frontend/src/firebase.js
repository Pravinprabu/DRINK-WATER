import { initializeApp } from "firebase/app";
import { 
  getDatabase, 
  ref, 
  onValue, 
  update, 
  get,
  set
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCypOlfzhKm3VPkCBl_Nh1Rn2GGEdyekuY",
  authDomain: "prx-sharzz-water.firebaseapp.com",
  databaseURL: "https://prx-sharzz-water-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prx-sharzz-water",
  storageBucket: "prx-sharzz-water.firebasestorage.app",
  messagingSenderId: "1020567663628",
  appId: "1:1020567663628:web:6ceced48b0f5b884602a29",
  measurementId: "G-MDSPT11FQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

const BASE_TARGET_ML = 3500;

// Subscribe to real-time changes
export function subscribeToDuoData(callback) {
  const rootRef = ref(database, "/");
  return onValue(rootRef, (snapshot) => {
    const val = snapshot.val() || {};
    callback(val);
  }, (error) => {
    console.error("Firebase subscription error:", error);
  });
}

// Log water intake
export async function logWaterIntake(userId, amount) {
  if (!userId || !amount) return;
  const userRef = ref(database, `users/${userId}`);
  const snapshot = await get(userRef);
  const current = snapshot.val() || {
    todayIntake: 0,
    target: BASE_TARGET_ML,
    streak: 1
  };

  const newTotal = Math.max(0, (current.todayIntake || 0) + amount);
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const logId = `log_${Date.now()}`;

  const updates = {};
  updates[`users/${userId}/todayIntake`] = newTotal;
  updates[`users/${userId}/lastDrinkTime`] = timeString;
  updates[`users/${userId}/lastDrinkTimestamp`] = Date.now();
  updates[`users/${userId}/lastAmountLogged`] = amount;
  
  if (amount > 0) {
    updates[`users/${userId}/history/${logId}`] = {
      amount,
      time: timeString,
      timestamp: Date.now()
    };
  }

  return update(ref(database), updates);
}

// Send cousin nudge
export async function sendNudge(fromUser, toUser, nudge) {
  const nudgeRef = ref(database, "lastNudge");
  return set(nudgeRef, {
    from: fromUser,
    to: toUser,
    type: nudge.type,
    text: nudge.text,
    icon: nudge.icon,
    timestamp: Date.now()
  });
}

// Check and execute daily reset at 12:00 AM midnight
export async function checkDailyReset() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const metaRef = ref(database, "meta/lastDayDate");
  const snapshot = await get(metaRef);
  const lastDate = snapshot.val();

  if (lastDate && lastDate !== todayStr) {
    console.log(`🌙 12:00 AM Midnight Reset Triggered! Previous: ${lastDate}, Today: ${todayStr}`);
    const usersRef = ref(database, "users");
    const usersSnap = await get(usersRef);
    const usersData = usersSnap.val() || {};

    const updates = {
      "meta/lastDayDate": todayStr,
      "meta/lastResetTimestamp": Date.now()
    };

    ['prx', 'sharzz'].forEach(userKey => {
      const u = usersData[userKey] || {};
      const reachedGoal = (u.todayIntake || 0) >= (u.target || BASE_TARGET_ML);
      
      updates[`users/${userKey}/todayIntake`] = 0;
      updates[`users/${userKey}/history`] = {};
      updates[`users/${userKey}/lastDrinkTime`] = null;
      updates[`users/${userKey}/lastDrinkTimestamp`] = null;
      updates[`users/${userKey}/lastAmountLogged`] = null;
      // If reached 3.5L goal before midnight, streak + 1, otherwise reset to 1
      updates[`users/${userKey}/streak`] = reachedGoal ? ((u.streak || 1) + 1) : 1;
    });

    await update(ref(database), updates);
  } else if (!lastDate) {
    await set(metaRef, todayStr);
  }
}

// Live timer that fires automatically at exactly 12:00:01 AM
export function setupMidnightTimer() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
  const msUntilMidnight = midnight.getTime() - now.getTime();

  console.log(`⏱️ Next 12:00 AM Reset scheduled in ${(msUntilMidnight / 1000 / 60).toFixed(1)} minutes`);

  const timerId = setTimeout(async () => {
    await checkDailyReset();
    setupMidnightTimer(); // Chain for the following day
  }, msUntilMidnight);

  return () => clearTimeout(timerId);
}
