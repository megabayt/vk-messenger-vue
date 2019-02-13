import { chain, find, get } from 'lodash';
import moment from 'moment';
import { IChat, IChatsResponse, IChatsTransformedResponse } from '@/types';

export const chatsTransform = (response: IChatsResponse): IChatsTransformedResponse => {
  const conversationIds = chain(response)
    .get('items')
    .reduce((result: ReadonlyArray<number>, item) => {
      const peerId: number = get(item, 'conversation.peer.id') || 0;
      const profile = find(get(response, 'profiles'), { id: peerId })
        || find(get(response, 'groups'), { id: peerId });
      if (!profile || !profile.id) {
        return result;
      }
      return [...result, profile.id];
    }, [])
    .value() || [];
  const conversations = chain(response)
    .get('items')
    .reduce((result: { [key:string]: IChat}, item) => {
      const peerId: number = get(item, 'conversation.peer.id') || 0;
      const profile = find(get(response, 'profiles'), { id: peerId })
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
              ? moment().diff(moment.unix(item.last_message.date), 'year') > 0
                ? moment.unix(item.last_message.date).format('DD MMM YYYY')
                  : moment.unix(item.last_message.date).format('DD MMM')
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
