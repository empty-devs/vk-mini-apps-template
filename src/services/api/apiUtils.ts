import { InvalidRequestData } from '@/types';
import { config_api_url, config_api_version } from '@/configs';

export const api_req_url = `${config_api_url}/v${config_api_version}/`;

export const showErrorByData = (data: InvalidRequestData): void => {
    switch (data['error']['type']) {
        case 'MAINTENANCE':
            window.dispatchEvent(new CustomEvent('server_tech_work'));
            break;
        case 'USER_BLOCKING':
            window.localStorage.clear();
            window.dispatchEvent(new CustomEvent('user_blocking'));
            break;
        case 'BAD_REQUEST_DATA':
            window.dispatchEvent(new CustomEvent('user_incorrect_data'));
            break;
        default:
            eventUnknown(data['error']);
            break;
    }
};

export const showErrorByHttpStatus = (http_status: number): void => {
    switch (http_status) {
        case 429:
            window.dispatchEvent(new CustomEvent('user_spam'));
            break;
        default:
            eventOffline('error code: ' + http_status);
            break;
    }
};

const eventUnknown = (error_data: string | never | unknown = ''): void => {
    // eslint-disable-next-line
    console.error(error_data);

    window.dispatchEvent(new CustomEvent('server_unknown'));
};

export const eventOffline = (error_data: string | never | unknown = ''): void => {
    // eslint-disable-next-line
    console.error(error_data);

    window.dispatchEvent(new CustomEvent('server_offline'));
};
