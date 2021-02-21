<template>
  <el-container>
    <AuthForm id="auth-form" />
  </el-container>
</template>
<script lang="ts">
import AuthForm from '@/components/AuthForm.vue';
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    AuthForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loggedIn = computed(() => store.state.user.loggedIn);
    watch(loggedIn, () => {
      if (loggedIn.value) {
        router.push('dashboard');
      }
    });
  },
};
</script>
<style lang="scss" scoped>
#auth-form {
  position: relative;
  top: 25vh;
  left: 33vw;
  width: 33vw;
}
</style>
