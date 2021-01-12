<template>
  <form @submit.prevent>
    <InvestmentType
      v-if="formState.step === 0"
      @giveReason="getReason"
      @moveOn="nextPage"
    />
    <InvestmentLength
      v-if="formState.step === 1"
      :savingReason="questionaire.savingReason"
      @moveOn="nextPage"
      @giveInvestmentLength="getInvstmentLength"
    />
    <InvestmentAmount
      v-if="formState.step === 2"
      :savingReason="questionaire.savingReason"
      @moveOn="nextPage"
      @giveInvestmentAmount="getInvestmentAmount"
    />
  </form>
  <div v-if="formState.step == 3">
    <Button @click.prevent="getTrusts">Show Me Suitable Trusts</Button>
    <UnitTrustList :unitTrusts="unitTrusts" />
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import data from '../assets/data.json';
import InvestmentType from './form/InvestmentType.vue';
import InvestmentLength from './form/InvestmentLength.vue';
import InvestmentAmount from './form/InvestmentAmount.vue';
import Button from './form/Button.vue';
import UnitTrustList from './UnitTrustList.vue';
import {
  capitalRequired,
  interestRequired,
  presentValue,
  presentValueOfFundsRequired,
} from '../assets/services';

export default {
  components: {
    UnitTrustList,
    InvestmentType,
    InvestmentLength,
    InvestmentAmount,
    Button,
  },
  setup() {
    const formState = reactive({
      step: 0,
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
    const unitTrusts = data;
    const matchingTrusts = ref([]);
    function getReason({ reasonStated, savingReason }) {
      questionaire.reasonStated = reasonStated;
      questionaire.savingReason = savingReason;
    }
    function getInvstmentLength(investmentLength) {
      questionaire.investmentLength = investmentLength;
    }
    function getInvestmentAmount(
      pvType,
      payoutLength,
      expectedRetirementPayout,
      investmentAmount,
    ) {
      questionaire.pvType = pvType;
      questionaire.paymentLength = payoutLength;
      questionaire.expectedRetirement = expectedRetirementPayout;
      questionaire.investmentAmount = investmentAmount;
    }
    function getTrusts() {
      const isRetirementFund = questionaire.savingReason === 'retirement';
      const inflation = 3.5 / 100.0;

      const expectedRetirement = Number(questionaire.expectedRetirement);
      const investmentLength = Number(questionaire.investmentLength);
      const paymentLength = Number(questionaire.paymentLength);
      const investmentAmount = Number(questionaire.investmentAmount);

      const fv = capitalRequired(
        expectedRetirement,
        investmentLength,
        inflation,
      );
      let pv = 0;
      if (questionaire.pvType === 'lump') {
        pv = presentValue(paymentLength, fv, inflation);
      } else {
        pv = presentValueOfFundsRequired(
          investmentAmount,
          investmentLength,
          inflation,
        );
      }
      const interest = interestRequired(pv, fv, investmentLength);
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
        })
        .filter((trust) => trust.lump_returns.three_months >= interest);
    }
    function nextPage(canMoveOn) {
      formState.canMoveOn = false;
      formState.reasonNeeded = false;
      if (canMoveOn) {
        formState.step = (formState.step + 1) % 4;
      }
    }
    return {
      getInvestmentAmount,
      getTrusts,
      getReason,
      getInvstmentLength,
      unitTrusts,
      nextPage,
      questionaire,
      formState,
      matchingTrusts,
    };
  },
};
</script>
