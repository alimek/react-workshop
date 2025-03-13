import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { SettingsForm } from "../components/SettingsForm";
import { SettingsPage } from "./SettingsPage";

// Mock the SettingsForm component
vi.mock("../components/SettingsForm", () => ({
  SettingsForm: vi.fn(() => <div data-testid="settings-form" />),
}));

test("SettingsPage", () => {
  render(<SettingsPage />);

  // Check if the title is rendered
  expect(screen.getByText("Settings")).toBeInTheDocument();

  // Check if the SettingsForm is rendered with the onSubmit prop
  expect(screen.getByTestId("settings-form")).toBeInTheDocument();

  // Verify SettingsForm was called
  expect(SettingsForm).toHaveBeenCalled();

  // Verify the onSubmit prop was passed and is a function
  const mockSettingsForm = SettingsForm as unknown as {
    mock: { calls: any[][] };
  };
  const callArgs = mockSettingsForm.mock.calls[0][0];
  expect(callArgs).toHaveProperty("onSubmit");
  expect(typeof callArgs.onSubmit).toBe("function");
});
