import { reduce } from 'lodash';
import { create } from 'apisauce';

import { config } from '../constants/api';

import { IChatsFetch } from './types';

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

function serialize(object: object): string {
  const str = '';
  if (!object) {
    return str;
  }
  return reduce(object, (result: string, value: string, key: string) => {
    return `${result}&${key}=${encodeURIComponent(value)}`;
  }, '');
}

export const chatsFetch: IChatsFetch = () => api.get('/messages.getConversations?extended=1');
