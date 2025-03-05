import { ReactElement } from 'react';

export interface NavigationItemInterface {
    readonly view: string;
    readonly panel: string;
    readonly to: string;
    readonly text: string;
    readonly icon: ReactElement;
}
