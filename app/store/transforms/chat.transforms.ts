import { chain, find, get } from 'lodash';
import { IChatsOrigResponse, IGroup, ILastmessage, IMessages, IProfile } from '@/utils/types';

export const chatsTransform = (response: IChatsOrigResponse): any => {
  return chain(response)
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
          lastMessage: item.last_message,
        },
      };
    }, {})
    .value() || [];
};

export interface IConversation {
  id: number;
  previewAvatar: string;
  fullName: string;
  lastMessage: ILastmessage;
}
