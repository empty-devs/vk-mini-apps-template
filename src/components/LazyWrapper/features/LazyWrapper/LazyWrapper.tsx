import { FunctionComponent, ReactElement, ReactNode, useEffect, useState } from 'react';
import { BlockerFunction, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { cacheComponents } from '@/utils';

interface LazyWrapperProps extends Record<string, unknown> {
    readonly id: string;
    readonly loader: () => Promise<{ default: FunctionComponent<Record<string, unknown>> }>;
    readonly LoadingComponent: ReactNode;
    readonly ErrorComponent: ReactNode;
}

enum LazyWrapperState {
    LOADING,
    ERROR
}

export const LazyWrapper = ({
    id,
    loader,
    LoadingComponent,
    ErrorComponent,
    ...restProps
}: LazyWrapperProps): ReactElement => {
    const routeNavigator = useRouteNavigator();

    const [LazyComponent, setLazyComponent] = useState<FunctionComponent<Record<string, unknown>> | LazyWrapperState>(
        () => cacheComponents.get(id) || LazyWrapperState['LOADING']
    );

    useEffect(() => {
        const cachedComponent = cacheComponents.get(id);

        if (!cachedComponent) {
            const blockerFunction: BlockerFunction = () => true;
            const unblock = routeNavigator.block(blockerFunction);

            loader()
                .then(module => {
                    cacheComponents.set(id, module.default);
                    setLazyComponent(() => module.default);
                    unblock();
                })
                .catch(() => {
                    setLazyComponent(() => LazyWrapperState['ERROR']);
                    unblock();
                });
        }
    }, []);

    if (LazyComponent === LazyWrapperState['LOADING']) {
        return <>{LoadingComponent}</>;
    }

    if (LazyComponent === LazyWrapperState['ERROR']) {
        return <>{ErrorComponent}</>;
    }

    return <LazyComponent {...restProps} />;
};
