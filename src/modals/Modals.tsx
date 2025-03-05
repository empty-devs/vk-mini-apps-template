import { ReactElement } from 'react';
import { ModalRoot } from '@vkontakte/vkui';
import { Modal } from '@/modals/Home';
import { MODALS } from '@/routes';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Modals = (): ReactElement => {
    const routeNavigator = useRouteNavigator();
    const { modal: activeModal } = useActiveVkuiLocation();

    return (
        <ModalRoot activeModal={activeModal} onClose={() => routeNavigator.hideModal()}>
            <Modal nav={MODALS['MODAL']} />
        </ModalRoot>
    );
};
