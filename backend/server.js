import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Firebase Realtime Database URL
const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL || "https://prx-sharzz-water-default-rtdb.europe-west1.firebasedatabase.app";

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Prx & Sharzz Hydration Hub API',
    time: new Date().toISOString()
  });
});

// Fetch current hydration stats from Firebase via REST API
app.get('/api/hydration-summary', async (req, res) => {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/users.json`);
    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Trigger daily midnight reset helper
app.post('/api/reset-day', async (req, res) => {
  try {
    const updatePayload = {
      "prx/todayIntake": 0,
      "sharzz/todayIntake": 0,
      "prx/lastReset": new Date().toISOString().split('T')[0],
      "sharzz/lastReset": new Date().toISOString().split('T')[0]
    };
    
    const response = await fetch(`${FIREBASE_DB_URL}/users.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    
    const data = await response.json();
    res.json({ success: true, message: 'Hydration counters reset for the new day', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`💧 Prx & Sharzz Hydration Backend running on http://localhost:${PORT}`);
});
