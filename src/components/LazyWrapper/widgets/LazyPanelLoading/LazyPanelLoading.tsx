import { ReactElement } from 'react';
import { Panel, PanelHeader, ScreenSpinner } from '@vkontakte/vkui';

export const LazyPanelLoading = (): ReactElement => {
    return (
        <Panel id="lazy_loading" nav="panel_lazy_loading">
            <PanelHeader>Загрузка</PanelHeader>
            <ScreenSpinner state="loading" />
        </Panel>
    );
};
