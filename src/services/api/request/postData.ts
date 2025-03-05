import { PostDataProps, PostMethodDataProp, PostMethodNameProp, PostMethodResponse, ValidRequestData } from '@/types';
import { api_req_url, eventOffline, responseHandler } from '@/services';

export const postData: PostDataProps = async <N extends PostMethodNameProp>(
    method: N,
    body?: PostMethodDataProp<N>
): Promise<ValidRequestData<PostMethodResponse<N>>> => {
    let post_body = null;

    if (body && Object.keys(body).length !== 0) {
        post_body = JSON.stringify(body);
    }

    let response;

    try {
        response = await fetch(api_req_url + method, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'VK ' + window.location.search
            },
            body: post_body
        });
    } catch (error) {
        eventOffline(error);
    }

    return await responseHandler<ValidRequestData<PostMethodResponse<N>>>(response);
};
