<template>
  <v-row class="frame-content">
    <v-col cols="10" offset="1">
      <v-card class="my-3">
        <v-toolbar color="primary" dark>
          Users
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="search" single-line hide-details></v-text-field>
        </v-toolbar>
        <v-card-text>
          <v-alert v-if="alert.show" :type="alert.type">{{ alert.message }}</v-alert>
          <div class="d-flex mb-4">
            <v-breadcrumbs :items="breadcrumbs" class="pa-0" />
            <v-spacer></v-spacer>
            <v-btn to="/users/create" color="primary" elevation="3" small>
              User <v-icon right>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
          <v-data-table :headers="headers" :items-per-page="10" :items="users" :server-items-length="totalData"
            :footer-props="{
              itemsPerPageOptions: [10, 20, 30, 40, 50]
            }" :options.sync="options" :loading="loading" :search.sync="search">
            <template v-slot:item.action="{ item }">
              <v-btn :to="`users/edit/${item._id}`" icon color="primary">
                <v-icon class="small">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error">
                <v-icon class="small">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
</v-row>
</template>

<script>

export default {
  data() {
    return {
      alert: {
        show: false,
        type: '',
        message: ''
      },
      search: '',
      loading: false,
      options: {},
      totalData: 0,
      breadcrumbs: [
        {
          text: 'Users',
          disabled: true,
          to: '/users'
        }
      ],
      users: [],
      headers: [{
        text: '#',
        value: 'row',
        sortable: false
      },
      {
        text: 'Fullname',
        value: 'full_name',
        sortable: false
      },
      {
        text: 'Email',
        value: 'email',
        sortable: false
      },
      {
        text: 'Role',
        value: 'role',
        sortable: false
      },
      {
        text: 'act',
        value: 'action',
        sortable: false
      },
      ]
    }
  },
  methods: {
    fetchUser() {
      this.loading = true;
      this.users = [];
      const { page, itemsPerPage } = this.options
      this.$axios.$get(`http://localhost:3001/api/users?page=${page}&limit=${itemsPerPage}&search=${this.search}`)
        .then(response => {
          this.users = response.data
          this.totalData = response.meta.total

          let startItem = (page - 1) * itemsPerPage;
          this.users.map((user) => user.row = ++startItem)
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        })
    }
  },
  mounted() {
    this.fetchUser()
    if (this.$route.params.message == 'UPDATE_SUCCESS') {
      this.alert.show = true;
      this.alert.type = 'success';
      this.alert.message = this.$t(this.$route.params.message, {
        title: 'user'
      });
    }
    else if (this.$route.params.message == "CREATE_SUCCESS") {
      this.alert.show = true;
      this.alert.type = 'success';
      this.alert.message = this.$t(this.$route.params.message, {
        title: 'user'
      });
    } else if (this.$route.params.message) {
      this.alert.show = true;
      this.alert.type = this.$route.params.type ?? 'danger';
      this.alert.message = this.$t(this.$route.params.message);
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchUser()
      },
      deep: true
    },
    search: {
      handler() {
        this.fetchUser()
      }
    }
  }
}

</script>
