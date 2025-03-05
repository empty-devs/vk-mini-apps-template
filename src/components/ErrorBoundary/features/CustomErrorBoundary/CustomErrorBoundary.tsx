import { ErrorInfo, ReactElement, ReactNode, useState } from 'react';
import { Button, ButtonGroup, Div, PanelHeader, Placeholder, Platform } from '@vkontakte/vkui';
import { usePlatformStore, useSnackbarStore } from '@/state';
import { Icon28BugOutline, Icon28CopyOutline, Icon28RefreshOutline } from '@vkontakte/icons';
import { ErrorSnackbar, MiniSplitLayout, SuccessSnackbar } from '@/components';
import bridge from '@vkontakte/vk-bridge';
import { config_vk_group_id } from '@/configs';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface CustomErrorBoundaryProps {
    readonly children: ReactNode;
}

interface ErrorState {
    error: Error | null;
    info: ErrorInfo | null;
}

const ERROR_MESSAGE = 'Пожалуйста, сообщите об ошибке, а потом';
const ERROR_MESSAGE_DESKTOP = 'обновите страницу';
const ERROR_MESSAGE_MOBILE = 'очистите кеш мини-приложения';

export const CustomErrorBoundary = ({ children }: CustomErrorBoundaryProps): ReactElement => {
    const platformState = usePlatformStore(state => state.platformState);
    const isDesktop = platformState === Platform.VKCOM;

    const setSnackbarState = useSnackbarStore(state => state.setSnackbarState);

    const [errorState, setErrorState] = useState<ErrorState>({ error: null, info: null });

    const fallbackRender = ({ resetErrorBoundary }: FallbackProps) => {
        return (
            <MiniSplitLayout isDesktop={isDesktop}>
                <PanelHeader>Ошибка</PanelHeader>
                <Placeholder
                    title="Всё! Сломалось..."
                    action={isDesktop ? buttonsAction(resetErrorBoundary) : undefined}
                    stretched={true}
                >
                    {ERROR_MESSAGE} {isDesktop ? ERROR_MESSAGE_DESKTOP : ERROR_MESSAGE_MOBILE}!
                </Placeholder>
                {!isDesktop && <Div>{buttonsAction(resetErrorBoundary)}</Div>}
            </MiniSplitLayout>
        );
    };

    const logError = (error: Error, info: ErrorInfo) => {
        setErrorState({ error, info });
    };

    const buttonsAction = (resetErrorBoundary: () => void) => {
        return (
            <ButtonGroup mode="vertical" align="center" stretched={true}>
                <Button
                    before={<Icon28RefreshOutline />}
                    size="m"
                    mode="tertiary"
                    appearance="positive"
                    onClick={() => resetErrorBoundary()}
                >
                    Попробовать снова
                </Button>
                <Button before={<Icon28CopyOutline />} size="m" mode="tertiary" onClick={() => copyTextError()}>
                    Скопировать в буфер обмена
                </Button>
                <Button
                    before={<Icon28BugOutline />}
                    size="m"
                    mode="tertiary"
                    href={`https://vk.me/club${config_vk_group_id}`}
                    target="_blank"
                >
                    Сообщить об ошибке
                </Button>
            </ButtonGroup>
        );
    };

    const copyTextError = () => {
        bridge
            .send('VKWebAppCopyText', { text: JSON.stringify(errorState) })
            .then(data => {
                if (data['result']) {
                    setSnackbarState(<SuccessSnackbar>Текст ошибки успешно скопирован</SuccessSnackbar>);
                } else {
                    setSnackbarState(<ErrorSnackbar>Не удалось скопировать текст ошибки</ErrorSnackbar>);
                }
            })
            .catch(() => {
                setSnackbarState(<ErrorSnackbar>Ошибка. Повторите попытку позже</ErrorSnackbar>);
            });
    };

    return (
        <ErrorBoundary fallbackRender={fallbackRender} onError={(error, info) => logError(error, info)}>
            {children}
        </ErrorBoundary>
    );
};
