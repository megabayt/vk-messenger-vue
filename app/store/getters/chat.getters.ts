import { chain, get } from 'lodash';
import { IState } from '@/store/types';
import { IChatGroup, IChatMergedProfiles, IChatProfile } from '@/types';

export const getChatProfiles = (state: IState): IChatMergedProfiles => {
  const { data } = state.chats;
  return chain(data)
    .get('profiles')
    .concat((get(data, 'groups') as ReadonlyArray<IChatProfile | IChatGroup>))
    .reduce((result: IChatMergedProfiles, item: IChatProfile | IChatGroup) => {
      if ((item as IChatGroup).type) {
        result[-item.id] = item;
      } else {
        result[item.id] = item;
      }
      return result;
    }, {})
    .value() || {};
};

export const getConversation = (state: IState) => {
  const { data } = state.chats;
  return get(data, 'items') || [];
};
