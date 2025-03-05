import { ReactElement } from 'react';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { CustomConfigProvider, CustomErrorBoundary } from '@/components';
import { useAdaptivity, useInsets } from '@vkontakte/vk-bridge-react';
import { transformVKBridgeAdaptivity } from '@/utils';
import { AppRouter } from '@/AppRouter';
import { structureRoute } from '@/routes';
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { NoMatch } from '@/panels';

const App = (): ReactElement => {
    const vkBridgeInsets = useInsets() || undefined;
    const vkBridgeAdaptivityProps = transformVKBridgeAdaptivity(useAdaptivity());

    return (
        <CustomConfigProvider>
            <AdaptivityProvider {...vkBridgeAdaptivityProps}>
                <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
                    <CustomErrorBoundary>
                        <RouterProvider router={structureRoute} notFound={<NoMatch />}>
                            <AppRouter />
                        </RouterProvider>
                    </CustomErrorBoundary>
                </AppRoot>
            </AdaptivityProvider>
        </CustomConfigProvider>
    );
};

export default App;
