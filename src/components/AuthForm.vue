<template>
  <div class="form-contaner">
    <el-form
      :model="authFormData"
      :rules="validationRules"
      ref="authForm"
    >
      <div class="inline-form-items">
        <el-form-item
          label="Name"
          v-model="authFormData.name"
          prop="name"
        >
          <el-input></el-input>
        </el-form-item>
        <el-form-item
          label="Surname"
          v-model="authFormData.surname"
          prop="surname"
        >
          <el-input></el-input>
        </el-form-item>
      </div>
      <el-form-item
        label="Email"
        v-model="authFormData.email"
        prop="email"
      >
        <el-input></el-input>
      </el-form-item>
      <el-form-item
        label="Phone number"
        v-model="authFormData.phonenumber"
        prop="phonenumber"
      >
        <el-input></el-input>
      </el-form-item>
      <el-form-item
        type="primary"
        @click="login"
      >
        <el-button></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const authFormData = reactive<User>({
      name: '',
      surname: '',
      email: '',
      phonenumber: '',
    });
    const authForm = ref<any>(null);
    const validationRules = {
      name: [
        { required: true, message: 'Please input a Name', trigger: 'blur' },
      ],
      surname: [
        { required: true, message: 'Please input a Surname', trigger: 'blur' },
      ],
      email: [
        {
          type: 'email',
          required: true,
          message: 'Please input a valid email address',
          trigger: 'blur',
        },
      ],
      phonenumber: [
        {
          required: true,
          message: 'Please input a phone number',
          trigger: 'blur',
        },
      ],
    };
    const login = () => {
      authForm.value.validate((valid: boolean) => {
        if (valid) {
          store.commit('login', authFormData);
        }
      });
    };
    return {
      validationRules,
      authForm,
      login,
      authFormData,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  box-shadow: 1px 1px 8px black;
}
.inline-form-items {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .el-form-item {
    width: 47.5%;
  }
}
.el-form-item {
  &__label {
    margin: 0;
    padding: 0 !important;
  }
}
</style>
