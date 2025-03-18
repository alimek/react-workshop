# 🏋️ React Workshop – Day 2: Game Settings & Global State

## 🎯 Goal

By the end of **Day 2**, participants will:

- Use **forms in React** to customize game settings.
- Manage **global state** with **Zustand**.
- Fetch & store game configurations using **TanStack Query**.
- Use **Suspense** and fallback while loading external data
- Improve component structure & reusability.

---

## 📌 Overview

Participants will extend the **Memory Game** by:

- Adding a **Game Settings Form**.
- Storing user-selected settings in **global state** and persist them in localStorge (Zustand).
- Simulating an API request using **TanStack Query**.
- Dynamically generating the **game grid** based on settings.

---

## 🛠 Features to Implement

### **1️⃣ Game Settings Form**

- Create a **settings screen** where users can configure:
  - **Grid size** (e.g., 3x3, 5x5, 10x10) by just defining the size as number.
  - **Difficulty level** (e.g., Easy, Medium, Hard) which will change time for user to find 2nd card matching previous.
- Use **React Hook Form** for form handling.

### **2️⃣ Managing Global State with Zustand**

- Store **settings** in a Zustand store.

Store should be created in `lib/store/settings.ts` with name `useSettingsStore`:

1. Define `level` which is enum of levels, default value "easy" - get from `defaultGameConfig`
2. Define `gridSize` which is number eg, 2,4,6,8,10, default 2 - get form `defaultGameConfig`
3. Define actions with `updateSettings`
4. Use `persist` from `zustand/middleware` to store values in **localStorage**.
5. Add `isHydrated` boolean (default: false) to store and`action`setHydrated`
6. Define `onRehydrateStorage` and set `isHydrated` after hydration finishes and define `partialize` - store only `gridSize` and `level` in localStorage.

- Access settings using store hooks across components (GameBoard, SettingsForm, etc.).

### **3️⃣ Fetching Game Configurations (with TanStack Query)**

- Initialize React Query client

1. Create `Providers` component in shared directory.
2. Create QueryClient, use `QueryClientProvider` and `ReactQueryDevtools`

- Use **TanStack Query** to handle data fetching & caching.

1. Craete hook in `features/game/hooks/game.ts` if you dont have it already and create `useGameCards` which using size from **Settings store** and using `useQuery` to fetch game board config.

- Display a **loading state** while fetching
- Use Suspense with `useSuspenseQuery` to show **loading state**

---

## 🎯 Day 2 Summary

By the end of **Day 2**, participants will:

- ✅ Build a **React form** with controlled inputs.
- ✅ Use **Zustand** for **global state management**.
- ✅ Fetch **game board** with **TanStack Query**.
- ✅ Dynamically **adjust the game board** based on settings.

📌 **Next up (Day 3):**

- Adding **game logic enhancements** (score tracking, game completion screen).
- React re-renders and memoization.
