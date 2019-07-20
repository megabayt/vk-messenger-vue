import { ApiResponse } from 'apisauce';

import { IAttachment, ICommonResponse } from './common.types';

export interface IChatsParams {
  offset: number;
  count: number;
  filter: 'all' | 'unread' | 'important' | 'unanswered';
  extended: number;
  bool: number;
  startMessageId: number;
  fields: string;
  groupId: number;
}
export type IChatsFetch = (params: Partial<IChatsParams>) => Promise<ApiResponse<ICommonResponse<IChatsResponse>>>;
export interface IChatsResponse {
  count: number;
  items: ReadonlyArray<IChatItem>;
  profiles: ReadonlyArray<IChatProfile>;
  groups: ReadonlyArray<IChatGroup>;
}
export interface IChatMergedProfiles {
  keyNumber: IChatProfile | IChatGroup;
}
export interface IChatProfile {
  id: number;
  firstName: string;
  lastName: string;
  isClosed: boolean;
  canAccessClosed: boolean;
  sex: number;
  screenName: string;
  photo50: string;
  photo100: string;
  online: number;
  onlineApp: string;
  onlineMobile: number;

}
export interface IChatGroup {
  id: number;
  name: string;
  screenName: string;
  isClosed: number;
  type: string;
  isAdmin: number;
  isMember: number;
  isAdvertiser: number;
  photo50: string;
  photo100: string;
  photo200: string;
  adminLevel: number;
}
export interface IChatItem {
  conversation: {
    peer: {
      id: number;
      type: 'user' | 'chat' | 'group' | 'email';
      localId: number;
    };
    inRead: number;
    outRead: number;
    lastMessageId: number;
    canWrite: {
      allowed: boolean;
    };
    chatSettings: {
      title: string;
      membersCount: number;
      state: string;
      activeIds: ReadonlyArray<number>;
      acl: {
        canInvite: boolean;
        canChangeInfo: boolean;
        canChangePin: boolean;
        canPromoteUsers: boolean;
        canSeeInviteLink: boolean;
        canChangeInviteLink: boolean;
      };
      isGroupChannel: boolean;
      ownerId: number;
    };
  };
  lastMessage: {
    date: number;
    fromId: number;
    id: number;
    out: number;
    peerId: number;
    text: string;
    conversationMessageId: number;
    fwdMessages: ReadonlyArray<any>;
    important: boolean;
    randomId: number;
    attachments: ReadonlyArray<IAttachment>;
    isHidden: boolean;
  };
}
