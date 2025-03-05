import bridge, { ReceiveData } from '@vkontakte/vk-bridge';

export const setStorage = async (key: string, value: string): Promise<ReceiveData<'VKWebAppStorageSet'>> => {
    return await bridge.send('VKWebAppStorageSet', { key, value });
};

export const getStorage = async (keys: string[]): Promise<ReceiveData<'VKWebAppStorageGet'>> => {
    return await bridge.send('VKWebAppStorageGet', { keys });
};

export const getsStorage = async (count = 1, offset = 0): Promise<ReceiveData<'VKWebAppStorageGetKeys'>> => {
    return await bridge.send('VKWebAppStorageGetKeys', { count, offset });
};
