<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
}
</style>
