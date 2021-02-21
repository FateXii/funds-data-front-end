<template>
  <div class="form-container">
    <el-form
      :model="authFormData"
      :rules="validationRules"
      ref="authForm"
    >
      <div class="inline-form-items">
        <el-form-item
          label="Name"
          prop="name"
        >
          <el-input v-model="authFormData.name"></el-input>
        </el-form-item>
        <el-form-item
          label="Surname"
          prop="surname"
        >
          <el-input v-model="authFormData.surname"></el-input>
        </el-form-item>
      </div>
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input v-model="authFormData.email"></el-input>
      </el-form-item>
      <el-form-item
        label="Phone number"
        prop="phonenumber"
      >
        <el-input v-model="authFormData.phonenumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="login"
        >Authenticate</el-button>
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
      loggedIn: false,
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
  padding: 1em;
  border-radius: 0.5em;
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
