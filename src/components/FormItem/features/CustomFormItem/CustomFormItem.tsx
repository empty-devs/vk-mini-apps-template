import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { FormItem, FormItemProps } from '@vkontakte/vkui';

interface CustomInputProps {
    readonly children: ReactElement;
    readonly top: string;
    readonly bottom?: string;
    readonly getValue: string;
    readonly setError: Dispatch<SetStateAction<boolean>>;
    readonly valueRegExp: string;
    readonly valueLength: ValueLength;
}

interface ValueLength {
    readonly textMin: number;
    readonly textMax: number;
}

export const CustomFormItem = ({
    children,
    top,
    bottom,
    getValue,
    setError,
    valueRegExp,
    valueLength
}: CustomInputProps): ReactElement => {
    const [textBottom, setTextBottom] = useState(bottom);
    const [status, setStatus] = useState<FormItemProps['status']>('default');

    useEffect(() => {
        if (getValue.trim() !== '') {
            const valueLen = getValue.trim().length;
            let text = bottom;

            let isCorrect = true;

            if (valueLen < valueLength.textMin) {
                text = `Пожалуйста, введите не меньше ${valueLength.textMin} символов.`;
                isCorrect = false;
            } else if (valueLen > valueLength.textMax) {
                text = `Пожалуйста, введите не больше ${valueLength.textMax} символов.`;
                isCorrect = false;
            } else if (!new RegExp(valueRegExp).test(getValue)) {
                text = 'Пожалуйста, введите данные в указанном формате.';
                isCorrect = false;
            }

            setTextBottom(text);

            if (isCorrect) {
                setStatus('valid');
                setError(false);
            } else {
                setStatus('error');
                setError(true);
            }
        } else {
            setTextBottom(bottom);
            setStatus('default');
            setError(true);
        }
    }, [getValue]);

    return (
        <FormItem top={top} bottom={textBottom} status={status}>
            {children}
        </FormItem>
    );
};
