<template>
  <el-container>
    <el-main>
      <el-steps
        :active="formState.step"
        finish-status="success"
      >
        <el-step title="Investment Goal"></el-step>
        <el-step title="Step 2"></el-step>
        <el-step title="Step 3"></el-step>
      </el-steps>
      <InvestmentGoalDetailForm
        v-if="formState.step === 0"
        @setGoalIdentity="submitInvestmentForm"
      />
      <InvestmentContributionsForm
        v-else-if="formState.step === 1"
        @setContribution="submitContibutions"
      />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import InvestmentGoalDetailForm from '@/components/InvestmentGoalDetailsForm.vue';
import InvestmentContributionsForm from '@/components/InvestmentContributionsForm.vue';

interface SetGoalNamePayload {
  name: string;
  description?: string;
  investmentGoal: number;
}
interface ContributionsPayload {
  investmentAmount: InvestmentAmount;
  length: number;
}
export default {
  components: {
    InvestmentGoalDetailForm,
    InvestmentContributionsForm,
  },
  setup() {
    const formState = reactive({
      step: 0,
    });
    function changeFormState() {
      formState.step = (formState.step + 1) % 2;
    }
    const router = useRouter();
    const store = useStore();
    const investmentGoalForm = reactive<InvestmentGoal>({
      id: -1,
      name: '',
      description: '',
      investmentGoal: 0.0,
      investmentAmount: {
        principle: 0.0,
        installment: 0.0,
      },
      length: 0,
    });
    function submitInvestmentForm(payload: SetGoalNamePayload) {
      investmentGoalForm.name = payload.name;
      investmentGoalForm.description = payload.description;
      investmentGoalForm.investmentGoal = payload.investmentGoal;
      console.log(payload);
      console.log(investmentGoalForm);
      changeFormState();
    }

    function addToGoalsList() {
      const id = store.getters.getLength;
      store.commit('addInvestmentGoal', {
        ...investmentGoalForm,
        id,
      });
      router.push('dashboard');
    }
    const submitContibutions = (payload: ContributionsPayload) => {
      investmentGoalForm.investmentAmount = payload.investmentAmount;
      investmentGoalForm.length = payload.length;
      addToGoalsList();
    };

    return {
      investmentGoalForm,
      addToGoalsList,
      formState,
      submitInvestmentForm,
      submitContibutions,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-step {
  margin-bottom: 5em;
  &__title {
    font-size: 0.75em;
  }
}
</style>
