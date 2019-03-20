import { get } from 'lodash';
import { Action } from 'vuex';
import { chatsFetch } from '@/utils/helpers';

import { IState } from '../types';

export const CHATS_FETCH: Action< IState, IState > = async ({ commit }) => {
  commit('CHATS_FETCH');
  try {
    const result = await chatsFetch();
    const response = get(result, 'data.response');
    const error = get(result, 'data.error');
    if (response) {
      commit('CHATS_SET', { data: response, error: false });
    } else if (error) {
      commit('CHATS_SET', { data: error, error: true });
    }
  } catch (err) {
    commit('CHATS_SET', { data: { error_msg: 'Неизвестная ошибка' }, error: true });
  }
};
export const CHATS_APPEND_FETCH: Action< IState, IState > = async ({ commit }, params) => {
  commit('CHATS_APPEND_FETCH');
  try {
    const result = await chatsFetch(params);
    const response = get(result, 'data.response');
    const error = get(result, 'data.error');
    if (response) {
      commit('CHATS_SET', { data: response, error: false });
    } else if (error) {
      commit('CHATS_SET', { data: error, error: true });
    }
  } catch (err) {
    commit('CHATS_SET', { data: { error_msg: 'Неизвестная ошибка' }, error: true });
  }
};
