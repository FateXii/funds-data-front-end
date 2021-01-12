<template>
  <div class="field">
    <dt class="field-heading">Trust Name</dt>
    <dd class="field-value">{{trust.name}}</dd>
  </div>
</template>

<script>
export default {
  props: {
    trust: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
.field {
  @apply bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
}
.field-heading {
  @apply text-sm font-medium text-gray-500;
}
.field-value {
  @apply mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2;
}
</style>
