import { ApiResponse } from 'apisauce';

import { IAttachment, ICommonResponse } from './common.types';

export type IChatsFetch = () => Promise<ApiResponse<ICommonResponse<IChatsResponse>>>;
export interface IChatsResponse {
  count: number;
  items: ReadonlyArray<IChatItem>;
  profiles: ReadonlyArray<IChatProfile>;
  groups: ReadonlyArray<IChatGroup>;
}
export interface IChatProfile {
  id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
  sex: number;
  screen_name: string;
  photo_50: string;
  photo_100: string;
  online: number;
  online_app?: string;
  online_mobile?: number;

}
export interface IChatGroup {
  id: number;
  name: string;
  screen_name: string;
  is_closed: number;
  type: string;
  is_admin: number;
  is_member: number;
  is_advertiser: number;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  admin_level?: number;
}
export interface IChatItem {
  conversation: {
    peer: {
      id: number;
      type: string;
      local_id: number;
    };
    in_read: number;
    out_read: number;
    last_message_id: number;
    can_write: {
      allowed: boolean;
    };
    chat_settings?: {
      title: string;
      members_count: number;
      state: string;
      active_ids: ReadonlyArray<number>;
      acl: {
        can_invite: boolean;
        can_change_info: boolean;
        can_change_pin: boolean;
        can_promote_users: boolean;
        can_see_invite_link: boolean;
        can_change_invite_link: boolean;
      };
      is_group_channel: boolean;
      owner_id: number;
    };
  };
  last_message: {
    date: number;
    from_id: number;
    id: number;
    out: number;
    peer_id: number;
    text: string;
    conversation_message_id: number;
    fwd_messages: ReadonlyArray<any>;
    important: boolean;
    random_id: number;
    attachments: ReadonlyArray<IAttachment>;
    is_hidden: boolean;
  };
}
export interface IChatsTransformedResponse {
  conversationIds: ReadonlyArray<number>;
  conversations: { [key: string]: IChat };
}
export interface IChat {
  id: number;
  previewAvatar: string;
  fullName: string;
  unreadCount: number;
  lastMessage: {
    text: string;
    date: string;
  };
}
