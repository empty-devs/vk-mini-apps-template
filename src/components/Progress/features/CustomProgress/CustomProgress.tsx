import { ReactElement } from 'react';

interface ProgressProps {
    readonly className?: string;
    readonly max: number;
    readonly value: number;
}

export const CustomProgress = ({ className, max, value }: ProgressProps): ReactElement => (
    <div
        className={'vkuiProgress ' + className}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max > 0 ? max : 1}
        aria-valuenow={value}
    >
        <div
            className="vkuiProgress__in"
            aria-hidden="true"
            style={{ width: `${Math.round((100 / (max > 0 ? max : 1)) * value)}%` }}
        />
    </div>
);
