<template>
  <div>
    <label
      class="block text-sm font-medium text-gray-700"
      for="saving-goal"
    >I would like to save for?</label>
    <select
      id="saving-goal"
      name="saving-goal"
      v-model="questions.savingReason"
      class="mt-1 ml-8 block w-10/12 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="retirement">Retirement</option>
      <option value="childs_education">Childs Education</option>
      <option value="other">Other</option>
    </select>

    <div v-if="reasonNeeded">
      <label for="saving-reason">Please specify</label>
      <input
        id="saving-reason"
        class="mt-1 ml-8 block w-10/12 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        name="saving-reason"
        v-model="questions.reasonStated"
      />
    </div>
    <button
      class="mt-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click.prevent="nextPage"
      v-if="canMoveOn"
    >Next</button>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';

export default {
  emits: {
    giveReason: ({ reasonStated, savingReason }) => {
      if (savingReason !== '' || reasonStated !== '') {
        return true;
      }
      console.warn('You need a saving reason');
      return false;
    },
    moveOn: null,
  },
  setup(props, { emit }) {
    const questions = reactive({
      reasonStated: '',
      savingReason: '',
    });
    function processReason() {
      emit('giveReason', {
        reasonStated: questions.reasonStated,
        savingReason: questions.savingReason,
      });
    }
    const reasonNeeded = ref(false);
    const canMoveOn = ref(false);
    watch(questions, (reason) => {
      reasonNeeded.value = reason.savingReason === 'other';

      emit('giveReason', {
        reasonStated: reason.reasonStated,
        savingReason: reason.savingReason,
      });
      canMoveOn.value = true;
    });
    function nextPage() {
      emit('moveOn', { canMoveOn });
    }
    return {
      questions,
      canMoveOn,
      processReason,
      reasonNeeded,
      nextPage,
    };
  },
};
</script>

<style>
</style>
