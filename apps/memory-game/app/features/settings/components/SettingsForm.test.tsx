import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultGameConfig } from "@workshop/interfaces/game";

import type { SettingsState } from "~/lib/store/settings";
import { useSettingsStore } from "~/lib/store/settings";
import { SettingsForm } from "./SettingsForm";

// Mock the settings store
vi.mock("~/lib/store/settings", async () => {
  const actual = await vi.importActual("~/lib/store/settings");
  return {
    ...actual,
    useSettingsStore: vi.fn(),
  };
});

describe("SettingsForm", () => {
  const mockUpdateSettings = vi.fn();

  // Setup for the mock store
  beforeEach(() => {
    mockUpdateSettings.mockClear();

    // Type the mock function properly
    (
      useSettingsStore as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation((selector: (state: any) => any) => {
      const state = {
        gridSize: defaultGameConfig.boardSize,
        level: defaultGameConfig.level,
        isHydrated: true,
        actions: {
          updateSettings: mockUpdateSettings,
          resetSettings: vi.fn(),
          setHydrated: vi.fn(),
        },
      };

      return selector(state);
    });
  });

  it("renders with default values", () => {
    render(<SettingsForm />);

    // Check if form elements are in the document
    expect(screen.getByText(/grid size/i)).toBeInTheDocument();
    expect(screen.getByText(/difficulty/i)).toBeInTheDocument();

    // Save button should not be visible initially
    expect(
      screen.queryByRole("button", { name: /save/i }),
    ).not.toBeInTheDocument();

    // Verify grid size input exists
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();

    // Check that level select has the correct default value
    const selectValue = screen
      .getByRole("combobox")
      .querySelector('[data-slot="select-value"]');
    expect(selectValue).toHaveTextContent("Easy");
  });

  it("allows changing grid size", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const gridSizeInput = screen.getByRole<HTMLInputElement>("spinbutton");

    // Change value
    await user.clear(gridSizeInput);
    await user.type(gridSizeInput, "4");

    expect(gridSizeInput.value).toBe("4");

    // Save button should appear after changes
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it.skip("allows changing difficulty", async () => {
    render(<SettingsForm />);

    const selectValue = screen
      .getByRole("combobox")
      .querySelector('[data-slot="select-value"]');
    expect(selectValue).toHaveTextContent("Easy");
  });

  it("shows validation error for grid size below minimum", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const gridSizeInput = screen.getByRole<HTMLInputElement>("spinbutton");

    // Set invalid value
    await user.clear(gridSizeInput);
    await user.type(gridSizeInput, "1");

    // Save button should appear after changes
    const submitButton = await screen.findByRole("button", { name: /save/i });

    // Submit the form
    await user.click(submitButton);

    // Check for error message - using the more appropriate findByText for async appearance
    const errorMessage = await screen.findByText(
      /must be greater than or equal to 2/i,
    );
    expect(errorMessage).toBeInTheDocument();

    // Ensure the submit function wasn't called
    expect(mockUpdateSettings).not.toHaveBeenCalled();
  });

  it("shows validation error for grid size above maximum", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const gridSizeInput = screen.getByRole<HTMLInputElement>("spinbutton");

    // Set invalid value
    await user.clear(gridSizeInput);
    await user.type(gridSizeInput, "12");

    // Save button should appear after changes
    const submitButton = await screen.findByRole("button", { name: /save/i });

    // Submit the form
    await user.click(submitButton);

    // Check for error message with more specific text
    const errorMessage = await screen.findByText(
      /must be less than or equal to 10/i,
    );
    expect(errorMessage).toBeInTheDocument();

    // Ensure the submit function wasn't called
    expect(mockUpdateSettings).not.toHaveBeenCalled();
  });

  it("validates that grid size must be an even number", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const gridSizeInput = screen.getByRole<HTMLInputElement>("spinbutton");

    // Set invalid odd value
    await user.clear(gridSizeInput);
    await user.type(gridSizeInput, "3");

    // Save button should appear after changes
    const submitButton = await screen.findByRole("button", { name: /save/i });

    // Submit the form
    await user.click(submitButton);

    // Check for step validation error
    const errorMessage = await screen.findByText(/must be a multiple of 2/i);
    expect(errorMessage).toBeInTheDocument();

    // Ensure the submit function wasn't called
    expect(mockUpdateSettings).not.toHaveBeenCalled();
  });

  it("submits form with valid values", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const gridSizeInput = screen.getByRole<HTMLInputElement>("spinbutton");

    // Change grid size
    await user.clear(gridSizeInput);
    await user.type(gridSizeInput, "6");

    // Save button should appear after changes
    const submitButton = await screen.findByRole("button", { name: /save/i });

    // Submit the form
    await user.click(submitButton);

    // Check that submit was called with correct values
    await waitFor(() => {
      expect(mockUpdateSettings).toHaveBeenCalledTimes(1);
      expect(mockUpdateSettings).toHaveBeenCalledWith({
        gridSize: 6,
        level: "easy",
      });
    });
  });
});
