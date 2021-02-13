<template>
  <Header />
  <div class="container">
    <form @submit.prevent>
      <InvestmentType
        v-if="formState.step === 0"
        @giveReason="getReason"
        @moveOn="nextPage"
        @prevPage="prevPage"
      />
      <InvestmentLength
        v-if="formState.step === 1"
        :savingReason="questionaire.savingReason"
        @moveOn="nextPage"
        @prevPage="prevPage"
        @giveInvestmentLength="getInvestmentLength"
      />
      <InvestmentAmount
        v-if="formState.step === 2"
        :savingReason="questionaire.savingReason"
        @moveOn="nextPage"
        @prevPage="prevPage"
        @giveInvestmentAmount="getInvestmentAmount"
      />
    </form>
    <div v-if="formState.step == 3">
      <UnitTrustList
        :unitTrusts="unitTrusts"
        :savingGoal="savingGoal"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import InvestmentType from '@/components/form/InvestmentType.vue';
import InvestmentLength from '@/components/form/InvestmentLength.vue';
import InvestmentAmount from '@/components/form/InvestmentAmount.vue';
import UnitTrustList from '@/components/UnitTrustList.vue';
import Header from '@/components/Header.vue';
import data from '../assets/data.json';

export default {
  components: {
    UnitTrustList,
    InvestmentType,
    InvestmentLength,
    InvestmentAmount,
    Header,
  },
  setup() {
    const formState = reactive({
      step: 0,
    });
    const savingGoal = reactive({
      reason: null,
      initialInvestment: 0,
      investmentTime: 0,
      monthlyInstallment: 0,
    });
    const questionaire = reactive({
      savingReason: null,
      reasonStated: null,
      paymentLength: null,
      expectedRetirement: null,
      investmentLength: null,
      investmentAmount: null,
      pvType: 'lump',
    });
    /* const inflation = 3.5 / 100.0; */
    const unitTrusts = data;
    const matchingTrusts = ref([]);
    function getReason({ reasonStated, savingReason }) {
      questionaire.reasonStated = reasonStated;
      questionaire.savingReason = savingReason;
    }
    function getInvestmentLength(investmentLength) {
      questionaire.investmentLength = investmentLength;
    }
    function getInvestmentAmount(value) {
      const {
        pvType,
        payoutLength,
        expectedRetirementPayout,
        investmentAmount,
      } = value;
      savingGoal.reason = questionaire.reasonStated
        ? questionaire.reasonStated
        : questionaire.savingReason;
      /* savingGoal.initialInvestment = investmentAmount; */
      savingGoal.monthlyInstallment = investmentAmount;
      savingGoal.investmentTime = questionaire.investmentLength;

      questionaire.pvType = pvType;
      questionaire.paymentLength = payoutLength;
      questionaire.expectedRetirement = expectedRetirementPayout;
      questionaire.investmentAmount = investmentAmount;
    }
    function getTrusts() {
      const isRetirementFund = questionaire.savingReason === 'retirement';

      matchingTrusts.value = unitTrusts
        .filter((trust) => {
          if (isRetirementFund) {
            return trust.is_reg_28_comliant;
          }
          return true;
        })
        .filter((trust) => {
          if (questionaire.pvType === 'lump') {
            return trust.minimum_investment <= questionaire.investmentAmount;
          }
          return trust.minimum_monthly <= questionaire.investmentAmount;
        });
    }
    function nextPage(canMoveOn) {
      formState.canMoveOn = false;
      formState.reasonNeeded = false;
      if (canMoveOn) {
        formState.step = (formState.step + 1) % 4;
      }
    }
    function prevPage() {
      formState.step = formState.step > 0 ? formState.step - 1 : formState.step;
    }
    return {
      prevPage,
      getInvestmentAmount,
      getTrusts,
      getReason,
      getInvestmentLength,
      unitTrusts,
      nextPage,
      questionaire,
      formState,
      matchingTrusts,
      savingGoal,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
}
</style>>
