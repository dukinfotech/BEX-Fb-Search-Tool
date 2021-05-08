<template>
  <div>
    <q-form action="https://some-url.com" method="post" class="login-form text-center">
      <div class="form-title text-primary">Đăng nhập</div>
      <q-input filled dense label="Email" v-model="user.email"/>
      <q-input class="mt-10" filled dense label="Password" v-model="user.password" type="password"/>      
      <p class="text-negative mt-10">{{ message }}</p>
      <q-btn color="primary" label="Đăng nhập" @click="login()" :disabled="isRequesting"/>
    </q-form>
  </div>
</template>

<script>
import axios from 'axios';
const https = require('https');
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      message: '',
      isRequesting: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.running.isLoggedIn;
    },
  },
  methods: {
    login() {
      var email = this.user.email;
      var password = this.user.password;
      if (email.trim() && password.trim()) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (! emailRegex.test(email)) {
          this.message = 'Email không đúng định dạng';
        } else {
          this.message = '';
          this.isRequesting = true;

          axios({
            url: 'http://quasar.test/api/users/login',
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'json',
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
          })
          .then(() => {
            this.$store.commit('running/setIsLoggedIn', true);
            this.$router.push('/main');
          })
          .catch(() => {
            this.message = 'Sai tên tài khoản hoặc mật khẩu'
          })
          .finally(() => {
            this.isRequesting = false;
          })
        }
      }
    }
  }
}
</script>


<style scoped>
  .form-title {
    padding-bottom: 10px;
    font-size: 17px;
    text-align: center;
  }

  .login-form {
    width: 50%;
    margin: 0 auto;
    transform: translateY(30vh);
  }

  .mt-10 {
    margin-top: 10px;
  }
</style>