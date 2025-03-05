import bridge from '@vkontakte/vk-bridge';
import { ColorScheme, ColorSchemeType } from '@vkontakte/vkui';

export const setAppBar = (colorScheme: ColorSchemeType | undefined): void => {
    bridge.supportsAsync('VKWebAppSetViewSettings').then(isSupport => {
        if (isSupport) {
            const isLight = colorScheme === ColorScheme['LIGHT'];

            bridge
                .send('VKWebAppSetViewSettings', {
                    status_bar_style: isLight ? ColorScheme['DARK'] : ColorScheme['LIGHT'],
                    action_bar_color: isLight ? '#fff' : '#19191a',
                    navigation_bar_color: isLight ? '#fff' : '#19191a'
                })
                .then();
        }
    });
};

export const getSwitchColorScheme = (colorScheme: ColorSchemeType | undefined): ColorSchemeType => {
    return colorScheme === ColorScheme['LIGHT'] ? ColorScheme['DARK'] : ColorScheme['LIGHT'];
};
