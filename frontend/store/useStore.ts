import { create } from 'zustand';
import { ImagePredictionResponse, LabPredictionResponse } from '../lib/api';

interface AppState {
  isDemoModalOpen: boolean;
  setDemoModalOpen: (isOpen: boolean) => void;
  
  // Image Scan State
  isImageLoading: boolean;
  imageError: string | null;
  imageResult: ImagePredictionResponse | null;
  setImageLoading: (loading: boolean) => void;
  setImageError: (error: string | null) => void;
  setImageResult: (result: ImagePredictionResponse | null) => void;

  // Lab Data State
  isLabLoading: boolean;
  labError: string | null;
  labResult: LabPredictionResponse | null;
  setLabLoading: (loading: boolean) => void;
  setLabError: (error: string | null) => void;
  setLabResult: (result: LabPredictionResponse | null) => void;
  
  // Server Status
  serverStatus: 'checking' | 'online' | 'offline';
  setServerStatus: (status: 'checking' | 'online' | 'offline') => void;
  
  // Reset functionality
  resetState: () => void;
}

export const useStore = create<AppState>((set) => ({
  isDemoModalOpen: false,
  setDemoModalOpen: (isOpen) => set({ isDemoModalOpen: isOpen }),

  isImageLoading: false,
  imageError: null,
  imageResult: null,
  setImageLoading: (loading) => set({ isImageLoading: loading }),
  setImageError: (error) => set({ imageError: error }),
  setImageResult: (result) => set({ imageResult: result }),

  isLabLoading: false,
  labError: null,
  labResult: null,
  setLabLoading: (loading) => set({ isLabLoading: loading }),
  setLabError: (error) => set({ labError: error }),
  setLabResult: (result) => set({ labResult: result }),

  serverStatus: 'checking',
  setServerStatus: (status) => set({ serverStatus: status }),

  resetState: () => set({
    imageError: null,
    imageResult: null,
    labError: null,
    labResult: null,
  }),
}));
