import { PlatformType } from '@vkontakte/vkui';
import { currentPlatform } from '@/utils';
import { create } from 'zustand/index';

type State = {
    platformState: PlatformType | undefined;
};

type Action = {
    setPlatformState: (platformState: State['platformState']) => void;
};

export const usePlatformStore = create<State & Action>(set => ({
    platformState: currentPlatform(),
    setPlatformState: platformState => set({ platformState: platformState })
}));
