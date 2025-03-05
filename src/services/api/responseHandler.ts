import { InvalidRequestData } from '@/types';
import { showErrorByData, showErrorByHttpStatus } from '@/services';

export const responseHandler = async <T>(response: Response | undefined): Promise<T> => {
    if (response) {
        if (response.ok) {
            return await response.json();
        }

        const data = (await response.json()) as InvalidRequestData | undefined | null;

        if (data && Object.keys(data).length !== 0) {
            showErrorByData(data);

            throw data;
        }

        showErrorByHttpStatus(response['status']);

        throw {
            error: {
                type: 'EMPTY_RESPONSE',
                description: 'Empty response.',
                details: {}
            },
            success: false,
            http_code: response['status']
        } as InvalidRequestData;
    }

    throw {
        error: {
            type: 'UNKNOWN_ERROR',
            description: 'An unknown error has occurred.',
            details: {}
        },
        success: false,
        http_code: -1
    } as InvalidRequestData;
};
