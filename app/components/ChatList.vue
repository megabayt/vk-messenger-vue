<template>
  <RadListView
    for="id in data.conversationIds">
    <v-template>
      <ChatListItem
        :conversation="data.conversations[id]"
      />
    </v-template>
  </RadListView>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import ChatListItem from '@/components/ChatListItem.vue';
import { IState } from '@/store/types';

export default Vue.extend({
  components: { ChatListItem },
  created() {
    this.chatsFetch();
  },
  methods: {
    ...mapActions({
      chatsFetch: 'CHATS_FETCH',
    }),
  },
  computed: {
    ...mapState({
      data: (state: IState) => state.chats.data,
    }),
  }
})
</script>