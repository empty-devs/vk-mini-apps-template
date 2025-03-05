import { ColorScheme, ColorSchemeType } from '@vkontakte/vkui';

export const currentColorScheme = (): ColorSchemeType => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    return mediaQuery.matches ? ColorScheme['LIGHT'] : ColorScheme['DARK'];
};
