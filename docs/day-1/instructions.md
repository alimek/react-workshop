# 🏋️ React Workshop – Day 1: Basics & Game Board Setup

## 🎯 Goal
By the end of **Day 1**, participants will:
- Understand **React components** and **props**.
- Use **state (`useState`)** to handle UI changes.
- Use **effects (`useEffect`)** for lifecycle management.
- Build the foundation of a **Fitness Memory Game**.

---

## 📌 Overview
Participants will create a **Fitness Memory Game**, a simple grid-based game where players flip cards to match fitness-related icons. The game will:
- Display a **grid of hidden cards**.
- Reveal a card on **click**.
- Hide cards again after a short delay if they do not match.
- Use **state** to track flipped cards.
- Use **effects** to reset the game board.

---

## 📂 Project Structure
Participants will structure the project as follows:

```
apps/fitness-memory-game/
│── src/
│   ├── components/
│   │   ├── GameBoard.js (Renders the game grid)
│   │   ├── Card.js (Handles individual card state)
│   ├── App.js (Main entry point)
│   ├── index.css (Basic styles)
│── package.json (Project dependencies)
```

---

## 🛠 Features to Implement

### **1️⃣ Static Game Board**
- Create a **GameBoard** component that renders a **grid of cards**.
- Use an array of **fitness-related emojis** (e.g., 🏃, 🏋️, 🚴).
- Render **hidden cards** initially.

### **2️⃣ Card Flipping with State**
- Introduce `useState` to track if a card is **flipped** or not.
- Clicking a card **reveals** its content.
- Clicking again hides it.

### **3️⃣ Auto Reset with Effects**
- Use `useEffect` to **automatically hide** cards after a delay.
- Ensure non-matching cards flip back after **1 second**.

---

## 📜 API & Data Model

The game will **not use an external API** in Day 1. Instead, participants will:
- Use **hardcoded data** (an array of fitness-related icons).
- Define a **basic game state** (e.g., an array of flipped cards).

Example game data:
```json
["🏃", "💪", "🏋️", "🤸", "🚴", "🧘"]
```

---

## 🎯 Day 1 Summary

By the end of **Day 1**, participants will:
- ✅ Have a **basic memory game board**.
- ✅ Use **props** to pass data between components.
- ✅ Manage **state** with `useState`.
- ✅ Use **effects** (`useEffect`) to handle **timing logic**.
- ✅ Implement **basic interactions** (flipping & auto-reset).

📌 **Next up (Day 2):** 
- Adding a **game settings form** (grid size selection).
- Managing **global state** with Zustand.
- Using **TanStack Query** to fetch dynamic game configurations.