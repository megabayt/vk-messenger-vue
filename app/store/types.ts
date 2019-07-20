import { Store } from 'vuex';
import { IChatsResponse } from '@/types';

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
  error: false,
  fetching: false,
};
export const initialState: IState = {
  chats: initialChatsState,
  user: initialUserState,
};

export type IStore = Store<IState>;
