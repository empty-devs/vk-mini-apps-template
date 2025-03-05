import { ReactElement, useEffect, useState } from 'react';
import { Epic, FixedLayout, Placeholder, Platform, Spinner, SplitCol } from '@vkontakte/vkui';
import { InitAppType } from '@/types';
import { CopyrightFooter, CustomSplitLayout, MiniSplitLayout, NavigationMenu, NavigationTabbar } from '@/components';
import { appInit } from '@/services';
import { usePlatformStore, useSnackbarStore } from '@/state';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { ROOTS } from '@/routes';

interface NavigationProps {
    readonly children: ReactElement | ReactElement[];
}

export const Navigation = ({ children }: NavigationProps): ReactElement => {
    const [initApp, setInitApp] = useState<InitAppType>([false, null]);

    const { root: activeRoot = ROOTS['MAIN'] } = useActiveVkuiLocation();

    const platformState = usePlatformStore(state => state.platformState);
    const isDesktop: boolean = platformState === Platform.VKCOM;

    const { snackbarState, setSnackbarState } = useSnackbarStore();

    useEffect(() => {
        reInitApp();
    }, []);

    const reInitApp = () => {
        if (appInit(setInitApp, reInitApp, setSnackbarState)) {
            setInitApp([true]);
        }
    };

    if (initApp[0]) {
        return (
            <CustomSplitLayout isDesktop={isDesktop}>
                <SplitCol
                    width={isDesktop ? undefined : '100%'}
                    maxWidth={isDesktop ? 600 : '100%'}
                    animate={!isDesktop}
                >
                    {isDesktop ? (
                        children
                    ) : (
                        <Epic activeStory={activeRoot} tabbar={<NavigationTabbar />}>
                            {children}
                        </Epic>
                    )}
                    {snackbarState}
                </SplitCol>
                {isDesktop && <NavigationMenu />}
            </CustomSplitLayout>
        );
    }

    return (
        <MiniSplitLayout isDesktop={isDesktop}>
            {initApp[1] ?? (
                <Placeholder stretched={true}>
                    <Spinner size="m" />
                </Placeholder>
            )}
            <FixedLayout vertical="bottom">
                <CopyrightFooter />
            </FixedLayout>
        </MiniSplitLayout>
    );
};
