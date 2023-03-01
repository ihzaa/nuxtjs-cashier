<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>
          Login
        </v-toolbar>
        <v-card-text>
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
export default ({
  data() {
    return {
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
  methods: {
    storeWelcomeScreen() {
      localStorage.setItem("welcomeScreen", true);
    },
    onSubmit() {
      this.isDisabled = true;
      this.$axios.post('http://localhost:3002/api/auth/login', this.form)
        .then(response => {
          console.log(response);
          if (!localStorage.welcomeScreen) {
            this.storeWelcomeScreen();
          }
        })
        .catch(err => {
          console.log(err);
          alert(err.message ?? 'Got some error!');
        })
        .finally(() => {
          this.isDisabled = false;
        })
    }
  }
})
</script>
