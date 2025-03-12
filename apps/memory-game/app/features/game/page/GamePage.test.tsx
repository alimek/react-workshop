import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { GamePage } from "./GamePage";

describe("GamePage", () => {
  beforeEach(() => {
    // Setup fake timers for controlling setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Cleanup timers
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  test("renders the game board with initial cards", () => {
    render(<GamePage />);

    // Check that all cards are rendered (using question marks as initial state)
    const cardElements = screen.getAllByText("❓");
    expect(cardElements).toHaveLength(4); // Based on the initialCards array
  });

  test("flips a card when clicked", () => {
    render(<GamePage />);

    // Initially all cards show question marks
    const initialCards = screen.getAllByText("❓");
    expect(initialCards).toHaveLength(4);

    // Click the first card
    fireEvent.click(initialCards[0]);

    // The first card should now be flipped and show an emoji
    expect(screen.getByText("🐶")).toBeInTheDocument();

    // The other cards should still be question marks
    expect(screen.getAllByText("❓")).toHaveLength(3);
  });

  test("flips back a single card after timeout", () => {
    render(<GamePage />);

    // Click the first card
    const cards = screen.getAllByText("❓");
    fireEvent.click(cards[0]);

    // Verify card is flipped
    expect(screen.getByText("🐶")).toBeInTheDocument();

    // Fast-forward time by 3 seconds (the timeout for a single card)
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // The card should now be flipped back
    const updatedCards = screen.getAllByText("❓");
    expect(updatedCards).toHaveLength(4);
  });

  test("checks for matches when two cards are flipped", () => {
    render(<GamePage />);

    // Get all cards
    const cards = screen.getAllByText("❓");

    // Click first and third card (should be a match - both are 🐶)
    fireEvent.click(cards[0]); // First 🐶
    fireEvent.click(cards[2]); // Second 🐶

    // Both cards should be visible
    const dogCards = screen.getAllByText("🐶");
    expect(dogCards).toHaveLength(2);

    // Matched cards should remain visible (not flip back)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Verify the matched cards are still visible
    expect(screen.getAllByText("🐶")).toHaveLength(2);
    expect(screen.getAllByText("❓")).toHaveLength(2);
  });

  test("flips back non-matching cards after timeout", () => {
    render(<GamePage />);

    // Get all cards
    const cards = screen.getAllByText("❓");

    // Click first and second card (not a match - 🐶 and 🐈)
    fireEvent.click(cards[0]); // 🐶
    fireEvent.click(cards[1]); // 🐈

    // Verify cards are flipped
    expect(screen.getByText("🐶")).toBeInTheDocument();
    expect(screen.getByText("🐈")).toBeInTheDocument();

    // Advance time to trigger the non-match timeout (1500ms)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // All cards should be flipped back
    expect(screen.getAllByText("❓")).toHaveLength(4);
  });

  test("ignores clicks on already flipped or matched cards", () => {
    render(<GamePage />);

    // Get all cards
    const cards = screen.getAllByText("❓");

    // Click first card to flip it
    fireEvent.click(cards[0]);

    // Verify it's flipped
    expect(screen.getByText("🐶")).toBeInTheDocument();

    // Click the same card again - should have no effect
    const flippedCard = screen.getByText("🐶");
    fireEvent.click(flippedCard);

    // Should still be just one flipped card
    expect(screen.getAllByText("❓")).toHaveLength(3);
    expect(screen.getAllByText("🐶")).toHaveLength(1);
  });

  test("handles more than two cards being flipped", () => {
    render(<GamePage />);

    // Get all cards
    const cards = screen.getAllByText("❓");

    // Flip two cards
    fireEvent.click(cards[0]); // 🐶
    fireEvent.click(cards[1]); // 🐈

    // Verify they're flipped
    expect(screen.getByText("🐶")).toBeInTheDocument();
    expect(screen.getByText("🐈")).toBeInTheDocument();

    // Before timeout, click a third card
    fireEvent.click(cards[2]); // Second 🐶

    // The two previous cards should be flipped back, and the new one should be flipped
    expect(screen.getAllByText("❓")).toHaveLength(3);
    expect(screen.getAllByText("🐶")).toHaveLength(1);
  });

  test("clears timeouts when component unmounts", () => {
    // Create a spy on clearTimeout
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

    // Render and unmount the component
    const { unmount } = render(<GamePage />);

    // Click a card to set up a timeout
    const cards = screen.getAllByText("❓");
    fireEvent.click(cards[0]);

    // Unmount the component
    unmount();

    // Verify clearTimeout was called
    expect(clearTimeoutSpy).toHaveBeenCalled();

    // Restore the original function
    clearTimeoutSpy.mockRestore();
  });

  test("completes the game when all matches are found", () => {
    render(<GamePage />);

    // Get all cards
    const cards = screen.getAllByText("❓");

    // Match the first pair (🐶)
    fireEvent.click(cards[0]); // First 🐶
    fireEvent.click(cards[2]); // Second 🐶

    // Verify match happened
    expect(screen.getAllByText("🐶")).toHaveLength(2);

    // Match the second pair (🐈)
    fireEvent.click(cards[1]); // First 🐈
    fireEvent.click(cards[3]); // Second 🐈

    // Verify all cards are matched and visible
    expect(screen.getAllByText("🐶")).toHaveLength(2);
    expect(screen.getAllByText("🐈")).toHaveLength(2);
    expect(screen.queryAllByText("❓")).toHaveLength(0);
  });
});
