<template>
  <label
    for="expected-retirement-annual-payment"
  >Enter expected annual retirement payout</label>

  <div class="ml-16 w-8/12 relative rounded-md shadow-sm">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <span class="text-gray-500 sm:text-sm">R</span>
    </div>
    <input
      id="expected-retirement-annual-payment"
      name="expected-retirement-annual-payment"
      v-model="expectedRetirement"
      type="number"
      class="mt-1 w-full pl-7 flex py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
  <label
    for="expected-length-of-payments"
  >How many years would you like to receive payment</label>

  <div class="ml-16 w-8/12 relative rounded-md shadow-sm">
    <input
      id="expected-length-of-payments"
      name="expected-length-of-payments"
      v-model="payoutLength"
      type="number"
      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
    >
      <span class="text-gray-500 sm:text-sm">Years</span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  emits: {
    givePayoutLength: null,
    giveExpectedRetirementPayOut: null,
  },
  setup(props, { emit }) {
    const expectedRetirement = ref(0.0);
    const payoutLength = ref(0);
    watch(expectedRetirement, (value) => {
      emit('giveExpectedRetirementPayOut', value);
    });
    watch(payoutLength, (value) => {
      emit('giveExpectedRetirementPayOut', value);
    });
    return {
      expectedRetirement,
      payoutLength,
    };
  },
};
</script>

<style>
</style>
