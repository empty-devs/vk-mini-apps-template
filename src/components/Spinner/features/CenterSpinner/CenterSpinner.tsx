import { Spinner, SpinnerProps } from '@vkontakte/vkui';
import { ReactElement } from 'react';

interface CenterSpinnerProps {
    readonly size?: SpinnerProps['size'];
}

export const CenterSpinner = ({ size = 'm' }: CenterSpinnerProps): ReactElement => (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Spinner size={size} />
    </div>
);
