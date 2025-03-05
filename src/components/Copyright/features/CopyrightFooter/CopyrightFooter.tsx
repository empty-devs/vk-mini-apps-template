import { ReactElement } from 'react';
import { Footer } from '@vkontakte/vkui';
import { CopyrightText, CopyrightVersion } from '@/components';

export const CopyrightFooter = (): ReactElement => (
    <Footer>
        <CopyrightText />
        <CopyrightVersion />
    </Footer>
);
