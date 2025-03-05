import { Button, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { ReactElement } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon56ErrorOutline } from '@vkontakte/icons';

export const NoMatch = (): ReactElement => {
    const routeNavigator = useRouteNavigator();

    return (
        <Panel id="panel_no_match">
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.replace('/')} />}>404</PanelHeader>
            <Placeholder
                icon={<Icon56ErrorOutline />}
                title="Не найдено"
                action={
                    <Button size="m" mode="tertiary" onClick={() => routeNavigator.replace('/')}>
                        На главную
                    </Button>
                }
                stretched={true}
            >
                Страница, которую вы ищете, похоже, не существует.
            </Placeholder>
        </Panel>
    );
};
