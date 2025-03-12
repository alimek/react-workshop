# 🏋️ React Workshop – Day 3: Game Logic & UI Enhancements

## 🎯 Goal
By the end of **Day 3**, participants will:
- Implement **game logic** (matching pairs, win conditions, score tracking).
- Use **React state & effects** to manage gameplay.
- Add **animations for a better user experience**.
- Refactor components for **better reusability & maintainability**.

---

## 📌 Overview
Participants will finalize the **Fitness Memory Game** by:
- Implementing **matching logic** for flipped cards.
- Keeping track of **player score & attempts**.
- Displaying a **game completion screen**.
- Adding **animations & UI improvements**.

---

## 🛠 Features to Implement

### **1️⃣ Implementing Game Logic**
- **Flipping Cards**: Handle the state when a card is clicked.
- **Matching Logic**:
  - Check if two flipped cards match.
  - If they match, keep them visible.
  - If they don’t match, flip them back after a delay.
- **Win Condition**: Display a completion screen when all pairs are matched.

### **2️⃣ Tracking Score & Attempts**
- Store the **number of attempts** in **state**.
- Increase **score** based on successful matches.
- Display **real-time score updates** on the UI.

### **3️⃣ Adding Animations & UI Enhancements**
- Animate **card flips** using CSS or a library like Framer Motion.
- Add a **fade-in effect** for the game board.
- Show a **confetti animation** when the game is completed.

### **4️⃣ Refactoring & Best Practices**
- Extract reusable components (e.g., `Card`, `Scoreboard`).
- Optimize **React state management**.
- Ensure **responsive design** for different screen sizes.

---

## 📂 Project Structure (Final Version)

```
apps/memory-game/
│── src/
│   ├── components/
│   │   ├── GameBoard.js (Handles game state & logic)
│   │   ├── Card.js (Handles individual card animations & state)
│   │   ├── Scoreboard.js (Displays score & attempts)
│   │   ├── CompletionScreen.js (Shows when game is won)
│   ├── store/
│   │   ├── useGameStore.js (Global state for game settings & score)
│   ├── api/
│   │   ├── gameConfig.js (Mocked API with TanStack Query)
│   ├── App.js (Main entry point)
│── package.json (Project dependencies)
│── README.md (Documentation)
```

---

## 📜 Gameplay Flow
1️⃣ **User selects game settings** (grid size, difficulty).  
2️⃣ **Game board is generated** dynamically.  
3️⃣ **User clicks on cards** to reveal them.  
4️⃣ **If two cards match**, they stay visible; otherwise, they flip back.  
5️⃣ **Score updates** with each match.  
6️⃣ **Game completion screen** appears once all pairs are found.  
7️⃣ **User can restart the game** with new settings.  

---

## 🎯 Day 3 Summary
By the end of **Day 3**, participants will:
- ✅ Implement **core game logic** (flipping, matching, scoring).
- ✅ Manage **game state & effects** in React.
- ✅ Add **animations for a smoother experience**.
- ✅ Refactor code for **better structure & maintainability**.

🎉 **Workshop Complete!** 🎉