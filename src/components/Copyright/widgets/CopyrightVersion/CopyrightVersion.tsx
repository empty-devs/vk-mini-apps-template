import { ReactElement } from 'react';
import { Caption } from '@vkontakte/vkui';
import { config_app_version } from '@/configs';

export const CopyrightVersion = (): ReactElement => (
    <Caption weight="1" level="1" style={{ textAlign: 'center', color: 'var(--vkui--color_text_secondary)' }}>
        v{config_app_version}
    </Caption>
);
