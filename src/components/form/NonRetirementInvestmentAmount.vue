<template>
  <select
    v-model="questionaire.pvType"
    @change="processReason"
    class="mt-1 ml-8 block w-10/12 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="lump">lump sum</option>
    <option value="monthly">monthly installments</option>
  </select>
  <label
    v-if="questionaire.pvType === 'lump'"
    for="investment-amount"
  >Enter lump sum investment amount</label>
  <label
    v-else
    for="investment-amount"
  >Enter monthy investment amount</label>
  <div class="ml-16 w-8/12 relative rounded-md shadow-sm">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <span class="text-gray-500 sm:text-sm">R</span>
    </div>
    <input
      id="investment-amount"
      name="investment-amount"
      v-model="questionaire.investmentAmount"
      @change="processReason"
      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
      placeholder="0.00"
      type="number"
    />
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
