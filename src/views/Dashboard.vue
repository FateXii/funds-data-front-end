<template>
  <div class="goal-cards">
    <el-card
      v-for="goal in goals"
      :key="goal.id"
      class="box-card"
    >
      <template #header>
        <div class="card-header">
          <h4>{{goal.name}}</h4>-
          <h4>Goal Amount</h4>
          <p>R {{goal.investmentGoal}}</p>
          <p v-if="goal.description">{{goal.description}}</p>
        </div>
      </template>
      <div>
        <h5>Investing</h5>
        <span
          v-if="goal.investmentAmount.principle"
        >R{{goal.investmentAmount.principle}} Ininital investment</span>
        <br />
        <span
          v-if="goal.investmentAmount.installment"
        >R{{goal.investmentAmount.installment}} p/m</span>

        <h5>Investing for:</h5>
        <p>{{goal.length}} years</p>
      </div>
    </el-card>
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
</template>

<script lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const loggedIn = computed(() => store.state.user.loggedIn);
    watch(loggedIn, () => {
      if (!loggedIn.value) {
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
