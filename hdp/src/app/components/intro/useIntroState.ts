import { create } from 'zustand';

type IntroState = {
  introStarted: boolean;
  introCompleted: boolean;
  setIntroStarted: (started: boolean) => void;
  setIntroCompleted: (completed: boolean) => void;
};

export const useIntroState = create<IntroState>((set) => ({
  introStarted: false,
  introCompleted: false,
  setIntroStarted: (introStarted) => set({ introStarted }),
  setIntroCompleted: (introCompleted) => set({ introCompleted }),
}));
