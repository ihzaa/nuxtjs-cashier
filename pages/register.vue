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
          <v-btn :disabled="isDisabled" @click="onSubmit" color="primary">
            <span v-if="!isDisabled">Register</span>
            <v-progress-circular v-if="isDisabled" color="primary" indeterminate></v-progress-circular></v-btn>
        </v-card-actions>
      </v-card>
      <p>Sudah punya akun? <v-btn plain to="/login">Login</v-btn></p>
    </v-col>
</v-row>
</template>

<script>
export default ({
  middleware: ['unauthenticated'],
  head:{
    title: 'Logout'
  },
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
          v => !!v || this.$t('FIELD_REQUIRED', { field: 'Nama Lengkap' })
        ],
        email: [
          v => !!v || this.$t('FIELD_REQUIRED', { field: 'Email' }),
          v => /.+@+/.test(v) || 'Email invalid',
          // v => !this.emailExist || 'Email already in use',

        ],
        password: [
          v => !!v || this.$t('FIELD_REQUIRED', { field: 'Password' }),
          v => v.length >= 8 || this.$t('FIELD_MIN', { field: 'Password', min: 8 })
        ],
        password_confirm: [
          v => v === this.form.password || this.$t('FIELD_CONFIRM', { field: 'Password Konfirmasi', target: 'Password' }),
        ]
      },
    }
  },
  methods: {
    checkEmail() {
      const email = this.form.email;
      if (/.+@+/.test(email)) {
        this.$axiosAuth.post('/api/auth/is-email-exist', { email })
          .then(response => {
            this.emailExist = false;
          }).catch(error => {
            this.emailExist = true;
          })
      }
    },
    onSubmit() {
      this.isDisabled = true;
      this.$axiosAuth.post('/api/auth/register', this.form)
        .then(response => {
          this.$router.push('/login');
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
        }).finally(() => {
          this.isDisabled = false;
        })
    }
  }
})
</script>
