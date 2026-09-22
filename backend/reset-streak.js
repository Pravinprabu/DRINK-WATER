const url = "https://prx-sharzz-water-default-rtdb.europe-west1.firebasedatabase.app/users.json";

async function resetStreaks() {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "prx/streak": 0,
      "sharzz/streak": 0
    })
  });
  const data = await res.json();
  console.log("Streaks reset to 0 in Firebase:", data);
}

resetStreaks();
