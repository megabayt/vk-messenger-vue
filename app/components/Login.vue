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
  }),
  methods: {
    handleLoadStart({ url }) {
      if (url.indexOf('#') !== -1) {
        const afterHash = url.split('#')[1];
        const regexpMatch = afterHash.match(/access_token=(.*?)&/);
        if (regexpMatch && regexpMatch[1]) {
          const token = regexpMatch[1];
          store.dispatch('USER_TOKEN_SET', token);
          this.showWv = false;
          this.$navigateTo(Main, { clearHistory: true });
        }
      }
    }
  }
})
</script>
