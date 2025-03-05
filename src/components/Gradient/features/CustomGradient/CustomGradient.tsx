import { ReactElement, ReactNode } from 'react';
import { Gradient, useAdaptivityConditionalRender } from '@vkontakte/vkui';

interface CustomGradientProps {
    readonly children: ReactNode;
}

export const CustomGradient = ({ children }: CustomGradientProps): ReactElement => {
    const { sizeX } = useAdaptivityConditionalRender();

    return (
        <Gradient
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: sizeX.regular ? '-7px -7px 0 -7px' : 0,
                marginBottom: 8,
                padding: 32,
                textAlign: 'center'
            }}
        >
            {children}
        </Gradient>
    );
};
