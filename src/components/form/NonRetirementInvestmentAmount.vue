<template>
  <select
    v-model="pvType"
    class="mt-1 ml-8 block w-10/12 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="lump">lump sum</option>
    <option value="monthly">monthly installments</option>
  </select>
  <label
    v-if="pvType === 'lump'"
    for="investment-amount"
  >Enter lump sum investment amount</label>
  <label
    v-else
    for="investment-amount"
  >Enter monthy investment amount</label>
  <div class="ml-8 w-10/12 relative rounded-md shadow-sm">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <span class="text-gray-500 sm:text-sm">R</span>
    </div>
    <input
      id="investment-amount"
      name="investment-amount"
      v-model="investmentAmount"
      class="mt-1 block w-full py-2 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="0.00"
      type="number"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  emits: {
    giveNonRetirementInvestmentAmount: null,
    givePvType: null,
  },
  setup(props, { emit }) {
    const pvType = ref('monthly');
    const investmentAmount = ref(null);
    watch(investmentAmount, (newAmount) => {
      emit('giveNonRetirementInvestmentAmount', newAmount);
    });
    if (pvType.value) {
      emit('givePvType', pvType.value);
    } else {
      watch(pvType, (value) => {
        emit('givePvType', value);
      });
    }
    return { pvType, investmentAmount };
  },
};
</script>

<style>
</style>
