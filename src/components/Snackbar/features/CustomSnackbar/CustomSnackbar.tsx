import { Platform, Snackbar, SnackbarProps } from '@vkontakte/vkui';
import { usePlatformStore, useSnackbarStore } from '@/state';
import { ReactElement } from 'react';

interface ParentSnackbarProps extends Omit<SnackbarProps, 'onClose'> {
    readonly children: string;
}

const snackbarMarginBottom = 'calc(var(--vkui_internal--tabbar_height) + var(--vkui_internal--safe_area_inset_bottom))';

export const CustomSnackbar = ({ children, ...restProps }: ParentSnackbarProps): ReactElement => {
    const platformState = usePlatformStore(state => state.platformState);
    const isIndent: boolean = platformState !== Platform.VKCOM;

    const setSnackbarState = useSnackbarStore(state => state.setSnackbarState);

    return (
        <Snackbar
            {...restProps}
            onClose={() => setSnackbarState(null)}
            style={isIndent ? { marginBottom: snackbarMarginBottom } : undefined}
        >
            {children}
        </Snackbar>
    );
};
