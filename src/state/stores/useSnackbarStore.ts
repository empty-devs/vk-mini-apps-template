import { create } from 'zustand';
import { ReactElement } from 'react';

type State = {
    snackbarState: ReactElement | null;
};

type Action = {
    setSnackbarState: (snackbarState: State['snackbarState']) => void;
};

export const useSnackbarStore = create<State & Action>(set => ({
    snackbarState: null,
    setSnackbarState: snackbarState => set({ snackbarState: snackbarState })
}));
