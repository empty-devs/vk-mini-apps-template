import { ReactElement } from 'react';
import { Icon28CheckCircleOutline } from '@vkontakte/icons';
import { CustomSnackbar } from '@/components';

interface SuccessSnackbarProps {
    readonly children: string;
}

export const SuccessSnackbar = ({ children }: SuccessSnackbarProps): ReactElement => (
    <CustomSnackbar key="success_snackbar" before={<Icon28CheckCircleOutline fill="#4BB34B" />}>
        {children}
    </CustomSnackbar>
);
