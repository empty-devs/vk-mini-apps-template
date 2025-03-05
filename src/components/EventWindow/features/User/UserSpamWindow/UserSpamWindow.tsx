import { Button, Placeholder } from '@vkontakte/vkui';
import { Icon56GlobeCrossOutline } from '@vkontakte/icons';
import { InitAppType } from '@/types';
import { ReactElement, useState } from 'react';
import { useInterval } from '@/hooks';

interface UserSpamWindowProps {
    readonly setInitApp: (value: InitAppType) => void;
    readonly reInitApp: () => void;
}

export const UserSpamWindow = ({ setInitApp, reInitApp }: UserSpamWindowProps): ReactElement => {
    const [isLock, setIsLock] = useState(true);
    const [time, setTime] = useState(10);

    useInterval(
        () => {
            setTime(prevState => {
                if (prevState <= 1) {
                    setIsLock(false);
                }

                return prevState - 1;
            });
        },
        isLock ? 1000 : null
    );

    return (
        <Placeholder
            key="user_spam"
            icon={<Icon56GlobeCrossOutline />}
            title="Хм..."
            action={
                <Button
                    size="m"
                    mode="tertiary"
                    appearance="accent"
                    onClick={() => {
                        setInitApp([false, null]);
                        reInitApp();
                    }}
                    disabled={isLock}
                    stretched={true}
                >
                    Хорошо {isLock && '(' + time + ')'}
                </Button>
            }
            stretched={true}
        >
            Вы отправляете слишком много запросов.
            <br />
            Пожалуйста, притормозите и подождите несколько секунд.
        </Placeholder>
    );
};
