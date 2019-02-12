<template>
  <RadListView
    for="id in data.conversationIds">
    <v-template>
      <GridLayout rows="*, *" columns="50, *, 100">
        <Image
          row="0"
          col="0"
          rowSpan="2"
          :src="data.conversations[id].previewAvatar"
          class="img-rounded"></Image>
        <Label
          row="0"
          col="1"
          :text="data.conversations[id].fullName"></Label>
        <Label
          row="1"
          col="1"
          :text="data.conversations[id].lastMessage.text"></Label>
        <Label
          row="0"
          col="2"
          :text="data.conversations[id].lastMessage.date"></Label>
      </GridLayout>
    </v-template>
  </RadListView>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';

export default Vue.extend({
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

<style>
  .img-rounded {
    width: 50;
    height: 50;
    border-radius: 50%;
  }
</style>
