import { Platform, PlatformType } from '@vkontakte/vkui';

export const currentPlatform = (): PlatformType | undefined => {
    if (window['innerWidth'] >= 768 && window.matchMedia('(orientation: landscape)').matches) {
        return Platform['VKCOM'];
    }

    return undefined;
};
