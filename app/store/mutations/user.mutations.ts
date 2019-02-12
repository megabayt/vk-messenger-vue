import { IState } from '@/store/types';

export const USER_TOKEN_SET = (state: IState, token: string) => {
  state.user.token = token;
};
