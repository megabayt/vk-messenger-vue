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
import { mapActions, mapState, mapGetters } from "vuex";
import ChatListItem from "./ChatListItem.vue";
import { IState } from "@/store/types";
import { ListViewEventData } from "nativescript-ui-listview";

export default Vue.extend({
  components: { ChatListItem },
  created() {
    this.chatsFetch();
  },
  methods: {
    ...mapActions({
      chatsFetch: "CHATS_FETCH",
      chatsAppendFetch: "CHATS_APPEND_FETCH",
    }),
    pullToRefresh({ object }: ListViewEventData) {
      this.$refs.chatList = object;
      this.chatsFetch();
    },
    infiniteScroll({ object }: ListViewEventData) {
      this.$refs.chatList = object;
      this.chatsAppendFetch({
        offset: get(this.data, 'items.length'),
        count: 20,
      });
    },
  },
  computed: {
    ...mapState({
      fetching: (state: IState) => state.chats.fetching,
      data: (state: IState) => state.chats.data,
    }),
    ...mapGetters({
      chatProfiles: 'getChatProfiles',
      conversations: 'getConversations',
    }),
  },
  watch: {
    fetching: function(val) {
      if (!val && this.$refs.chatList) {
        this.$refs.chatList.notifyPullToRefreshFinished();
        this.$refs.chatList.notifyLoadOnDemandFinished();
      }
    },
  },
});
</script>