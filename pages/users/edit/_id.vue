<template>
  <v-row class="frame-content">
    <v-col cols="10" offset="1">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>
          Edit User
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
          <v-btn :loading="isDisabled" @click="onSubmit" color="primary">
            <span>Update</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
</v-row>
</template>

<script>
export default ({
  middleware: ['authenticated'],
  asyncData({ params }) {
    return {
      id: params.id
    }
  },
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
          text: 'Edit',
          disabled: true,
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
          // v =>  !!v || this.$t('FIELD_REQUIRED', { field: 'Password' }),
          v => v.length == 0 || v.length >= 8 || this.$t('FIELD_MIN', { field: 'Password', min: 8 })
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
        this.$axios.post('/api/auth/is-email-exist', { email })
          .then(response => {
            this.emailExist = false;
          }).catch(error => {
            this.emailExist = true;
          })
      }
    },
    fetchData() {
      this.$axios.$get(`/api/users/${this.id}`)
        .then(response => {
          this.form.full_name = response.data.full_name;
          this.form.email = response.data.email;
          this.form.role = response.data.role;
        })
        .catch(err => {
          let message = err.response.data.message;
          this.$router.push({
            name: 'users___' + this.$i18n.locale,
            params: { message, type: 'error' }
          });
        });
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisabled = true;
        this.$axios.$put(`/api/users/${this.id}`, this.form)
          .then(response => {
            this.$router.push({
              name: 'users___' + this.$i18n.locale,
              params: { message: 'UPDATE_SUCCESS' }
            });
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
  },
  mounted() {
    this.fetchData();
  }
})
</script>
