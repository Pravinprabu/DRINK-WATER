const url = "https://prx-sharzz-water-default-rtdb.europe-west1.firebasedatabase.app/.json";

async function freshStart() {
  const freshData = {
    users: {
      prx: {
        id: "prx",
        name: "Prx",
        todayIntake: 0,
        target: 3500,
        streak: 0,
        lastDrinkTime: null,
        lastDrinkTimestamp: null,
        lastAmountLogged: null,
        history: {}
      },
      sharzz: {
        id: "sharzz",
        name: "Sharzz",
        todayIntake: 0,
        target: 3500,
        streak: 0,
        lastDrinkTime: null,
        lastDrinkTimestamp: null,
        lastAmountLogged: null,
        history: {}
      }
    },
    meta: {
      createdFor: "Prx & Sharzz",
      baseGoalMl: 3500,
      lastDayDate: new Date().toISOString().split("T")[0],
      resetAt: new Date().toISOString()
    },
    lastNudge: null
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(freshData)
  });

  const data = await res.json();
  console.log("🌊 Fresh start complete! Water content reset to 0:", data);
}

freshStart();
