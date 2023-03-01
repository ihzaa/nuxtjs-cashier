<template>
  <v-row class="frame-content">
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>
          Register
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field :rules="rules.full_name" v-model="form.full_name" name="full_name" label="Full Name"
              type="text" />
            <v-text-field @keyup="checkEmail" :rules="rules.email" v-model="form.email" name="email" label="Email"
              type="email" />
            <v-text-field :rules="rules.password" v-model="form.password" name="password" label="Password"
              type="password" />
            <v-text-field :rules="rules.password_confirm" v-model="form.password_confirm" name="password_confirm"
              label="Re-type Password" type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="isDisabled" @click="onSubmit" color="primary">Register</v-btn>
        </v-card-actions>
      </v-card>
      <p>Sudah punya akun? <v-btn plain to="/login">Login</v-btn></p>
    </v-col>
</v-row>
</template>

<script>
export default ({
  data() {
    return {
      emailExist: false,
      isDisabled: false,
      form: {
        full_name: '',
        email: '',
        password: '',
        password_confirm: ''
      },
      rules: {
        full_name: [
          v => !!v || 'Fullname is required'
        ],
        email: [
          v => !!v || 'Email is required',
          v => /.+@+/.test(v) || 'Email invalid',
          // v => !this.emailExist || 'Email already in use',

        ],
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be at least 8 characters'
        ],
        password_confirm: [
          v => v === this.form.password || 'Passowrd confirm must be same as password',
        ]
      },
    }
  },
  methods: {
    checkEmail() {
      const email = this.form.email;
      if (/.+@+/.test(email)) {
        this.$axios.post('http://localhost:3002/api/auth/is-email-exist', { email })
          .then(response => {
            this.emailExist = false;
          }).catch(error => {
            this.emailExist = true;
          })
      }
    },
    onSubmit() {
      this.isDisabled = true;
      this.$axios.post('http://localhost:3002/api/auth/register', this.form)
        .then(response => {
          console.log(response);
          this.$router.push('/login');
        })
        .catch(err => {
          console.log(err);
          alert(err.message ?? 'Got some error!');
        }).finally(() => {
          this.isDisabled = false;
        })
    }
  }
})
</script>
