import { Group, Panel, PanelHeader, PanelProps, ScreenSpinner, SimpleCell } from '@vkontakte/vkui';
import {
    Icon28BillheadOutline,
    Icon28CheckCircleOutline,
    Icon28ChevronRightOutline,
    Icon28ErrorCircleOutline,
    Icon28PaletteOutline,
    Icon28PawOutline,
    Icon28Spinner,
    Icon28WarningTriangleOutline
} from '@vkontakte/icons';
import { getSwitchColorScheme, setAppBar } from '@/hooks';
import { useColorSchemeStore, useSnackbarStore } from '@/state';
import { ReactElement } from 'react';
import { BlockerFunction, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { TestAlert } from '@/popouts';
import { MODALS, PANELS } from '@/routes';
import { ErrorSnackbar, SuccessSnackbar } from '@/components';

const Home = ({ nav }: PanelProps): ReactElement => {
    const routeNavigator = useRouteNavigator();

    const setSnackbarState = useSnackbarStore(state => state.setSnackbarState);
    const { colorSchemeState, setColorSchemeState } = useColorSchemeStore();

    const test_alert = TestAlert();

    return (
        <Panel id={PANELS['HOME']} nav={nav}>
            <PanelHeader>Главная</PanelHeader>
            <Group>
                <SimpleCell
                    before={<Icon28PaletteOutline />}
                    onClick={() => {
                        setColorSchemeState(getSwitchColorScheme(colorSchemeState));
                        setAppBar(getSwitchColorScheme(colorSchemeState));
                    }}
                >
                    Альтернативная тема
                </SimpleCell>
            </Group>
            <Group>
                <SimpleCell
                    before={<Icon28PawOutline />}
                    after={<Icon28ChevronRightOutline />}
                    onClick={() => routeNavigator.push(`/${PANELS['PERSIK']}`)}
                >
                    Покажи Персика!
                </SimpleCell>
            </Group>
            <Group>
                <SimpleCell
                    before={<Icon28BillheadOutline />}
                    onClick={() => routeNavigator.push(`/${MODALS['MODAL']}`)}
                >
                    Покажи модальную карточку
                </SimpleCell>
                <SimpleCell
                    before={<Icon28WarningTriangleOutline />}
                    onClick={() => routeNavigator.showPopout(test_alert)}
                >
                    Показать предупреждение
                </SimpleCell>
                <SimpleCell
                    before={<Icon28Spinner />}
                    onClick={() => {
                        routeNavigator.showPopout(<ScreenSpinner state="loading" />).then(() => {
                            const blockerFunction: BlockerFunction = () => true;
                            const unblock = routeNavigator.block(blockerFunction);

                            setTimeout(() => {
                                routeNavigator.hidePopout().then(() => unblock());
                            }, 2000);
                        });
                    }}
                >
                    Экранный спиннер
                </SimpleCell>
            </Group>
            <Group>
                <SimpleCell
                    before={<Icon28CheckCircleOutline />}
                    onClick={() => setSnackbarState(<SuccessSnackbar>Cнекбар успешно появился</SuccessSnackbar>)}
                >
                    Покажи добрый снекбар
                </SimpleCell>
                <SimpleCell
                    before={<Icon28ErrorCircleOutline />}
                    onClick={() => setSnackbarState(<ErrorSnackbar>Ой, ошибочка</ErrorSnackbar>)}
                >
                    Покажи злой снекбар
                </SimpleCell>
            </Group>
        </Panel>
    );
};

export default Home;
