import { FunctionComponent } from 'react';
import { PanelProps } from '@vkontakte/vkui';

export const cacheComponents = new Map<string, FunctionComponent<Record<string, unknown>>>();

export const cachePanelComponents = new Map<string, FunctionComponent<PanelProps>>();
