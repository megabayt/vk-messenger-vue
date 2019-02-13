import { IChatsTransformedResponse } from '@/types';

import { IState } from '../types';

export const CHATS_FETCH = (state: IState) => {
  state.chats.fetching = true;
  state.chats.error = false;
};

export const CHATS_SET = (state: IState, { data, error }: { data: IChatsTransformedResponse, error: boolean }) => {
  state.chats.fetching = false;
  state.chats.data = data;
  state.chats.error = error;
};
