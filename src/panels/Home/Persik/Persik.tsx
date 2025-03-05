import { Group, Panel, PanelHeader, PanelHeaderBack, PanelProps, Placeholder } from '@vkontakte/vkui';
import { Icon56CompassOutline } from '@vkontakte/icons';
import { ReactElement } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PANELS } from '@/routes';

const Persik = ({ nav }: PanelProps): ReactElement => {
    const routeNavigator = useRouteNavigator();

    return (
        <Panel id={PANELS['PERSIK']} nav={nav}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>Персик</PanelHeader>
            <Group>
                <Placeholder icon={<Icon56CompassOutline />}>Ой, персик убежал...</Placeholder>
            </Group>
        </Panel>
    );
};

export default Persik;
