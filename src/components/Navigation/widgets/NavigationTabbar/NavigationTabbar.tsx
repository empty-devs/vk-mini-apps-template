import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { NavigationItemInterface } from '@/interfaces';
import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { navigationItemsRoute, PANELS, VIEWS } from '@/routes';
import { useSnackbarStore } from '@/state';

export const NavigationTabbar = (): ReactElement => {
    const routeNavigator = useRouteNavigator();
    const { view: activeView = VIEWS['HOME'], panel: activePanel = PANELS['HOME'] } = useActiveVkuiLocation();

    const { snackbarState, setSnackbarState } = useSnackbarStore();

    useEffect(() => {
        if (snackbarState) {
            setSnackbarState(null);
        }
    }, [activeView, activePanel]);

    const handlerClick = useCallback(
        (item: NavigationItemInterface) => {
            if (item['view'] !== activeView) {
                routeNavigator.push(item['to']).then();
            } else if (window.scrollY !== 0) {
                window.scroll(window.scrollX, 0);
            } else if (activePanel !== item['panel']) {
                routeNavigator.back().then();
            }
        },
        [activeView, activePanel]
    );

    const memoItems = useMemo(
        () =>
            navigationItemsRoute.map((item: NavigationItemInterface) => (
                <TabbarItem
                    key={item['view']}
                    label={item['text']}
                    onClick={() => handlerClick(item)}
                    selected={item['view'] === activeView}
                >
                    {item['icon']}
                </TabbarItem>
            )),
        [activeView, handlerClick]
    );

    return <Tabbar>{memoItems}</Tabbar>;
};
