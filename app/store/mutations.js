export function USER_TOKEN_SET(state, token) {
  state.user.token = token;
}

export function CHATS_FETCH(state) {
  state.chats.fetching = true;
}

export function CHATS_SET(state, data) {
  state.chats.fetching = false;
  state.chats.data = data;
}

export function CHAT_FETCH(state) {
  state.chat.fetching = true;
}

export function CHAT_SET(state, data) {
  state.chat.fetching = false;
  state.chat.data = data;
}

export function CHAT_SEND_FETCH(state) {
  state.chatSend.fetching = true;
}

export function CHAT_SEND_SET(state, data) {
  state.chatSend.fetching = false;
  state.chatSend.data = data;
}
