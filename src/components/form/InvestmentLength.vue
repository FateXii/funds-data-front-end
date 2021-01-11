<template>
  <div v-if="savingReason !== 'retirement'">
    <label
      for="investment-length"
      class="block text-sm font-medium text-gray-700"
      id="investment-length-label"
    >How long would you like to invest?</label>
  </div>
  <div v-else>
    <label
      for="investment-length"
      id="investment-length-label"
    >How many years Till Retirement</label>
  </div>
  <div class="ml-8 w-10/12 relative rounded-md shadow-sm">
    <input
      id="investment-length"
      name="investment-length"
      v-model="investmentLength"
      type="number"
      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
    >
      <span class="text-gray-500 sm:text-sm">Years</span>
    </div>
  </div>
  <button
    class="mt-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    @click.prevent="nextPage"
    v-if="canMoveOn"
  >Next</button>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    savingReason: { type: String, required: true },
  },
  emits: {
    moveOn: null,
    giveInvestmentLength: ({ investmentLength }) => {
      if (investmentLength) {
        return true;
      }
      return false;
    },
  },
  setup(props, { emit }) {
    const canMoveOn = ref(false);
    const investmentLength = ref(0);
    watch(investmentLength, (newLength) => {
      emit('giveInvestmentLength', { investmentLength: newLength });
      if (newLength > 0) {
        canMoveOn.value = true;
      }
    });
    function nextPage() {
      emit('moveOn', { canMoveOn });
    }
    return { nextPage, canMoveOn, investmentLength };
  },
};
</script>

<style>
</style>
