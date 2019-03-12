import { ApiResponse } from 'apisauce';

export interface ICommonOkResponse<T> {
  response: T;
}
export interface ICommonErrorResponse {
  error: {
    error_code: number;
    error_msg: string;
    request_params: ReadonlyArray<any>,
  };
}
export type ICommonResponse<T> = ICommonOkResponse<T> | ICommonErrorResponse;

export const okResponse: ApiResponse<any> = {
  ok: true,
  problem: null,
  originalError: null,
  status: 200,
  headers: {},
  config: {},
  duration: 1000,
}

export interface IPhotoAttachment {
  type: string;
  photo: {
    id: number;
    album_id: number;
    owner_id: number;
    sizes: ReadonlyArray< {
      type: string;
      url: string;
      width: number;
      height: number;
    } >;
    text: string;
    date: number;
    access_key: string;
  };
}
export interface IStickerAttachment {
  type: string;
  sticker: {
    product_id: number;
    sticker_id: number;
    images: ReadonlyArray<{
      url: string;
      width: number;
      height: number;
    }>;
    images_with_background: ReadonlyArray<{
      url: string;
      width: number;
      height: number;
    }>;
    animation_url: string;
  };
}
export interface IWallPostAttachment {
  type: string;
  wall: {
    id: number;
    from_id: number;
    to_id: number;
    date: number;
    post_type: string;
    text: string;
    marked_as_ads: number;
    attachments: ReadonlyArray<{
      type: string;
      doc: {
        id: number;
        owner_id: number;
        title: string;
        size: number;
        ext: string;
        url: string;
        date: number;
        type: number;
        preview: {
          photo: {
            sizes: ReadonlyArray<{
              src: string;
              width: number;
              height: number;
              type: string;
            }>;
          };
          video: {
            src: string;
            width: number;
            height: number;
            file_size: number;
          };
        };
        access_key: string;
      };
    }>;
    post_source: {
      type: string;
    };
    comments: {
      count: number;
      can_post: number;
      groups_can_post: boolean;
    };
    likes: {
      count: number;
      user_likes: number;
      can_like: number;
      can_publish: number;
    };
    reposts: {
      count: number;
      user_reposted: number;
    };
    views: {
      count: number;
    };
    is_favorite: boolean;
    access_key: string;
  };
}
export type IAttachment = IPhotoAttachment
  | IStickerAttachment
  | IWallPostAttachment;
