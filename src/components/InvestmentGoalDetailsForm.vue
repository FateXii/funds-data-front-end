<template>
  <div class="form-container">
    <el-form
      ref="investmentDetailsForm"
      :model="investmentGoalForm"
      :rules="investmentDetailFormValidation"
    >
      <el-form-item
        label="Investment name"
        prop="name"
      >
        <el-input v-model="investmentGoalForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Investment Description">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="What are you investing for?"
          v-model="investmentGoalForm.description"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Target amount"
        prop="investmentGoal"
      >
        <el-input
          v-model.number="investmentGoalForm.investmentGoal"
          placeholder="0.00"
        >
          <template #prepend>R</template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitInvestmentForm"
        >Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';

interface Data {
  [key: string]: unknown;
}

interface GoalIdentityPayload {
  name: string;
  description?: string;
  investmentGoal: number;
}

interface SetupContext {
  attrs: Data;
  slots?: unknown;
  emit: (event: 'setGoalIdentity', payload: GoalIdentityPayload) => void;
}

export default {
  emits: {
    setGoalIdentity(payload: GoalIdentityPayload) {
      return payload.name.length > 0 && payload.investmentGoal > 0;
    },
  },
  setup(props: Data, context: SetupContext) {
    const investmentGoalForm = reactive({
      name: '',
      description: '',
      investmentGoal: 0.0,
    });

    // Investment Details form
    const investmentDetailsForm = ref<any>(null);
    const investmentDetailFormValidation = {
      name: [
        {
          required: true,
          message: 'Please input a name for this investmet',
          trigger: 'blur',
        },
      ],
      investmentGoal: [
        {
          required: true,
          message: 'Please input an investment target',
          trigger: 'blur',
        },
        {
          type: 'number',
          message: 'This field should be a number',
        },
      ],
    };
    function submitInvestmentForm() {
      investmentDetailsForm.value.validate((valid: boolean) => {
        if (valid) {
          context.emit('setGoalIdentity', { ...investmentGoalForm });
        }
      });
    }
    return {
      submitInvestmentForm,
      investmentDetailsForm,
      investmentDetailFormValidation,
      investmentGoalForm,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
