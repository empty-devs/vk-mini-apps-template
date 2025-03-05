interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string;
    readonly VITE_API_URL: string;
    readonly VITE_API_VERSION: string;
    readonly VITE_VK_APP_ID: string;
    readonly VITE_VK_GROUP_ID: string;
    readonly VITE_VK_GROUP_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module 'eruda' {
    export function init(config: object): void;

    export function add(module: never): void;
}

declare module 'eruda-dom';
