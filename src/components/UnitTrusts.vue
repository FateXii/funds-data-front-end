<template>
  <form @submit.prevent>
    <div v-if="formState.step == 0">
      <InvestmentType
        @giveReason="getReason"
        @moveOn="nextPage"
      />
    </div>
    <div v-if="formState.step === 1">
      <InvestmentLength
        :savingReason="questionaire.savingReason"
        @moveOn="nextPage"
        @giveInvestmentLength="getInvstmentLength"
      />
    </div>
    <div v-if="formState.step == 2">
      <InvestmentAmount
        :savingReason="questionaire.savingReason"
        @moveOn="nextPage"
        @giveInvestmentAmount="getInvestmentAmount"
      />
    </div>
  </form>
  <div v-if="formState.step == 3">
    <button
      class="mt-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click.prevent="getTrusts"
    >Show Me Suitable Trusts</button>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Suitable Trusts</h3>
        <p
          class="mt-1 max-w-2xl text-sm text-gray-500"
        >These are the trusts that fit your requirements</p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <template
            v-for="trust in unitTrusts"
            :key="trust.name"
          >
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">Trust Name</dt>
              <dd
                class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
              >{{trust.name}}</dd>
            </div>
          </template>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import data from '../assets/data.json';
import InvestmentType from './form/InvestmentType.vue';
import InvestmentLength from './form/InvestmentLength.vue';
import InvestmentAmount from './form/InvestmentAmount.vue';
import {
  capitalRequired,
  interestRequired,
  presentValue,
  presentValueOfFundsRequired,
} from '../assets/services';

export default {
  components: {
    InvestmentType,
    InvestmentLength,
    InvestmentAmount,
  },
  setup() {
    const formState = reactive({
      step: 0,
      reasonNeeded: false,
      canMoveOn: false,
      needRetirementTime: false,
    });
    const questionaire = reactive({
      savingReason: 'select reason',
      reasonStated: '',
      paymentLength: 0,
      expectedRetirement: 0,
      investmentLength: 0,
      investmentAmount: 0,
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
      const inflation = 0.035;

      const expectedRetirement = Number(questionaire.expectedRetirement);
      const investmentLength = Number(questionaire.investmentLength);
      const paymentLength = Number(questionaire.paymentLength);
      const investmentAmount = Number(questionaire.investmentAmount);
      console.log(
        `expectedRetirement: ${expectedRetirement},
        investmentLength: ${investmentLength},
        investmentAmount: ${investmentAmount},
        paymentLength: ${paymentLength}`,
      );

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
      console.log(`interest: ${interest}, pv: ${pv}, fv: ${fv}`);
      console.log(questionaire);
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
    function processReason() {
      switch (formState.step) {
        case 0: {
          if (questionaire.savingReason === 'other') {
            formState.reasonNeeded = true;
          }
          formState.canMoveOn = true;
          break;
        }

        case 1: {
          formState.canMoveOn = questionaire.investmentLength !== '';
          break;
        }
        case 2: {
          formState.canMoveOn = questionaire.investmentAmount !== 0
            || (questionaire.expectedRetirement !== 0
              && questionaire.paymentLength !== 0);
          break;
        }
        default: {
          break;
        }
      }
    }
    function nextPage(canMoveOn) {
      formState.canMoveOn = false;
      formState.reasonNeeded = false;
      if (canMoveOn) {
        formState.step = (formState.step + 1) % 4;
      }
    }
    watch(questionaire, (current) => console.log(current));
    return {
      getInvestmentAmount,
      getTrusts,
      getReason,
      getInvstmentLength,
      unitTrusts,
      nextPage,
      questionaire,
      processReason,
      formState,
      matchingTrusts,
    };
  },
};
</script>
