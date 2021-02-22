<template>
  <el-container>
    <el-alert
      title="Please log in"
      type="info"
      show-icon
      center
      :closable="false"
    ></el-alert>
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
  </el-container>
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
.el-container {
  flex-direction: column;
  padding: 1.5em;
  .el-alert {
    margin-bottom: 2em;
  }
}
</style>
