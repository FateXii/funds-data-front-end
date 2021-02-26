<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h4>{{goal.name}}</h4>-
        <h4>Goal Amount</h4>
        <p>R {{goal.investmentGoal}}</p>
        <p v-if="goal.description">{{goal.description}}</p>
      </div>
    </template>
    <div>
      <h5>Investing</h5>
      <span
        v-if="goal.investmentAmount.principle"
      >R{{goal.investmentAmount.principle}} Ininital investment</span>
      <br />
      <span
        v-if="goal.investmentAmount.installment"
      >R{{goal.investmentAmount.installment}} p/m</span>

      <h5>Investing for:</h5>
      <p>{{goal.length}} years</p>
    </div>
    <div class="unit-trust">
      <el-select
        v-model="chosenTrustIsin"
        placeholder="Choose an investment"
      >
        <el-option
          v-for="trust in trusts"
          :key="trust.name"
          :label="trust.name"
          :value="trust.isin"
        ></el-option>
      </el-select>
      <div
        class="investment-results"
        v-if="currentTrust !== undefined"
      >
        <h5>{{currentTrust.name}}</h5>
        Expected Return {{expectedReturn.toFixed(2)}}
      </div>
    </div>
  </el-card>
</template>
<script lang="ts">
import {
  defineComponent,
  /* eslint-disable-next-line no-unused-vars */
  PropType,
  onMounted,
  ref,
  watch,
} from 'vue';

import unitTrusts from '@/assets/data.json';
import { FVwithInstallments } from '@/assets/services';

export default defineComponent({
  props: {
    goal: {
      type: Object as PropType<InvestmentGoal>,
      required: true,
    },
  },

  setup(props) {
    const chosenTrustIsin = ref<string | undefined>(undefined);
    const trusts = ref<Array<any>>([]);

    function getTrusts() {
      trusts.value = unitTrusts.filter(
        (trust: any) => (props.goal.investmentAmount.principle
            && trust.minimum_investment
              <= props.goal.investmentAmount.principle)
          || (props.goal.investmentAmount.installment
            && trust.minimum_monthly <= props.goal.investmentAmount.installment),
      );
    }
    onMounted(() => {
      getTrusts();
    });
    /* const return = ref<number | undefined>(undefined); */
    const currentTrust = ref<any>(undefined);
    const expectedReturn = ref(0);
    function getSelectedUnitTrust(isin: string): any {
      return trusts.value.find((trust) => trust.isin === isin);
    }
    watch(chosenTrustIsin, (value) => {
      currentTrust.value = getSelectedUnitTrust(value || '');
      const returns = currentTrust.value ? currentTrust.value.lump_returns : {};
      Object.keys(returns).every((period) => {
        if (returns[period] !== null) {
          expectedReturn.value = FVwithInstallments(
            props.goal.investmentAmount.principle || 0,
            props.goal.investmentAmount.installment || 0,
            returns[period] / 100,
            0,
            props.goal.length,
          );
          return false;
        }
        return true;
      });
    });

    return {
      trusts,
      expectedReturn,
      chosenTrustIsin,
      currentTrust,
    };
  },
});
</script>
