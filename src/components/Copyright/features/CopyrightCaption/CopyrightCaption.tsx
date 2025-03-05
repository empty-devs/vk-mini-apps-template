import { ReactElement } from 'react';
import { Caption } from '@vkontakte/vkui';
import { CopyrightText, CopyrightVersion } from '@/components';

export const CopyrightCaption = (): ReactElement => (
    <>
        <Caption weight="3" level="1" style={{ textAlign: 'center', color: 'var(--vkui--color_text_secondary)' }}>
            <CopyrightText />
        </Caption>
        <CopyrightVersion />
    </>
);
