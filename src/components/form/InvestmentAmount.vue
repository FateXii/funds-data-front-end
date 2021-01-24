<template>
  <NonRetirementInvestmentAmount
    v-if="savingReason !== 'retirement'"
    @givePvType="setPvType"
    @giveNonRetirementInvestmentAmount="getNonRetirementInvestmentAmount"
  />
  <RetirementInvestmentAmount
    v-else
    @giveExpectedRetirementPayout="getExpectedRetirementPayout"
    @givePayoutLength="getPayoutLength"
  />
  <Button
    v-if="canMoveOn"
    @click.prevent="nextPage"
  >Next</Button>
</template>

<script>
import { ref, watch } from 'vue';
import NonRetirementInvestmentAmount from './NonRetirementInvestmentAmount.vue';
import RetirementInvestmentAmount from './RetirementInvestmentAmount.vue';
import Button from './Button.vue';

export default {
  components: {
    NonRetirementInvestmentAmount,
    RetirementInvestmentAmount,
    Button,
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
    }) => {
      if (
        !(
          (pvType.value
            && ['lump', 'monthly'].indexOf(pvType.value) > -1
            && investmentAmount)
          || (expectedRetirementPayout && payoutLength)
        )
      ) {
        console.warn('Both values have to be filled');
        return false;
      }

      return true;
    },
    moveOn: null,
    prevPage: null,
  },
  setup(props, { emit }) {
    const pvType = ref(null);
    const investmentAmount = ref(null);
    const payoutLength = ref(null);
    const expectedRetirementPayout = ref(null);
    const canMoveOn = ref(false);
    function checkMoveOn() {
      return (
        (pvType.value
          && ['lump', 'monthly'].indexOf(pvType.value) > -1
          && investmentAmount.value)
        || (expectedRetirementPayout.value && payoutLength.value)
      );
    }
    function setPvType(value) {
      pvType.value = value;
    }
    function getNonRetirementInvestmentAmount(value) {
      investmentAmount.value = value;
    }
    function getPayoutLength(value) {
      payoutLength.value = value;
    }
    function getExpectedRetirementPayout(value) {
      expectedRetirementPayout.value = value;
    }
    watch(
      [investmentAmount, pvType, expectedRetirementPayout, payoutLength],
      () => {
        canMoveOn.value = checkMoveOn();
      },
    );
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
    function prevPage() {
      emit('prevPage', {});
    }
    return {
      prevPage,
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
