import { create } from 'zustand';
import { ColorSchemeType } from '@vkontakte/vkui';
import { currentColorScheme } from '@/utils';

type State = {
    colorSchemeState: ColorSchemeType;
};

type Action = {
    setColorSchemeState: (colorSchemeState: State['colorSchemeState']) => void;
};

export const useColorSchemeStore = create<State & Action>(set => ({
    colorSchemeState: currentColorScheme(),
    setColorSchemeState: colorSchemeState => set({ colorSchemeState: colorSchemeState })
}));
