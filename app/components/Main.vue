<template>
  <Page>
    <ActionBar title="Vk Messenger" android:flat="true"/>
    <TabView
      android:tabBackgroundColor="#53ba82"
      android:tabTextColor="#c4ffdf"
      android:selectedTabTextColor="#ffffff"
      androidSelectedTabHighlightColor="#ffffff"
    >
      <TabViewItem title="Tab 1">
        <GridLayout columns="*" rows="*">
          <Label class="message" text="Messages" col="0" row="0"/>
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Tab 2">
        <GridLayout columns="*" rows="*">
          <Label class="message" text="Profile" col="0" row="0"/>
        </GridLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>
