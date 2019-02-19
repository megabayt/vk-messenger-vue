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
import store from '@/store';
import ChatListItem from './ChatListItem.vue';

export default Vue.extend({
  components: { ChatListItem },
  created() {
    store.dispatch('CHATS_FETCH');
  },
  computed: {
    data() {
      return store.state.chats.data;
    }
  }
})
</script>