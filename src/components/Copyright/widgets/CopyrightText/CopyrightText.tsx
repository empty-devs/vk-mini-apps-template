import { ReactElement } from 'react';
import { Link } from '@vkontakte/vkui';
import { config_vk_group_id, config_vk_group_name } from '@/configs';

export const CopyrightText = (): ReactElement => (
    <>
        Разработано в{' '}
        <Link href={'https://vk.com/club' + config_vk_group_id} target="_blank">
            {config_vk_group_name}
        </Link>{' '}
        с любовью
    </>
);
