<template>
  <v-row class="frame-content">
    <v-col cols="10" offset="1">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>
          Create User
        </v-toolbar>
        <v-card-text>
          <div class="d-flex mb-4">
            <v-breadcrumbs :items="breadcrumbs" class="pa-0" />
          </div>
          <v-alert v-if="error_message != ''" class="red ligthen-2" dark>
            {{ $t(error_message) }}
          </v-alert>
          <v-form ref="form">
            <v-text-field :rules="rules.full_name" v-model="form.full_name" name="full_name" label="Full Name"
              type="text" />
            <v-text-field :rules="rules.email" v-model="form.email" name="email" label="Email" type="email" />
            <v-text-field :rules="rules.password" v-model="form.password" name="password" label="Password"
              type="password" />
            <v-text-field :rules="rules.password_confirm" v-model="form.password_confirm" name="password_confirm"
              label="Re-type Password" type="password" />
            <v-select v-model="form.role" :items="roles" label="Role">
            </v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="isDisabled" @click="onSubmit" color="primary">
            <span v-if="!isDisabled">Save</span>
            <v-progress-circular v-if="isDisabled" color="primary" indeterminate></v-progress-circular></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
</v-row>
</template>

<script>
export default ({
  middleware: ['authenticated'],
  data() {
    return {
      error_message: '',
      emailExist: false,
      isDisabled: false,
      roles: ['employee', 'casher', 'admin'],
      breadcrumbs: [
        {
          text: 'Users',
          disabled: false,
          to: '/users',
          exact: true
        },
        {
          text: 'Create',
          disabled: true,
          to: '/users/create'
        },
      ],
      form: {
        full_name: '',
        email: '',
        password: '',
        password_confirm: '',
        role: ''
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
        ],
        role: [
          v => !!v || this.$t('FIELD_REQUIRED', { field: 'Role' })
        ]
      },
    }
  },
  methods: {
    checkEmail() {
      const email = this.form.email;
      if (/.+@+/.test(email)) {
        this.$axios.post('http://localhost:3001/api/auth/is-email-exist', { email })
          .then(response => {
            this.emailExist = false;
          }).catch(error => {
            this.emailExist = true;
          })
      }
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisabled = true;
        this.$axios.post('http://localhost:3001/api/users', this.form)
          .then(response => {
            this.$router.push('/users');
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
          });
      }
    }
  }
})
</script>
