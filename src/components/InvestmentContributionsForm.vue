<template>
  <div class="form-container">
    <el-form
      ref="investmentContributionsForm"
      :model="contributionsForm"
      :rules="investmentContributionsFormValidation"
    >
      <el-form-item>
        <el-alert
          title="Enter at least one amount"
          type="error"
          show-icon
          v-if="invalidContributions"
        ></el-alert>
      </el-form-item>
      <el-form-item
        class="investment-amount-input"
        label="Investment amount"
      >
        <el-form-item prop="numberInput">
          <el-input
            v-model.number="contributionsForm.investmentAmount.principle"
            placeholder="0.00"
            style="margin-bottom:.5em"
          >
            <template #prepend>R</template>
            <template #append>Initial Lump sum</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="numberInput">
          <el-input
            placeholder="0.00"
            v-model.number="contributionsForm.investmentAmount.installment"
            style="margin-top:.5em"
          >
            <template #prepend>R</template>
            <template #append>Monthly payment</template>
          </el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item
        prop="numberInput"
        label="How long would you like to invest"
      >
        <el-input
          placeholder="0"
          v-model.number="contributionsForm.length"
        >
          <template #append>Years</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitContibutions"
        >Get Investment Options</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref } from 'vue';

interface Data {
  [key: string]: unknown;
}

interface ContributionsPayload {
  investmentAmount: InvestmentAmount;
  length: number;
}

interface SetupContext {
  attrs: Data;
  slots?: unknown;
  emit: (event: 'setContribution', payload: ContributionsPayload) => void;
}

export default {
  emits: {
    setContribution(payload: ContributionsPayload) {
      return (
        ((payload.investmentAmount.principle
          && payload.investmentAmount.principle > 0)
          || (payload.investmentAmount.installment
            && payload.investmentAmount.installment > 0))
        && payload.length > 0
      );
    },
  },
  setup(props: Data, context: SetupContext) {
    // Investment contributions form
    const contributionsForm = reactive({
      investmentAmount: {
        principle: 0.0,
        installment: 0.0,
      },
      length: 0,
    });
    const investmentContributionsForm = ref<any>(null);
    const investmentContributionsFormValidation = {
      numberInput: [
        {
          type: 'number',
          message: 'This field should contain a number',
        },
        {
          min: 0,
          message: 'This field should have a minimum of 0',
        },
      ],
    };
    const invalidContributions = ref(false);

    const submitContibutions = () => {
      investmentContributionsForm.value.validate((valid: boolean) => {
        invalidContributions.value = !(
          contributionsForm.investmentAmount.principle !== 0
          || contributionsForm.investmentAmount.installment !== 0
        );
        if (valid) {
          if (!invalidContributions.value) {
            context.emit('setContribution', contributionsForm);
          }
        }
      });
    };
    return {
      contributionsForm,
      submitContibutions,
      invalidContributions,
      investmentContributionsForm,
      investmentContributionsFormValidation,
    };
  },
};
</script>
