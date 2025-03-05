import { InitAppType } from '@/types';
import {
    ErrorSnackbar,
    ServerOfflineWindow,
    ServerTechWorkWindow,
    SuccessSnackbar,
    UserBlockingWindow,
    UserIncognitoWindow,
    UserSpamWindow
} from '@/components';
import { ReactElement } from 'react';

export const appInit = (
    setInitApp: (value: InitAppType) => void,
    reInitApp: () => void,
    setSnackbarState: (value: ReactElement | null) => void
): boolean => {
    initEvents(setInitApp, reInitApp, setSnackbarState);

    return isLocalstorage(setInitApp);
};

const initEvents = (
    setInitApp: (value: InitAppType) => void,
    reInitApp: () => void,
    setSnackbarState: (value: ReactElement | null) => void
): void => {
    window.addEventListener(
        'online',
        () => {
            setSnackbarState(<SuccessSnackbar>Подключение к интернету восстановлено</SuccessSnackbar>);
        },
        false
    );

    window.addEventListener(
        'offline',
        () => {
            setSnackbarState(<ErrorSnackbar>Отсутствует подключение к интернету</ErrorSnackbar>);
        },
        false
    );

    window.addEventListener(
        'server_unknown',
        () => {
            setSnackbarState(<ErrorSnackbar>Получили неизвестные данные с сервера</ErrorSnackbar>);
        },
        false
    );

    window.addEventListener(
        'server_offline',
        () => {
            setInitApp([false, <ServerOfflineWindow />]);
        },
        false
    );

    window.addEventListener(
        'server_tech_work',
        () => {
            setInitApp([false, <ServerTechWorkWindow />]);
        },
        false
    );

    window.addEventListener(
        'user_incorrect_data',
        () => {
            setSnackbarState(<ErrorSnackbar>Отправлены неверные данные</ErrorSnackbar>);
        },
        false
    );

    window.addEventListener(
        'user_spam',
        () => {
            setInitApp([false, <UserSpamWindow setInitApp={setInitApp} reInitApp={reInitApp} />]);
        },
        false
    );

    window.addEventListener(
        'user_blocking',
        () => {
            setInitApp([false, <UserBlockingWindow />]);
        },
        false
    );
};

const isLocalstorage = (setInitApp: (value: InitAppType) => void): boolean => {
    try {
        window.localStorage.setItem('__test', 'pass');

        if (window.localStorage.getItem('__test') === 'pass') {
            window.localStorage.removeItem('__test');

            return true;
        }
    } catch (error) {
        // eslint-disable-next-line
        console.error('[localStorage] in incognito', error);
    }

    setInitApp([false, <UserIncognitoWindow />]);

    return false;
};
