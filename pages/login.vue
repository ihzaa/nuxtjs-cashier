<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>
          Login
        </v-toolbar>
        <v-card-text>
          <v-alert v-if="error_message != ''" class="red ligthen-2" dark>
            {{ $t(error_message) }}
          </v-alert>
          <v-form>
            <v-text-field :rules="rules.email" v-model="form.email" name="email" label="Email" type="email" />
            <v-text-field name="password" label="Password" type="password" v-model="form.password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="isDisabled" color="primary" @click="onSubmit">
            <span v-if="!isDisabled">Login</span>
            <v-progress-circular v-if="isDisabled" color="primary" indeterminate></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>Belum punya akun? <v-btn plain to="/register">Register</v-btn></p>
    </v-col>
</v-row>
</template>

<script>
import { mapActions } from 'vuex';


export default ({
  middleware: ['unauthenticated'],
  data() {
    return {
      error_message: '',
      isDisabled: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          v => !!v || 'Email is required',
          v => /.+@+/.test(v) || 'Email invalid',

        ],
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be at least 8 characters'
        ],

      },
    }
  },
  mounted() {
    if (this.$route.params.message) {
      this.error_message = this.$route.params.message;
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    storeWelcomeScreen() {
      localStorage.setItem("welcomeScreen", true);
    },
    onSubmit() {
      this.isDisabled = true;
      this.error_message = '';
      this.$axios.post('http://localhost:3002/api/auth/login', this.form)
        .then(response => {
          if (!localStorage.welcomeScreen) {
            this.storeWelcomeScreen();
          }
          this.login({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            fullname: response.data.fullname
          })
          this.$router.push('/dashboard');
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data) {
              this.error_message = err.response.data.message ?? '';
            }
          }
          if (!this.error_message) {
            this.error_message = err;
          }
        })
        .finally(() => {
          this.isDisabled = false;
        })
    }
  }
})
</script>
