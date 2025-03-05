import { Cell, Group, List, Panel, PanelHeader, Platform, SplitCol } from '@vkontakte/vkui';
import { NavigationItemInterface } from '@/interfaces';
import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { usePlatformStore, useSnackbarStore } from '@/state';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { navigationItemsRoute, PANELS, VIEWS } from '@/routes';

export const NavigationMenu = (): ReactElement => {
    const routeNavigator = useRouteNavigator();
    const { view: activeView = VIEWS['HOME'], panel: activePanel = PANELS['HOME'] } = useActiveVkuiLocation();

    const platformState = usePlatformStore(state => state.platformState);

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
                <Cell
                    key={item['view']}
                    before={item['icon']}
                    onClick={() => handlerClick(item)}
                    style={
                        item['view'] === activeView
                            ? { background: 'var(--vkui--color_background_secondary)' }
                            : undefined
                    }
                >
                    {item['text']}
                </Cell>
            )),
        [activeView, handlerClick]
    );

    return (
        <SplitCol width={230} maxWidth={230} autoSpaced={true} fixed={true} style={{ marginRight: 0 }}>
            <Panel id="navigation_menu">
                {platformState !== Platform.VKCOM && <PanelHeader />}
                <Group>
                    <List>{memoItems}</List>
                </Group>
            </Panel>
        </SplitCol>
    );
};
