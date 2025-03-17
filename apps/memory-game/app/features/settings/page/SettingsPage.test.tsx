import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useSettingsStoreReady } from "~/lib/store/settings";
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

vi.mock("react-router", () => ({
  Link: vi.fn(({ children }: { children: React.ReactNode }) => (
    <a data-testid="link" role="link">
      {children}
    </a>
  )),
}));

describe("SettingsPage", () => {
  describe("when the settings are not ready", () => {
    beforeEach(() => {
      vi.mocked(useSettingsStoreReady).mockReturnValue(false);
    });

    it("should render a loading message", () => {
      render(<SettingsPage />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("when the settings are ready", () => {
    beforeEach(() => {
      vi.mocked(useSettingsStoreReady).mockReturnValue(true);
    });

    it("should render the title", () => {
      render(<SettingsPage />);

      // Check if the title is rendered
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("should render the SettingsForm", () => {
      render(<SettingsPage />);

      // Check if the SettingsForm is rendered
      expect(screen.getByTestId("settings-form")).toBeInTheDocument();
      // Verify SettingsForm was called
      expect(SettingsForm).toHaveBeenCalled();
    });

    it("should render the Start Game button", () => {
      render(<SettingsPage />);

      // Check if the Start Game button is rendered
      expect(
        screen.getByRole("link", { name: "Start Game" }),
      ).toBeInTheDocument();
    });
  });
});
