<template>
  <el-container>
    <div class="goal-cards">
      <template
        v-for="goal in goals"
        :key="goal.id"
      >
        <InvestmentCard :goal="goal" />
      </template>
    </div>
    <el-skeleton
      class="box-card"
      v-if="goalsLength === 0"
    >
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 240px; height: 240px;"
        />
        <div style="padding: 14px;">
          <el-skeleton-item
            variant="p"
            style="width: 50%"
          />
          <div
            style="display: flex; align-items: center; justify-items: space-between;"
          >
            <el-skeleton-item
              variant="text"
              style="margin-right: 16px;"
            />
            <el-skeleton-item
              variant="text"
              style="width: 30%;"
            />
          </div>
        </div>
      </template>
    </el-skeleton>
    <div>
      <el-button
        type="primary"
        @click="goToAddGoals"
      >Add More Goals</el-button>
    </div>
  </el-container>
</template>

<script lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import InvestmentCard from '@/components/InvestmentCard.vue';

export default {
  components: {
    InvestmentCard,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loggedIn = computed(() => store.state.user.loggedIn);
    watch(loggedIn, (newValue) => {
      if (!newValue) {
        router.push('authentication');
      }
    });
    onMounted(() => {
      if (!loggedIn.value) router.push('authentication');
    });
    return {
      goals: computed(() => store.state.goals),
      goalsLength: computed(() => store.getters.getLength),
      goToAddGoals: () => router.push('create-investment-goal'),
    };
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.goal-cards {
  display: flex;
  position: relative;
}

.el-button {
  position: relative;
}

.box-card {
  width: 20rem;
  margin: 1em 1em;
}
</style>
