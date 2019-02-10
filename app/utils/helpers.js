import { create } from 'apisauce';
import { config } from '../constants/api';

export const api = create({
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

export function serialize(object) {
  let str = '';
  if (!object) {
    return str;
  }
  for (const key in object) {
    if (str !== '') {
      str += '&';
    }
    str += `&${key}=${encodeURIComponent(object[key])}`;
  }
  return str;
}
