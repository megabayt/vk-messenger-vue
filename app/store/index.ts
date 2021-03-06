import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import localStorage from 'nativescript-localstorage';
import { initialState, IStore } from '@/store/types';

import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

const NSVuexPersistent = (store: IStore): void => {
  // Init hook.
  const storageStr = localStorage.getItem('ns-vuex-persistent');
  if (storageStr) {
    store.replaceState(JSON.parse(storageStr));
  }
  store.subscribe((_0, state): void => {
    // Suscribe hook.
    localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
  });
};

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  plugins: [NSVuexPersistent],
  state: initialState,
});
