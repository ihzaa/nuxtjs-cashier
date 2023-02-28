<template>
  <v-row class="frame-content">
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>
          Register
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="form.full_name" name="full_name" label="Full Name" type="text" />
            <v-text-field v-model="form.email" name="email" label="Email" type="email" />
            <v-text-field v-model="form.password" name="password" label="Password" type="password" />
            <v-text-field v-model="form.password_confirm" name="password_confirm" label="Re-type Password"
              type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onSubmit" color="primary">Register</v-btn>
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
      form: {
        full_name: '',
        email: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('http://localhost:3002/api/auth/register', this.form)
        .then(response => {
          console.log(response);
        })
    }
  }
})
</script>
