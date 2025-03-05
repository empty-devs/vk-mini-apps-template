import { ReactElement } from 'react';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';
import { CustomSnackbar } from '@/components';

interface ErrorSnackbarProps {
    readonly children: string;
}

export const ErrorSnackbar = ({ children }: ErrorSnackbarProps): ReactElement => (
    <CustomSnackbar key="error_snackbar" before={<Icon28ErrorCircleOutline fill="#E64646" />}>
        {children}
    </CustomSnackbar>
);
