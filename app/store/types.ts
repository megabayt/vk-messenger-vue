import { Store } from 'vuex';

export interface IUserState {
  token: string;
}

export interface IState {
  user: IUserState;
}

export type IStore = Store<IState>;
