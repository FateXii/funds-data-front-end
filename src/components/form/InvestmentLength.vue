<template>
  <div id="container">
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
    <div class="w-10/12 relative rounded-md shadow-sm">
      <input
        id="investment-length"
        name="investment-length"
        v-model="investmentLength"
        type="number"
        placeholder="0"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <span class="text-gray-500 sm:text-sm">Years</span>
      </div>
    </div>
    <Button
      @click.prevent="nextPage"
      v-if="canMoveOn"
    >Next</Button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import Button from './Button.vue';

export default {
  components: {
    Button,
  },
  props: {
    savingReason: { type: String, required: true },
  },
  emits: {
    moveOn: null,
    prevPage: null,
    giveInvestmentLength: ({ investmentLength }) => {
      if (investmentLength) {
        return true;
      }
      return false;
    },
  },
  setup(props, { emit }) {
    const canMoveOn = ref(false);
    const investmentLength = ref(null);
    watch(investmentLength, (newLength) => {
      emit('giveInvestmentLength', newLength);
      if (newLength) {
        canMoveOn.value = true;
      } else {
        canMoveOn.value = false;
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
      investmentLength,
    };
  },
};
</script>

<style scoped>
#container {
}
</style>
