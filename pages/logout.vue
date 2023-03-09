<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-card-text class="text-center">
          <h2>Logout <v-icon class="ml-3 spin-loading">mdi-loading</v-icon></h2>
        </v-card-text>
      </v-card>
    </v-col>
</v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: ['authenticated'],
  methods: {
    ...mapActions('auth', ['logout'])
  },
  mounted() {
    setTimeout(() => {
      this.logout()
      this.$router.push('/login')
    }, 3000);
  }
}
</script>
