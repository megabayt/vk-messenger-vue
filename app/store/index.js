import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,
  state: {
    user: {
      token: '',
    },
    chats: {
      fetching: false,
      data: [],
    },
    chat: {
      fetching: false,
      data: [],
    },
    chatSend: {
      fetching: false,
      data: [],
    },
  },
});

export default store;
