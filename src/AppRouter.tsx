import { ReactElement } from 'react';
import {
    useActiveVkuiLocation,
    useGetPanelForView,
    usePopout,
    useRouteNavigator
} from '@vkontakte/vk-mini-apps-router';
import { LazyPanelWrapper, Navigation } from '@/components';
import { Root, View } from '@vkontakte/vkui';
import { PANELS, ROOTS, VIEWS } from '@/routes';

export const AppRouter = (): ReactElement => {
    const routeNavigator = useRouteNavigator();
    const { view: activeView = VIEWS['HOME'], modal: activeModal, panelsHistory } = useActiveVkuiLocation();
    const routerPopout = usePopout();

    const history = activeModal || routerPopout ? [] : panelsHistory;

    return (
        <Navigation>
            <Root nav={ROOTS['MAIN']} activeView={activeView}>
                <View
                    nav={VIEWS['HOME']}
                    history={history}
                    activePanel={useGetPanelForView(VIEWS['HOME']) || PANELS['HOME']}
                    onSwipeBack={() => routeNavigator.back()}
                >
                    <LazyPanelWrapper nav={PANELS['HOME']} loader={() => import('@/panels/Home/Home/Home')} />
                    <LazyPanelWrapper nav={PANELS['PERSIK']} loader={() => import('@/panels/Home/Persik/Persik')} />
                </View>
                <View
                    nav={VIEWS['INFO']}
                    history={history}
                    activePanel={useGetPanelForView(VIEWS['INFO']) || PANELS['INFO']}
                    onSwipeBack={() => routeNavigator.back()}
                >
                    <LazyPanelWrapper nav={PANELS['INFO']} loader={() => import('@/panels/Info/Info/Info')} />
                </View>
            </Root>
        </Navigation>
    );
};
