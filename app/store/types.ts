import { Store } from 'vuex';

import { IConversations } from './transforms/chat.transforms';

export interface IUserState {
  token: string;
}

export interface IChatsState {
  fetching: boolean;
  error: boolean;
  data: IConversations;
}

export interface IState {
  user: IUserState;
  chats: IChatsState;
}

export const initialUserState: IUserState = {
  token: '',
};
export const initialChatsState: IChatsState = {
  fetching: false,
  error: false,
  data: {
    conversationIds: [],
    conversations: {},
  },
};
export const initialState: IState = {
  user: initialUserState,
  chats: initialChatsState,
};

export type IStore = Store< IState >;
