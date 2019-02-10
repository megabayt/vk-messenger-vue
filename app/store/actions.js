import _ from 'lodash';
import { api, serialize } from '../utils/helpers';
import { chatsTransform, chatTransform } from '../utils/transforms';

export function USER_TOKEN_SET(store, params) {
  _.remove(api.requestTransforms, item => item.name === 'appendToken');
  const appendToken = (request) => {
    request.url += `&access_token=${params}`;
  };
  api.addRequestTransform(appendToken);
  store.commit('USER_TOKEN_SET', params);
}

export async function CHATS_FETCH(store, params) {
  const { commit } = store;
  commit('CHATS_FETCH');
  try {
    const response = await api.get(`/messages.getConversations?extended=1${serialize(params)}`);
    commit('CHATS_SET', chatsTransform(response));
  } catch (err) {
    commit('CHATS_SET', {});
  }
}

export async function CHAT_FETCH(store, params) {
  const { commit } = store;
  commit('CHAT_FETCH');
  try {
    const response = await api.get(`/messages.getHistory?${serialize(params)}`);
    const me = {
      _id: params.peer_id,
      name: 'Артем Мартьянов',
      avatar: 'https://pp.userapi.com/c637117/v637117766/5b7f2/qvQX4l2WhoA.jpg',
    };
    const interlocutor = {
      _id: params.peer_id,
      name: params.name,
      avatar: params.avatar,
    };
    commit('CHAT_SET', chatTransform(response, me, interlocutor));
  } catch (err) {
    commit('CHAT_SET', {});
  }
}

export async function CHAT_SEND_FETCH(store, params) {
  const { commit } = store;
  commit('CHAT_SEND_FETCH');
  try {
    const response = await api.get(`/messages.send?${serialize(params)}`);
    commit('CHAT_SEND_SET', response);
  } catch (err) {
    commit('CHAT_SEND_SET', {});
  }
}
