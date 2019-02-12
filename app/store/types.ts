import { Store } from 'vuex';

export interface IUserState {
  readonly token: string;
}

export interface IState {
  readonly user: IUserState;
}

export type IStore = Store<IState>;
