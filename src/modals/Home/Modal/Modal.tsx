import { Button, ModalCard, ModalCardProps } from '@vkontakte/vkui';
import { Icon56GhostOutline } from '@vkontakte/icons';
import { ReactElement } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Modal = ({ nav }: ModalCardProps): ReactElement => {
    const routeNavigator = useRouteNavigator();

    return (
        <ModalCard
            nav={nav}
            icon={<Icon56GhostOutline />}
            title="Это модальная карточка"
            description="Это текст модальной карточки"
            actions={
                <Button mode="primary" size="l" onClick={() => routeNavigator.back()} stretched={true}>
                    Понятно
                </Button>
            }
        />
    );
};
