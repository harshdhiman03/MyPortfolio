import { create } from 'zustand';

type Vec3 = [number, number, number];

type CameraState = {
  position: Vec3;
  lookAt: Vec3;
  setTarget: (position: Vec3, lookAt: Vec3) => void;
};

export const useCameraStore = create<CameraState>((set) => ({
  position: [0, 5, 10],
  lookAt: [0, 0, 0],
  setTarget: (position, lookAt) => set({ position, lookAt }),
}));
