<template>
  <el-header>
    <div class="logo">
      <span class="logo-heavy">FUNDS</span>
      <span class="logo-light">DATA</span>
    </div>
    <div
      class="user-info"
      v-if="loggedIn"
    >
      <el-dropdown trigger="click">
        <el-button
          class="el-dropdown-link"
          type="primary"
        >
          {{username}}
          <i class="el-icon-user el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      logout: () => store.commit('logout'),
      loggedIn: computed(() => store.state.user.loggedIn),
      username: computed(
        () => `${store.state.user.name} ${store.state.user.surname}`,
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 3em;
  box-shadow: 0 1px 8px black;
  .user-info {
    width: fit-content;
  }
}
.logo {
  display: flex;
  flex-flow: row nowrap;
  font-size: 3rem;
  width: fit-content;
  .logo-heavy {
    font-weight: bold;
  }
}
</style>
