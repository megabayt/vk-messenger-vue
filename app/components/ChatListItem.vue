<template>
  <GridLayout rows="*" columns="57, *, 70" class="wrapper">
    <Image
      row="0"
      col="0"
      rowSpan="2"
      v-if="avatar"
      :src="avatar"
      class="avatar"
      verticalAlignment="top"
      horizontalAlignment="left"></Image>
    <GridLayout rows="25, 25" columns="25, 25" class="avatars" v-if="avatars.length">
      <Image
        v-for="(avatar, index) in avatars"
        :key="index"
        :row="index / 2 | floor"
        :col="index % 2 | floor"
        :src="avatar"
        class="avatar-mini"
        verticalAlignment="center"
        horizontalAlignment="center"></Image>
    </GridLayout>
    <StackLayout
      row="0"
      col="1"
      verticalAlignment="top"
    >
      <Label
        :text="fullName"
        class="name"
        horizontalAlignment="left"></Label>
      <Label
        :text="lastMessage.text"
        class="message"
        horizontalAlignment="left"></Label>
    </StackLayout>
    <StackLayout
      row="0"
      col="2"
      verticalAlignment="top"
    >
      <Label
        :text="lastMessage.date"
        class="date"></Label>
      <Label
        v-if="!!unreadCount"
        :text="unreadCount"
        class="badge"
        width="20"
        height="20"
        horizontalAlignment="right"
      ></Label>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { IChatItem, IChatMergedProfiles } from '@/types';
import { get } from 'lodash';
import { getAttachmentReplacer, dateFormatter } from '@/utils/helpers';

export default Vue.extend({
  props: {
    chatItem: Object as () => IChatItem,
    chatProfiles: Object as () => IChatMergedProfiles,
  },
  computed: {
    peerId() {
      return get(this.chatItem, 'conversation.peer.id') || -1;
    },
    profile() {
      return get(this.chatProfiles, `[${this.peerId}]`) || {};
    },
    avatar() {
      return get(this.profile, `photo_50`);
    },
    avatars() {
      const activeIds: ReadonlyArray<number> = get(this.chatItem, 'conversation.chat_settings.active_ids') || [];
      if (activeIds.length) {
        return activeIds.map(activeId => get(this.chatProfiles, `[${activeId}].photo_50`));
      }
      return [];
    },
    fullName() {
      const name = get(this.profile, 'name');
      if (name) {
        return name;
      }
      const firstName = get(this.profile, 'first_name');
      const lastName = get(this.profile, 'last_name');
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      }
      const title = get(this.chatItem, 'conversation.chat_settings.title');
      if (title) {
        return title;
      }
      return 'Неизвестно';
    },
    lastMessage() {
      return {
        text: get(this.chatItem, 'last_message.text')
          || getAttachmentReplacer(this.chatItem),
        date: dateFormatter(get(this.chatItem, 'last_message.date')),
      };
    },
    unreadCount() {
      return get(this.chatItem, 'conversation.unread_count') || 0;
    },
  },
  filters: {
    floor: function (value: any) {
      const floored = Math.floor(value);
      if (!floored) {
        return 0;
      }
      return floored;
    },
  },
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
  .avatars {
    width: 50;
    height: 50;
  },
  .avatar-mini {
    width: 25;
    height: 25;
    border-radius: 50%;
  },
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
