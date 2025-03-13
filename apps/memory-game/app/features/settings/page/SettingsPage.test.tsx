import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { SettingsForm } from "../components/SettingsForm";
import { SettingsPage } from "./SettingsPage";

// Mock the SettingsForm component
vi.mock("../components/SettingsForm", () => ({
  SettingsForm: vi.fn(() => <div data-testid="settings-form" />),
}));

// Mock the useSettingsStoreReady hook
vi.mock("~/lib/store/settings", () => ({
  useSettingsStoreReady: vi.fn(() => true),
}));

test("SettingsPage", () => {
  render(<SettingsPage />);

  // Check if the title is rendered
  expect(screen.getByText("Settings")).toBeInTheDocument();

  // Check if the SettingsForm is rendered
  expect(screen.getByTestId("settings-form")).toBeInTheDocument();

  // Verify SettingsForm was called
  expect(SettingsForm).toHaveBeenCalled();
});
