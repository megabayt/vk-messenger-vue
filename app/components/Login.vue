<template>
  <Page>
    <ActionBar title="Вход" android:flat="true"/>
    <GridLayout columns="*" rows="*">
      <WebView
        v-if="showWv"
        :src="webViewSrc"
        @loadStarted="handleLoadStart($event)"
      />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex'
import Main from '@/components/Main.vue';
import { config } from '@/constants/api';
import { IState } from '@/store/types';

export default Vue.extend({
  data: () => ({
    showWv: true,
    webViewSrc: config.OAUTH_URL,
    watcher: null,
  }),
  mounted() {
    setTimeout(() => {
      this.checkToken();
    }, 1000);
  },
  computed: {
    ...mapState({
      token: (state: IState) => state.user.token,
    }),
  },
  watch: {
    token: function () {
      this.checkToken();
    }
  },
  methods: {
    ...mapActions({
      userTokenSet: 'USER_TOKEN_SET',
    }),
    checkToken() {
      if (this.token !== '') {
        this.$navigateTo(Main, { clearHistory: true });
      }
    },
    handleLoadStart({ url }: { url: string }) {
      if (url.indexOf('#') !== -1) {
        const afterHash = url.split('#')[1];
        const regexpMatch = afterHash.match(/access_token=(.*?)&/);
        if (regexpMatch && regexpMatch[1]) {
          const token = regexpMatch[1];
          this.userTokenSet(token);
          this.showWv = false;
        }
      }
    }
  }
})
</script>
