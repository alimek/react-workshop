# 🏋️ React Workshop – Day 1: Basics & Game Board Setup

## 🎯 Goal

By the end of **Day 1**, participants will:

- Understand **React components** and **props**.
- Use **state (`useState`)** to handle UI changes.
- Use **effects (`useEffect`)** for lifecycle management.
- Use **context (`createContext`)** to share state between components.
- Build the foundation of a **Memory Game**.

---

## 📌 Overview

Participants will create a **Memory Game**, a simple grid-based game where players flip cards to match fitness-related icons. The game will:

- Display a **grid of hidden cards**.
- Reveal a card on **click**.
- Hide cards again after a short delay if they do not match.
- Use **state** to track flipped cards.
- Use **effects** to reset the game board.

---

## 📂 Project Structure

Participants will structure the project as follows:

```
apps/memory-game/
│── app/
|   |── routes/
|   |──── here should be entry point for ReactRouter routes
|   |── lib/ - shared libraries/utils functions
|   |── components/ - shared components
|   |── hooks/ - shared hooks
│   ├── features/
│   │   ├── {featureName}
|   |   |──── components/ - feature related components
|   |   |──── pages/ - feature related pages
|   |   |──── hooks/ - feature related hooks
|   |   |──── lib/ - feature related libraries/utils functions
|   |   |────
│   ├── routes.ts main entrypoint which define routes in RR7
│   ├── app.css (load Tailwind CSS)
│── package.json (Project dependencies)
```

---

## 📜 API & Data Model

The game will **not use an external API** in Day 1. Instead, participants will:

- Use **hardcoded data** (an array of fitness-related icons).
- Define a **basic game state** (e.g., an array of flipped cards) at the beginning.

Example game data:

```json
["🏃", "💪", "🏋️", "🤸", "🚴", "🧘"]
```

---

## 🛠 Features to Implement

### **1️⃣ Static Game Board**

- Create a **GameBoard** component that renders a **grid of cards**.
- Create a **GameCard** component that render single Card
- Use an hardcoded array of **emojis** (e.g., 🏃, 🏋️, 🚴).
- Render **hidden cards** initially.

### **2️⃣ Card Flipping with State**

- Introduce `useState` to track if a card is **flipped** or not.
- Clicking a card **reveals** its content.
- Clicking again hides it.

### **3️⃣ Auto Reset with Effects**

- Use `useEffect` to **automatically hide** cards after a delay.

### **4️⃣ Handle clicking many card withing hidding time**

- Introduce context which will store `size` and `cards` for current game.
- Use `gameContext` in **GameBoard** component
- Render `cards` from `gameContext` in the **GameBoard**
- Extend **GameBoard** component for `onClickCard` prop.
- Implement `onClickCard` handle in `GamePage`
  - Ensure non-matching cards flip back after **3 second**.
  - First click on card, should flip the card. If user click the same card again, it does nothing, it should auto flip within 3 seconds.
  - If user click second card within 3 seconds, flip 2nd card.
  - If user click third card within that 3 second from 1st card click, flip two previous card and and loop to second point with the 3rd card being flipped only.

### **5️⃣ Handle click on 2nd card to check if it is matching previous**

- When user click second card, check if it is the same type card as previous, if so mark both as `isMatched: true`.

---

## 🎯 Day 1 Summary

By the end of **Day 1**, participants will:

- ✅ Have a **basic memory game board**.
- ✅ Use **props** to pass data between components.
- ✅ Manage **state** with `useState`.
- ✅ Use **effects** (`useEffect`) to handle **timing logic**.
- ✅ User **context** (`createContext` and `useContext`) to avoid props drilling.
- ✅ Implement **basic interactions** (flipping & auto-reset).

📌 **Next up (Day 2):**

- Adding a **game settings form** (grid size selection).
- Managing **global state** with Zustand.
- Using **TanStack Query** to fetch dynamic game configurations.
