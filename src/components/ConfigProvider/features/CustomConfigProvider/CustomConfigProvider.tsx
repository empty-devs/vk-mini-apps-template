import { ReactElement, ReactNode, useEffect } from 'react';
import { ColorScheme, ColorSchemeType, ConfigProvider } from '@vkontakte/vkui';
import { useColorSchemeStore, usePlatformStore } from '@/state';
import bridge, { AnyReceiveMethodName, VKBridgeEvent } from '@vkontakte/vk-bridge';
import { currentPlatform } from '@/utils';
import { setAppBar } from '@/hooks';

interface CustomConfigProviderProps {
    readonly children: ReactNode;
}

export const CustomConfigProvider = ({ children }: CustomConfigProviderProps): ReactElement => {
    const { platformState, setPlatformState } = usePlatformStore();
    const { colorSchemeState, setColorSchemeState } = useColorSchemeStore();

    useEffect(() => {
        const setColorSchemeConfig = (colorScheme: ColorSchemeType) => {
            setAppBar(colorScheme);
            setColorSchemeState(colorScheme);
        };

        bridge.send('VKWebAppGetConfig').then(config => {
            setColorSchemeConfig(config['appearance'] ?? ColorScheme.LIGHT);

            bridge.send('VKWebAppInit').then(init => {
                if (init['result']) {
                    bridge.supportsAsync('VKWebAppResizeWindow').then(isSupport => {
                        if (isSupport) {
                            bridge.send('VKWebAppResizeWindow', { width: 850, height: 600 }).then();
                        }
                    });

                    bridge.subscribe((event: VKBridgeEvent<AnyReceiveMethodName>) => {
                        if (event['detail']['type'] === 'VKWebAppUpdateConfig') {
                            setColorSchemeConfig(event['detail']['data']['appearance'] ?? ColorScheme.LIGHT);
                        }
                    });
                }
            });
        });
    }, []);

    useEffect(() => {
        const onResizeListener = () => {
            setPlatformState(currentPlatform());
        };

        window.addEventListener('resize', onResizeListener, false);

        return () => {
            window.removeEventListener('resize', onResizeListener);
        };
    }, []);

    return (
        <ConfigProvider
            platform={platformState}
            colorScheme={colorSchemeState}
            isWebView={bridge.isWebView()}
            hasCustomPanelHeaderAfter={true}
        >
            {children}
        </ConfigProvider>
    );
};
