import moment from 'moment';
import { get, reduce, remove } from 'lodash';
import { create, RequestTransform } from 'apisauce';

import { config } from '../constants/api';
import { okResponse, IChatsFetch, IChatItem } from '../types';
import getConversationsJson from '../fixtures/getConversations.json';

const api = create({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

api.addRequestTransform((request) => {
  request.url += `&v=${config.VERSION}`;
});

export const setToken = (token: string): void => {
  remove(api.requestTransforms, item => item.name === 'appendToken');
  const appendToken: RequestTransform = (request) => {
    request.url += `&access_token=${token}`;
  };
  api.addRequestTransform(appendToken);
};

function serialize(object: object): string {
  if (!object) {
    return '';
  }
  return reduce(object, (result: string, value: string, key: string) => {
    return `${result}&${key}=${encodeURIComponent(value)}`;
  }, '');
}

export const getAttachmentReplacer = (item: IChatItem): string => {
  const attachmentType = get(item, 'last_message.attachments[0].type');
  switch (attachmentType) {
    case 'wall': return 'Запись со стены';
    case 'sticker': return 'Стикер';
    case 'photo': return 'Фото';
    case 'doc': return 'Документ';
  }
  const fwdMessage = get(item, 'last_message.fwd_messages[0]') && 'Пересланные сообщения';
  if (fwdMessage) {
    return 'Пересланные сообщения';
  }
  return 'Вложение';
};

export const dateFormatter = (date: number): string => {
  if (moment().diff(moment.unix(date), 'days') > 0) {
    if (moment().diff(moment.unix(date), 'year') > 0) {
      return moment.unix(date).format('DD MMM YYYY');
    }
    return moment.unix(date).format('DD MMM');
  }
  return moment.unix(date).format('HH:mm');
}

export const chatsFetch: IChatsFetch = (params = {}) => !config.USE_FIXTURES
  ? api.get(`/messages.getConversations?extended=1${serialize(params)}`)
  : Promise.resolve({
    ...okResponse,
    data: (getConversationsJson as any),
  });
