<template>
  <NonRetirementInvestmentAmount
    v-if="savingReason !== 'retirement'"
    @givePvType="setPvType"
    @giveNonRetirementInvestmentAmount="getNonRetirementInvestmentAmount"
  />
  <RetirementInvestmentAmount
    v-else
    @giveExpectedRetirementPayOut="getExpectedRetirementPayout"
    @givePayoutLength="getPayoutLength"
  />
  <button
    class="mt-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    @click.prevent="nextPage"
    v-if="canMoveOn"
  >Next</button>
</template>

<script>
import { ref, watch } from 'vue';
import NonRetirementInvestmentAmount from './NonRetirementInvestmentAmount.vue';
import RetirementInvestmentAmount from './RetirementInvestmentAmount.vue';

export default {
  components: {
    NonRetirementInvestmentAmount,
    RetirementInvestmentAmount,
  },
  props: {
    savingReason: { type: String, required: true },
  },
  emits: {
    giveInvestmentAmount: ({
      pvType,
      payoutLength,
      expectedRetirementPayout,
      investmentAmount,
    }) => (pvType in ['lump', 'monthly'] && investmentAmount)
      || (expectedRetirementPayout && payoutLength),
    moveOn: null,
  },
  setup(props, { emit }) {
    const pvType = ref('');
    const investmentAmount = ref(0.0);
    const payoutLength = ref(0);
    const expectedRetirementPayout = ref(0.0);
    const canMoveOn = ref(false);
    function checkMoveOn() {
      return (
        (pvType.value in ['lump', 'monthly'] && investmentAmount.value)
        || (expectedRetirementPayout.value && payoutLength.value)
      );
    }
    function setPvType(value) {
      pvType.value = value;
      canMoveOn.value = checkMoveOn;
    }
    function getNonRetirementInvestmentAmount(value) {
      investmentAmount.value = value;
      canMoveOn.value = checkMoveOn;
    }
    function getPayoutLength(value) {
      payoutLength.value = value;
      canMoveOn.value = checkMoveOn;
    }
    function getExpectedRetirementPayout(value) {
      expectedRetirementPayout.value = value;
      canMoveOn.value = checkMoveOn;
    }
    watch(canMoveOn, (value) => {
      if (value) {
        emit('giveInvestmentAmount', {
          pvType,
          payoutLength,
          expectedRetirementPayout,
          investmentAmount,
        });
      }
    });
    function nextPage() {
      emit('moveOn', { canMoveOn });
    }
    return {
      nextPage,
      canMoveOn,
      setPvType,
      getPayoutLength,
      getExpectedRetirementPayout,
      getNonRetirementInvestmentAmount,
    };
  },
};
</script>

<style>
</style>
