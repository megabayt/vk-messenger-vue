import { get } from 'lodash';
import { IChatsResponse } from '@/types';

import { IState } from '../types';

export const CHATS_FETCH = (state: IState) => {
  state.chats.fetching = true;
  state.chats.error = false;
};

export const CHATS_SET = (state: IState, { data, error }: { data: IChatsResponse, error: boolean }) => {
  state.chats.fetching = false;
  state.chats.data = data;
  state.chats.error = error;
};

export const CHATS_APPEND_FETCH = CHATS_FETCH;

export const CHATS_APPEND_SET = (state: IState, { data, error }: { data: IChatsResponse, error: boolean }) => {
  const oldItems = get(state.chats, 'data.items') || [];
  const newItems = get(data, 'items') || [];
  state.chats.fetching = false;
  state.chats.data = {
    ...data,
    items: [
      ...oldItems,
      ...newItems,
    ],
  };
  state.chats.error = error;
};
