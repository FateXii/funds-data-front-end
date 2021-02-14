<template>
  <el-container>
    <AuthForm id="auth-form" />
  </el-container>
</template>
<script lang="ts">
import AuthForm from '@/components/AuthForm.vue';

export default {
  components: {
    AuthForm,
  },
};
</script>
<style lang="scss" scoped>
#auth-form {
  position: relative;
  top: 33vh;
  left: 33vw;
  width: 33vw;
}
</style>
