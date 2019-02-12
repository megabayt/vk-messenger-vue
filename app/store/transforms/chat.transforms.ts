import { chain, find, get } from 'lodash';
import moment from 'moment';
import { IChatsOrigResponse, IGroup, IMessages, IProfile } from '@/utils/types';

export const chatsTransform = (response: IChatsOrigResponse): any => {
  const conversationIds = chain(response)
    .get('items')
    .reduce((result: any, item: IMessages) => {
      const peerId: number = get(item, 'conversation.peer.id') || 0;
      const profile: IProfile | IGroup | undefined = find(get(response, 'profiles'), { id: peerId })
        || find(get(response, 'groups'), { id: peerId });
      if (!profile || !profile.id) {
        return result;
      }
      return [...result, profile.id];
    }, [])
    .value() || [];
  const conversations = chain(response)
    .get('items')
    .reduce((result: any, item: IMessages) => {
      const peerId: number = get(item, 'conversation.peer.id') || 0;
      const profile: IProfile | IGroup | undefined = find(get(response, 'profiles'), { id: peerId })
        || find(get(response, 'groups'), { id: peerId });
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
      return {
        ...result,
        [profile.id]: {
          id: profile.id,
          previewAvatar: profile.photo_50,
          fullName,
          lastMessage: {
            text: item.last_message.text,
            date: moment().diff(moment.unix(item.last_message.date), 'days') > 0
              ? moment.unix(item.last_message.date).format('DD.MM.YYYY')
              : moment.unix(item.last_message.date).format('HH:mm'),
          },
        },
      };
    }, {})
    .value() || {};
  return {
    conversations,
    conversationIds,
  };
};

export interface IConversation {
  id: number;
  previewAvatar: string;
  fullName: string;
  lastMessage: {
    text: string;
    date: string;
  };
}

export interface IConversations {
  conversations: { [key: number]: IConversation; };
  conversationIds: ReadonlyArray<number>;
}
