import { GetDataProps, GetMethodDataProp, GetMethodNameProp, GetMethodResponse, ValidRequestData } from '@/types';
import { api_req_url, eventOffline, responseHandler } from '@/services';

export const getData: GetDataProps = async <N extends GetMethodNameProp>(
    method: N,
    uid?: GetMethodDataProp<N>
): Promise<ValidRequestData<GetMethodResponse<N>>> => {
    let response;

    try {
        response = await fetch(api_req_url + method + (uid ? '/' + uid : ''), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'VK ' + window.location.search
            }
        });
    } catch (error) {
        eventOffline(error);
    }

    return await responseHandler<ValidRequestData<GetMethodResponse<N>>>(response);
};
