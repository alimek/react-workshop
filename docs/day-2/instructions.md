# 🏋️ React Workshop – Day 2: Game Settings & Global State

## 🎯 Goal

By the end of **Day 2**, participants will:

- Use **forms in React** to customize game settings.
- Manage **global state** with **Zustand**.
- Fetch & store game configurations using **TanStack Query** (mocked API).
- Improve component structure & reusability.

---

## 📌 Overview

Participants will extend the **Fitness Memory Game** by:

- Adding a **Game Settings Form**.
- Storing user-selected settings in **global state** (Zustand).
- Simulating an API request using **TanStack Query**.
- Dynamically generating the **game grid** based on settings.

---

## 🛠 Features to Implement

### **1️⃣ Game Settings Form**

- Create a **settings screen** where users can configure:
  - **Grid size** (e.g., 3x3, 5x5, 10x10).
  - **Difficulty level** (e.g., Easy, Medium, Hard).
- Use **React Hook Form** for form handling.

### **2️⃣ Managing Global State with Zustand**

- Store **game settings** in a Zustand store.
- Access settings across components (GameBoard, SettingsForm, etc.).

### **3️⃣ Fetching Game Configurations (Mocked API with TanStack Query)**

- Simulate fetching predefined **game settings** from an API.
- Use **TanStack Query** to handle data fetching & caching.
- Display a **loading state** while fetching.

### **4️⃣ Updating Game Board Based on Settings**

- Adjust the **number of cards** based on the selected **grid size**.
- Change **card reveal times** based on difficulty level.

---

## 📜 API & Data Model

Participants will use a **mocked API** for game settings:

```json
{
  "gridSizes": [
    { "id": 1, "size": "3x3" },
    { "id": 2, "size": "5x5" },
    { "id": 3, "size": "10x10" }
  ],
  "difficulties": ["Easy", "Medium", "Hard"]
}
```

---

## 🎯 Day 2 Summary

By the end of **Day 2**, participants will:

- ✅ Build a **React form** with controlled inputs.
- ✅ Use **Zustand** for **global state management**.
- ✅ Fetch **mocked game settings** with **TanStack Query**.
- ✅ Dynamically **adjust the game board** based on settings.

📌 **Next up (Day 3):**

- Adding **game logic enhancements** (score tracking, game completion screen).
- Animations & UI improvements.
- Refactoring & best practices.
