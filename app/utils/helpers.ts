// import { reduce } from 'lodash';
import { remove } from 'lodash';
import { create, RequestTransform } from 'apisauce';

import { config } from '../constants/api';
import { okResponse, IChatsFetch } from '../types';
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

// function serialize(object: object): string {
//   const str = '';
//   if (!object) {
//     return str;
//   }
//   return reduce(object, (result: string, value: string, key: string) => {
//     return `${result}&${key}=${encodeURIComponent(value)}`;
//   }, '');
// }

export const chatsFetch: IChatsFetch = () => !config.USE_FIXTURES
  ? api.get('/messages.getConversations?extended=1')
  : Promise.resolve({
    ...okResponse,
    data: {
      response: (getConversationsJson as any),
    },
  });
