<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>
          Dashboard
        </v-toolbar>
        <v-card-text>
          <h2>Hello kamu {{ authenticated }}</h2>
        </v-card-text>
      </v-card>
    </v-col>
</v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default ({
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated'
    })
  },
  mounted() {
    console.log(this.$router);
    if (!this.authenticated) {
      this.$router.push({
        name: 'login',
        params: { message: 'AUTH_REQUIRED' }
      });
    }
  }
})
</script>
