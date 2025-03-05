import { ReactElement } from 'react';
import { Group, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon36GhostSimpleOutline } from '@vkontakte/icons';

export const LazyPanelError = (): ReactElement => {
    const routeNavigator = useRouteNavigator();

    return (
        <Panel id="lazy_error" nav="panel_lazy_error">
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>Ошибка</PanelHeader>
            <Group>
                <Placeholder icon={<Icon36GhostSimpleOutline width={56} height={56} />} title="Хм, пусто">
                    Не удалось загрузить страницу.
                    <br />
                    Повторите попытку позже.
                </Placeholder>
            </Group>
        </Panel>
    );
};
