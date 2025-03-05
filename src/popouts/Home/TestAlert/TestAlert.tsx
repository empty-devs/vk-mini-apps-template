import { Alert } from '@vkontakte/vkui';
import { ReactElement } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const TestAlert = (): ReactElement => {
    const routeNavigator = useRouteNavigator();

    return (
        <Alert
            title="Подтвердите действие"
            description="Вы уверены, что вам стоило открывать это предупреждение?"
            actionsLayout="horizontal"
            actions={[
                {
                    title: 'Отмена',
                    mode: 'cancel',
                    autoCloseDisabled: false
                },
                {
                    title: 'Да',
                    mode: 'destructive',
                    autoCloseDisabled: false
                }
            ]}
            onClose={() => routeNavigator.hidePopout()}
        />
    );
};
