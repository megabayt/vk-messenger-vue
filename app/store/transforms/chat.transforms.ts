import { chain, find, get } from 'lodash';
import {
  IChat,
  IChatsResponse,
  IChatsTransformedResponse,
  IChatGroup,
  IChatItem,
  IChatProfile,
} from '@/types';
import { dateFormatter, getAttachmentReplacer } from '@/utils/helpers';

const getProfileId = (
  peerId: number = 0,
  profiles: ReadonlyArray<IChatProfile>,
  groups: ReadonlyArray<IChatGroup>,
): IChatProfile | IChatGroup => {
  const profile = find(profiles, { id: peerId })
    || find(groups, { id: peerId });
  if (profile && profile.id) {
    return profile;
  }
};

export const chatsTransform = (response: IChatsResponse): IChatsTransformedResponse => {
  const conversationIdsReducer = (result: ReadonlyArray<number>, item: IChatItem) => {
    const profile = getProfileId(
      get(item, 'conversation.peer.id'),
      get(response, 'profiles'),
      get(response, 'groups'),
    );
    if (!profile || !profile.id) {
      return result;
    }
    return [...result, profile.id];
  };

  const conversationsReducer = (result: { [key: string]: IChat }, item: IChatItem) => {
    const profile = getProfileId(
      get(item, 'conversation.peer.id'),
      get(response, 'profiles'),
      get(response, 'groups'),
    );
    if (!profile || !profile.id) {
      return result;
    }
    const name = get(profile, 'name');
    const firstName = get(profile, 'first_name');
    const lastName = get(profile, 'last_name');
    const fullName = name
      ? name
      : firstName && lastName
        ? `${firstName} ${lastName}`
        : 'Неизвестно';
    const text = item.last_message.text || getAttachmentReplacer(item);
    const date = dateFormatter(item.last_message.date);
    return {
      ...result,
      [profile.id]: {
        id: profile.id,
        previewAvatar: profile.photo_50,
        fullName,
        unreadCount: get(item, 'conversation.unread_count') || 0,
        lastMessage: {
          text,
          date,
        },
      },
    };
  };
  return {
    conversationIds: chain(response)
      .get('items')
      .reduce(conversationIdsReducer, [])
      .value() || [],
    conversations: chain(response)
      .get('items')
      .reduce(conversationsReducer, {})
      .value() || {},
  };
};
