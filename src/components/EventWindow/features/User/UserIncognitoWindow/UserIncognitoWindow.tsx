import { Placeholder } from '@vkontakte/vkui';
import { Icon36GhostSimpleOutline } from '@vkontakte/icons';
import { ReactElement } from 'react';

export const UserIncognitoWindow = (): ReactElement => (
    <Placeholder
        key="user_incognito"
        icon={<Icon36GhostSimpleOutline width={56} height={56} />}
        title="Ой, стоп!"
        stretched={true}
    >
        Скорее всего, Вы зашли с инкогнито.
        <br />В данном режиме у приложения отсутствует доступ к хранилищу данных.
    </Placeholder>
);
