# Prx & Sharzz Hydration Backend 💧

This directory contains server-side helpers, seed scripts, and API routes for the **Prx & Sharzz Hydration Hub**.

## Features
- **Express Server (`server.js`)**: Provides health checks, summary REST endpoints, and daily midnight reset triggers.
- **Firebase Seed Script (`seed.js`)**: Quickly initializes the database schema with Prx and Sharzz's 3.5L goal.
- **Direct Cloud Sync**: The frontend directly connects to Firebase Realtime Database via WebSockets for instant, sub-second sync between laptops.

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Initialize / Seed the Firebase database:
   ```bash
   npm run seed
   ```
3. Run the backend server (optional):
   ```bash
   npm run dev
   ```
