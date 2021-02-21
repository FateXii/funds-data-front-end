<template>
  <el-container>
    <el-main>
      <div class="create-goal-progress-bar">
        <el-steps
          :active="formState.step"
          finish-status="success"
        >
          <el-step title="Investment Goal"></el-step>
          <el-step title="Step 2"></el-step>
          <el-step title="Step 3"></el-step>
        </el-steps>
      </div>
      <div>
        <el-form
          ref="investmentDetailsForm"
          :model="investmentGoalForm"
          :rules="investmentDetailFormValidation"
          v-if="formState.step === 0"
        >
          <div class="form-step-section">
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
          </div>
        </el-form>
        <el-form
          ref="investmentContributionsForm"
          :model="investmentGoalForm"
          :rules="investmentContributionsFormValidation"
          v-else-if="formState.step === 1"
        >
          <div class="form-step-section">
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
                  v-model.number="investmentGoalForm.investmentAmount.principle"
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
                  v-model.number="investmentGoalForm.investmentAmount.installment"
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
                v-model.number="investmentGoalForm.length"
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
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const investmentGoalForm = reactive<InvestmentGoal>({
      id: -1,
      name: '',
      description: '',
      investmentGoal: 0.0,
      investmentAmount: {
        principle: 0.0,
        installment: 0.0,
      },
      length: 0,
    });
    const store = useStore();
    const addToGoalsList = () => {
      const id = store.getters.getLength;
      store.commit('addInvestmentGoal', {
        ...investmentGoalForm,
        id,
      });
    };
    const formState = reactive({
      step: 0,
    });
    function changeFormState() {
      formState.step = (formState.step + 1) % 2;
    }

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
        //       {
        //       min: 0,
        //     message: 'The value in this field cannot be less than zero',
        // },
      ],
    };
    function submitInvestmentForm() {
      investmentDetailsForm.value.validate((valid: boolean) => {
        if (valid) {
          changeFormState();
        }
      });
    }

    // Investment contributions form
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
          investmentGoalForm.investmentAmount.principle !== 0
          || investmentGoalForm.investmentAmount.installment !== 0
        );
        if (valid) {
          if (!invalidContributions.value) {
            addToGoalsList();
            router.push('dashboard');
          }
        }
      });
    };

    // Internal component state

    return {
      investmentGoalForm,
      addToGoalsList,
      investmentDetailsForm,
      investmentContributionsForm,
      investmentDetailFormValidation,
      formState,
      investmentContributionsFormValidation,
      submitInvestmentForm,
      submitContibutions,
      invalidContributions,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  align-items: center;
}
.form-step-section {
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 1px 1px 8px black;
  width: 40%;
}
</style>
