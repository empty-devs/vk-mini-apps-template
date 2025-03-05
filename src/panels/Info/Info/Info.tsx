import { Group, Panel, PanelHeader, PanelProps, Placeholder } from '@vkontakte/vkui';
import { Icon56GhostOutline } from '@vkontakte/icons';
import { ReactElement } from 'react';
import { PANELS } from '@/routes';

const Info = ({ nav }: PanelProps): ReactElement => {
    return (
        <Panel id={PANELS['INFO']} nav={nav}>
            <PanelHeader>Информация</PanelHeader>
            <Group>
                <Placeholder icon={<Icon56GhostOutline />}>Здесь ничего нет!</Placeholder>
            </Group>
        </Panel>
    );
};

export default Info;
