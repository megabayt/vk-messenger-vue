<template>
  <StackLayout>
    <RadListView
      :pullToRefresh="true"
      loadOnDemandMode="Auto"
      @pullToRefreshInitiated="pullToRefresh($event)"
      @loadMoreDataRequested="infiniteScroll($event)"
      for="chatItem in data.items || []"
    >
      <v-template>
        <ChatListItem
          :chatProfiles="chatProfiles"
          :chatItem="chatItem"
        />
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script lang="ts">
import { get } from 'lodash';
import Vue from 'nativescript-vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import { ListViewEventData } from 'nativescript-ui-listview';
import ChatListItem from './ChatListItem.vue';
import { IState } from '@/store/types';

export default Vue.extend({
  components: { ChatListItem },
  computed: {
    ...mapState({
      data: (state: IState) => state.chats.data,
      fetching: (state: IState) => state.chats.fetching,
    }),
    ...mapGetters({
      chatProfiles: 'getChatProfiles',
      conversations: 'getConversations',
    }),
  },
  created() {
    this.chatsFetch();
  },
  methods: {
    ...mapActions({
      chatsAppendFetch: 'CHATS_APPEND_FETCH',
      chatsFetch: 'CHATS_FETCH',
    }),
    pullToRefresh({ object }: ListViewEventData) {
      this.$refs.chatList = object;
      this.chatsFetch();
    },
    infiniteScroll({ object }: ListViewEventData) {
      this.$refs.chatList = object;
      this.chatsAppendFetch({
        count: 20,
        offset: get(this.data, 'items.length'),
      });
    },
  },
  watch: {
    fetching(val) {
      if (!val && this.$refs.chatList) {
        this.$refs.chatList.notifyPullToRefreshFinished();
        this.$refs.chatList.notifyLoadOnDemandFinished();
      }
    },
  },
});
</script>
