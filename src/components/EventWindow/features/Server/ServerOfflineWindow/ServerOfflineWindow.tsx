import { Placeholder } from '@vkontakte/vkui';
import { Icon56WrenchOutline } from '@vkontakte/icons';
import { ReactElement } from 'react';

export const ServerOfflineWindow = (): ReactElement => (
    <Placeholder
        key="server_offline"
        icon={<Icon56WrenchOutline />}
        title={
            <>
                В данный момент
                <br />
                сервис работает нестабильно
            </>
        }
        stretched={true}
    >
        Скорее всего, мы уже работаем
        <br />
        над исправлением ошибки.
    </Placeholder>
);
