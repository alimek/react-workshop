import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { defaultGameConfig, levels } from "@workshop/interfaces/game";

export const settingsSchema = z.object({
  gridSize: z.string().transform((value) => Number(value)),
  level: z.enum(levels),
});

export type SettingsState = z.infer<typeof settingsSchema>;

interface SettingsStore extends SettingsState {
  isHydrated: boolean;
  actions: {
    updateSettings: (settings: SettingsState) => void;
    setHydrated: (isHydrated: boolean) => void;
  };
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      gridSize: defaultGameConfig.boardSize,
      level: defaultGameConfig.level,
      isHydrated: false,
      actions: {
        updateSettings: (settings) => set(() => settings),
        setHydrated: (isHydrated) => set(() => ({ isHydrated })),
      },
    }),
    {
      name: "memory-game-settings",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        return () => state.actions.setHydrated(true);
      },
      partialize: (state) => ({
        gridSize: state.gridSize,
        level: state.level,
      }),
    },
  ),
);

export const useSettingsStoreReady = () =>
  useSettingsStore((state) => state.isHydrated);

export const useSettingsLevel = () => useSettingsStore((state) => state.level);

export const useSettingsGridSize = () =>
  useSettingsStore((state) => state.gridSize);
