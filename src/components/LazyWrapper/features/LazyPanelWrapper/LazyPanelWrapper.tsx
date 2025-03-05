import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { LazyPanelError, LazyPanelLoading } from '@/components';
import { BlockerFunction, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { cachePanelComponents } from '@/utils';
import { PanelProps } from '@vkontakte/vkui';

interface LazyPanelWrapperProps {
    readonly nav: string;
    readonly loader: () => Promise<{ default: FunctionComponent<PanelProps> }>;
}

enum LazyPanelWrapperState {
    LOADING,
    ERROR
}

export const LazyPanelWrapper = ({ nav, loader }: LazyPanelWrapperProps): ReactElement => {
    const routeNavigator = useRouteNavigator();

    const [LazyComponent, setLazyComponent] = useState<FunctionComponent<PanelProps> | LazyPanelWrapperState>(
        () => cachePanelComponents.get(nav) || LazyPanelWrapperState['LOADING']
    );

    useEffect(() => {
        const cachedPanelComponent = cachePanelComponents.get(nav);

        if (!cachedPanelComponent) {
            const blockerFunction: BlockerFunction = () => true;
            const unblock = routeNavigator.block(blockerFunction);

            loader()
                .then(module => {
                    cachePanelComponents.set(nav, module.default);
                    setLazyComponent(() => module.default);
                    unblock();
                })
                .catch(() => {
                    setLazyComponent(() => LazyPanelWrapperState['ERROR']);
                    unblock();
                });
        }
    }, []);

    if (LazyComponent === LazyPanelWrapperState['LOADING']) {
        return <LazyPanelLoading />;
    }

    if (LazyComponent === LazyPanelWrapperState['ERROR']) {
        return <LazyPanelError />;
    }

    return <LazyComponent nav={nav} />;
};
