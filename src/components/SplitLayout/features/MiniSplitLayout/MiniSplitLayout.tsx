import { ReactElement, ReactNode } from 'react';
import { Panel, PanelHeader, Root, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { useSnackbarStore } from '@/state';

interface MiniSplitLayoutProps {
    readonly children: ReactNode;
    readonly isDesktop: boolean;
}

export const MiniSplitLayout = ({ children, isDesktop }: MiniSplitLayoutProps): ReactElement => {
    const snackbarState = useSnackbarStore(state => state.snackbarState);

    return (
        <SplitLayout header={!isDesktop && <PanelHeader delimiter="none" />} style={{ justifyContent: 'center' }}>
            <SplitCol>
                <Root nav="root" activeView="view">
                    <View nav="view" activePanel="panel">
                        <Panel nav="panel">{children}</Panel>
                    </View>
                </Root>
                {snackbarState}
            </SplitCol>
        </SplitLayout>
    );
};
