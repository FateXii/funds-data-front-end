<template>
  <div class="input-group">
    <input
      id="investment-length"
      name="investment-length"
      v-model="investmentLength"
      type="number"
      class="input-numaric"
    />
    <div class="text-insert">
      <span class="text-gray-500 sm:text-sm">Years</span>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.input-group {
  @apply ml-8 w-10/12 relative rounded-md shadow-sm;
}
.input-numeric {
  @apply mt-1 block w-full py-2 px-3 border border-gray-300 bg-white
    rounded-md shadow-sm focus:outline-none focus:ring-indigo-500
    focus:border-indigo-500 sm:text-sm;
}
.text-insert {
  @apply absolute inset-y-0 right-0 pr-3 flex
    items-center pointer-events-none;
}
</style>
