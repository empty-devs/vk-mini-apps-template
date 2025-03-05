import { GetMethodRequestPropsMap, GetMethodResponsePropsMap, PostMethodPropsMap, PostResponsePropsMap } from '@/types';

export type ValidRequestData<T> = {
    readonly success: boolean;
    readonly data: T;
    readonly version: number;
    readonly deprecated: boolean;
    readonly http_code: number;
};

export type InvalidRequestData = {
    readonly error: {
        readonly type: string;
        readonly description: string;
        readonly details: object;
    };
    readonly success: boolean;
    readonly http_code: number;
};

export type GetMethodNameProp = keyof GetMethodRequestPropsMap;
export type GetMethodDataProp<M extends GetMethodNameProp = GetMethodNameProp> = GetMethodRequestPropsMap[M];
export type GetMethodResponse<M extends GetMethodNameProp = GetMethodNameProp> = GetMethodResponsePropsMap[M];
export type GetDataProps = <N extends GetMethodNameProp>(
    method: N,
    uid?: GetMethodDataProp<N>
) => Promise<ValidRequestData<GetMethodResponse<N>>>;

export type PostMethodNameProp = keyof PostMethodPropsMap;
export type PostMethodDataProp<M extends PostMethodNameProp = PostMethodNameProp> = PostMethodPropsMap[M];
export type PostMethodResponse<M extends PostMethodNameProp = PostMethodNameProp> = PostResponsePropsMap[M];
export type PostDataProps = <N extends PostMethodNameProp>(
    method: N,
    body: PostMethodDataProp<N>
) => Promise<ValidRequestData<PostMethodResponse<N>>>;
