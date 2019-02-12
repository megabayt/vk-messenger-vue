import { Store } from 'vuex';
import { IChatsResponse } from '@/utils/types';

export interface IUserState {
  token: string;
}

export interface IChatsState {
  fetching: boolean;
  error: boolean;
  data?: IChatsResponse;
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
};
export const initialState: IState = {
  user: initialUserState,
  chats: initialChatsState,
};

export type IStore = Store< IState >;
