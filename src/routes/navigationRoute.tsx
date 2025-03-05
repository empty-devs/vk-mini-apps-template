import { NavigationItemInterface } from '@/interfaces';
import { PANELS, VIEWS } from '@/routes/constantRoute';
import { Icon28HomeOutline, Icon28InfoOutline } from '@vkontakte/icons';

export const navigationItemsRoute: NavigationItemInterface[] = [
    { view: VIEWS['HOME'], panel: PANELS['HOME'], to: '/', text: 'Главная', icon: <Icon28HomeOutline /> },
    {
        view: VIEWS['INFO'],
        panel: PANELS['INFO'],
        to: `/${PANELS['INFO']}`,
        text: 'Информация',
        icon: <Icon28InfoOutline />
    }
] as const;
