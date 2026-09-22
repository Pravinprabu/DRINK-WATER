// Database initialization seed script
const FIREBASE_DB_URL = "https://prx-sharzz-water-default-rtdb.europe-west1.firebasedatabase.app";

async function seedDatabase() {
  console.log("🌊 Initializing Prx & Sharzz Hydration Hub in Firebase...");

  const initialData = {
    users: {
      prx: {
        id: "prx",
        name: "Prx",
        todayIntake: 0,
        target: 3500,
        streak: 1,
        lastDrinkTime: null,
        history: {}
      },
      sharzz: {
        id: "sharzz",
        name: "Sharzz",
        todayIntake: 0,
        target: 3500,
        streak: 1,
        lastDrinkTime: null,
        history: {}
      }
    },
    meta: {
      createdFor: "Prx & Sharzz",
      baseGoalMl: 3500,
      initializedAt: new Date().toISOString()
    }
  };

  try {
    const res = await fetch(`${FIREBASE_DB_URL}/.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initialData)
    });

    if (!res.ok) {
      throw new Error(`Firebase returned status ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("✅ Successfully initialized Firebase Realtime Database!", data);
  } catch (error) {
    console.error("❌ Failed to seed Firebase:", error.message);
    console.log("Tip: Make sure Firebase Realtime Database Rules are set to { \".read\": true, \".write\": true }");
  }
}

seedDatabase();
