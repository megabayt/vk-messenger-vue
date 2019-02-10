<template>
  <Login />
</template>

<script lang="ts">
import Login from "./Login.vue";
import Main from "./Main.vue";

export default {
  components: { Login },
};
</script>

<style scoped>
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
