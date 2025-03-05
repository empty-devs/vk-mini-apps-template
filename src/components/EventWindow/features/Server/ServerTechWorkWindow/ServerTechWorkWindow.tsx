import { Placeholder } from '@vkontakte/vkui';
import { ReactElement } from 'react';
import { Icon56SmileOutline } from '@vkontakte/icons';

export const ServerTechWorkWindow = (): ReactElement => (
    <Placeholder
        key="server_tech_work"
        icon={<Icon56SmileOutline />}
        title="Идут технические шоколадки"
        stretched={true}
    >
        У нас технические работы,
        <br />
        но уже скоро мы снова будем с вами не грустите.
    </Placeholder>
);
