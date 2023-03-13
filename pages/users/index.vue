<template>
  <v-row class="frame-content">
    <v-col cols="10" offset="1">
      <v-card class="my-3">
        <v-toolbar color="primary" dark>
          Users
        </v-toolbar>
        <v-card-text>
          <div class="mb-4">
            <v-breadcrumbs :items="breadcrumbs" class="pa-0" />
          </div>
          <v-data-table :headers="headers" :items-per-page="10" :items="users" />
        </v-card-text>
      </v-card>
    </v-col>
</v-row>
</template>

<script>
import { get } from 'http';


export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Users',
          disabled: true,
          to: '/users'
        }
      ],
      users: [],
      headers: [{
        text: 'Fullname',
        value: 'full_name'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Role',
        value: 'role'
      }]
    }
  },
  methods: {
    fetchUser() {
      this.$axios.$get(`http://localhost:3001/api/users`)
        .then(response => {
          console.log(response);
          this.users = response.data
          console.log(this.users);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    this.fetchUser()
  }
}

</script>
