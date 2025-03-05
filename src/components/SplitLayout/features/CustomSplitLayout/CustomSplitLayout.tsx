import { ReactElement, ReactNode } from 'react';
import { PanelHeader, SplitLayout } from '@vkontakte/vkui';
import { usePopout } from '@vkontakte/vk-mini-apps-router';
import { Modals } from '@/modals';

interface CustomSplitLayoutProps {
    readonly children: ReactNode;
    readonly isDesktop: boolean;
}

export const CustomSplitLayout = ({ children, isDesktop }: CustomSplitLayoutProps): ReactElement => {
    const routerPopout = usePopout();

    return (
        <SplitLayout header={!isDesktop && <PanelHeader delimiter="none" />} style={{ justifyContent: 'center' }}>
            {children}
            {routerPopout}
            <Modals />
        </SplitLayout>
    );
};
