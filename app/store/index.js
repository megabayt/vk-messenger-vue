import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import localStorage from 'nativescript-localstorage';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const NSVuexPersistent = store => {
  // Init hook.
  let storageStr = localStorage.getItem('ns-vuex-persistent');
  if (storageStr) {
   store.replaceState(JSON.parse(storageStr))
  }
  store.subscribe((mutation, state) => {
   // Suscribe hook.
   localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
  })
 };


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
  plugins: [NSVuexPersistent],
});

export default store;
