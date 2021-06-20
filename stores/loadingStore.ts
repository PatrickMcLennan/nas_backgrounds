import create from 'zustand';

type LoadingState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useLoading = create<LoadingState>((set) => ({
  loading: false,

  setLoading: (value: boolean) =>
    set((state) => ({
      ...state,
      loading: value,
    })),
}));
