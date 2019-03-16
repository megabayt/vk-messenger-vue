<template>
  <StackLayout>
    <RadListView
      :pullToRefresh="true"
      @pullToRefreshInitiated="pullToRefresh($event)"
      for="id in data.conversationIds"
    >
      <v-template>
        <ChatListItem :conversation="data.conversations[id]"/>
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import ChatListItem from "@/components/ChatListItem.vue";
import { IState } from "@/store/types";
import { ListViewEventData } from "nativescript-ui-listview";

export default Vue.extend({
  components: { ChatListItem },
  created() {
    this.chatsFetch();
  },
  methods: {
    ...mapActions({
      chatsFetch: "CHATS_FETCH"
    }),
    pullToRefresh({ object }: ListViewEventData) {
      this.$refs.chatList = object;
      this.chatsFetch();
    }
  },
  computed: {
    ...mapState({
      fetching: (state: IState) => state.chats.fetching,
      data: (state: IState) => state.chats.data
    })
  },
  watch: {
    fetching: function(val) {
      if (!val && this.$refs.chatList) {
        this.$refs.chatList.notifyPullToRefreshFinished();
      }
    },
  },
});
</script>