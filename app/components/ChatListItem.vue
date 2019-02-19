<template>
  <GridLayout rows="*" columns="57, *, 70" class="wrapper">
    <Image
      row="0"
      col="0"
      rowSpan="2"
      :src="conversation.previewAvatar"
      class="avatar"
      verticalAlignment="top"
      horizontalAlignment="left"></Image>
    <StackLayout
      row="0"
      col="1"
      verticalAlignment="top"
    >
      <Label
        :text="conversation.fullName"
        class="name"
        horizontalAlignment="left"></Label>
      <Label
        :text="conversation.lastMessage.text"
        class="message"
        horizontalAlignment="left"></Label>
    </StackLayout>
    <StackLayout
      row="0"
      col="2"
      verticalAlignment="top"
    >
      <Label
        :text="'12.12.2019'"
        class="date"></Label>
      <Label
        v-if="!!conversation.unreadCount"
        :text="conversation.unreadCount"
        class="badge"
        width="20"
        height="20"
        horizontalAlignment="right"
      ></Label>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue';

import { IChat } from '@/types';

export default Vue.extend({
  props: {
    conversation: Object as () => IChat,
  }
})
</script>

<style>
  .wrapper {
    padding: 7;
  }
  .avatar {
    width: 50;
    height: 50;
    border-radius: 50%;
  }
  .name {
    font-size: 14;
  }
  .message {
    margin-top: 5;
    font-size: 12;
    color: #333;
  }
  .date {
    font-size: 12;
    color: #333;
    text-align: right;
  }
  .badge {
    font-size: 12;
    color: #ffffff;
    background: #ff3600;
    border-radius: 10;
    text-align: center;
    margin-top: 5;
    margin-right: 5;
  }
</style>
