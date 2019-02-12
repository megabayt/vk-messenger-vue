import { remove } from 'lodash';
import { api } from '@/utils/helpers';
import { Action } from 'vuex';
import { IState } from '@/store/types';

export const USER_TOKEN_SET: Action<IState, IState> = (store, token) => {
  remove(api.requestTransforms, item => item.name === 'appendToken');
  const appendToken = (request) => {
    request.url += `&access_token=${token}`;
  };
  api.addRequestTransform(appendToken);
  store.commit('USER_TOKEN_SET', token);
};
