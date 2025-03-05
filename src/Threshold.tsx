import { ReactElement, ReactNode, useEffect, useState } from 'react';
import bridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';
import { CopyrightFooter } from '@/components';
import {
    AppRoot,
    ConfigProvider,
    FixedLayout,
    Link,
    Panel,
    Placeholder,
    Root,
    Spinner,
    SplitCol,
    SplitLayout,
    View
} from '@vkontakte/vkui';
import { config_vk_app_id } from '@/configs';
import { currentColorScheme, currentPlatform } from '@/utils';
import App from '@/App';

enum ThresholdState {
    LOADING,
    EMBEDDED,
    NOT_EMBEDDED
}

export const Threshold = (): ReactElement => {
    const [state, setState] = useState<ThresholdState>(ThresholdState.LOADING);

    useEffect(() => {
        const { sign, vk_app_id } = parseURLSearchParamsForGetLaunchParams(window.location.search);

        if (bridge.isEmbedded() && sign && vk_app_id === Number(config_vk_app_id)) {
            const initializeBridge = async () => {
                try {
                    const isSupport = await bridge.supportsAsync('VKWebAppInit');

                    if (isSupport) {
                        setState(ThresholdState.EMBEDDED);

                        if (import.meta.env.DEV) {
                            import('./eruda');
                        }
                    } else {
                        setState(ThresholdState.NOT_EMBEDDED);
                    }
                } catch (_error) {
                    setState(ThresholdState.NOT_EMBEDDED);
                }
            };

            initializeBridge().then();
        } else {
            setState(ThresholdState.NOT_EMBEDDED);
        }
    }, []);

    if (state !== ThresholdState.EMBEDDED) {
        return (
            <Layout>
                <Placeholder stretched={true}>
                    {state === ThresholdState.LOADING && <Spinner size="m" />}
                    {state === ThresholdState.NOT_EMBEDDED && (
                        <>
                            <span>Я </span>
                            <Link href={'https://vk.com/app' + config_vk_app_id} target="_blank">
                                ЗДЕСЬ
                            </Link>
                            <span>!</span>
                        </>
                    )}
                </Placeholder>
            </Layout>
        );
    }

    return <App />;
};

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <ConfigProvider platform={currentPlatform()} colorScheme={currentColorScheme()}>
            <AppRoot mode="full">
                <SplitLayout>
                    <SplitCol>
                        <Root nav="root" activeView="view">
                            <View nav="view" activePanel="panel">
                                <Panel nav="panel">
                                    {children}
                                    <FixedLayout vertical="bottom">
                                        <CopyrightFooter />
                                    </FixedLayout>
                                </Panel>
                            </View>
                        </Root>
                    </SplitCol>
                </SplitLayout>
            </AppRoot>
        </ConfigProvider>
    );
};
