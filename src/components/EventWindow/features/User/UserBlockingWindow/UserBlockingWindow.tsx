import { Button, Placeholder } from '@vkontakte/vkui';
import { Icon56ReportOutline } from '@vkontakte/icons';
import { config_vk_group_id } from '@/configs';
import { ReactElement } from 'react';

export const UserBlockingWindow = (): ReactElement => (
    <Placeholder
        key="user_blocking"
        icon={<Icon56ReportOutline />}
        title={
            <>
                Вы <span style={{ color: '#e64646' }}>заблокированы</span>!
            </>
        }
        action={
            <Button
                size="m"
                mode="tertiary"
                appearance="accent"
                href={'https://vk.me/club' + config_vk_group_id}
                target="_blank"
                stretched={true}
            >
                Подать апелляцию
            </Button>
        }
        stretched={true}
    >
        Увы, но нам пришлось попрощаться.
    </Placeholder>
);
