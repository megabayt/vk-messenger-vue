import Vue from 'nativescript-vue';
import VueDevtools from 'nativescript-vue-devtools';
import RadListView from 'nativescript-ui-listview/vue';
import App from '@/components/App.vue';
import store from '@/store';

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}

Vue.use(RadListView);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

new Vue({
  render: h => h('frame', [h(App)]),
  store,
}).$start();
