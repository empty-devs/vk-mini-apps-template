import { createHashRouter, RouteWithRoot } from '@vkontakte/vk-mini-apps-router';
import { MODALS, PANELS, ROOTS, VIEWS } from './constantRoute';

const routes: RouteWithRoot[] = [
    {
        path: '/',
        root: ROOTS['MAIN'],
        view: VIEWS['HOME'],
        panel: PANELS['HOME']
    },
    {
        path: `/${MODALS['MODAL']}`,
        root: ROOTS['MAIN'],
        view: VIEWS['HOME'],
        panel: PANELS['HOME'],
        modal: MODALS['MODAL']
    },
    {
        path: `/${PANELS['PERSIK']}`,
        root: ROOTS['MAIN'],
        view: VIEWS['HOME'],
        panel: PANELS['PERSIK']
    },
    {
        path: `/${PANELS['INFO']}`,
        root: ROOTS['MAIN'],
        view: VIEWS['INFO'],
        panel: PANELS['INFO']
    }
] as const;

export const structureRoute = createHashRouter(routes);
