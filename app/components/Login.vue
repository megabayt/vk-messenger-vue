<template>
  <Page>
    <ActionBar title="Вход" android:flat="true"/>
    <GridLayout columns="*" rows="*">
      <WebView
        *ngIf="showWv"
        :src="webViewSrc"
        @loadStarted="handleLoadStart($event)"
      />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import Main from './Main.vue';
import { config } from '../constants/api';
import store from '../store';

export default Vue.extend({
  data: () => ({
    showWv: true,
    webViewSrc: config.OAUTH_URL,
    watcher: null,
  }),
  created() {
    this .watcher = store.watch(() => store.state.user.token, this.checkToken);
  },
  beforeDestroy() {
    if(this .watcher) {
      this .watcher();
    }
  },
  methods: {
    checkToken() {
      if (store.state.user.token !== '') {
        this .$navigateTo(Main, { clearHistory: true });
      }
    },
    handleLoadStart({ url }: { url: string }) {
      if (url.indexOf('#') !== -1) {
        const afterHash = url.split('#')[1];
        const regexpMatch = afterHash.match(/access_token=(.*?)&/);
        if (regexpMatch && regexpMatch[1]) {
          const token = regexpMatch[1];
          store.dispatch('USER_TOKEN_SET', token);
          this .showWv = false;
        }
      }
    }
  }
})
</script>
