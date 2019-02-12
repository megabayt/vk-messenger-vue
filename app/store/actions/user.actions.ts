import { Action } from 'vuex';
import { IState } from '@/store/types';
import { setToken } from '@/utils/helpers';

export const USER_TOKEN_SET: Action<IState, IState> = (store, token) => {
  setToken(token);
  store.commit('USER_TOKEN_SET', token);
};
