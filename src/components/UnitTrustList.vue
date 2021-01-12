<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="heading">Suitable Trusts</h3>
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
          <UnitTrustItem :trust="trust" />
        </template>
      </dl>
    </div>
  </div>
</template>
<script>
import UnitTrustItem from './UnitTrustItem.vue';

export default {
  components: {
    UnitTrustItem,
  },
  props: {
    unitTrusts: {
      type: Array,
      required: true,
    },
  },
};
</script>>
<style lang="postcss">
.heading {
  @apply text-lg leading-6 font-medium text-gray-900;
}
</style>
