<template>
  <div class="trust-individual-returns">
    <div v-if="savingGoal">
      <p>You are saving for: {{savingGoal.reason}}</p>
      <div>
        <p>
          You have an initial investment of:
          {{savingGoal.initialInvestment}}
        </p>
        <p>
          With R{{savingGoal.monthlyInstallment}} as monthly installments,
          for {{savingGoal.investmentTime}} years.
        </p>
        <p>
          These are the estimated returns you would get
          with the each of the funds we represent.
        </p>
      </div>
    </div>
  </div>
  <div class>
    <div class>
      <h3 class="heading">Suitable Trusts</h3>
      <p class>These are the trusts that fit your requirements</p>
    </div>
    <div class>
      <div>
        <template
          v-for="trust in unitTrusts"
          :key="trust.name"
        >
          <UnitTrustItem
            :trust="trust"
            :savingGoal="savingGoal"
          />
        </template>
      </div>
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
    savingGoal: {
      type: Object,
      required: false,
    },

    unitTrusts: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.heading {
}
</style>
