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
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title>Yakin hapus data {{ deleteItemObj.full_name }}?</v-card-title>
                  <v-card-action class="d-flex">
                    <v-spacer></v-spacer>

                    <v-btn color="primary" text @click="closeDelete">Batal</v-btn>
                    <v-btn color="error" text @click="deleteConfirm">Ok</v-btn>
                  </v-card-action>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn :to="`users/edit/${item._id}`" icon color="primary">
                <v-icon class="small">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="deleteItem(item)">
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
  middleware: ['authenticated'],
  head:{
    title: 'User'
  },
  data() {
    return {
      dialogDelete: false,
      alert: {
        show: false,
        type: '',
        message: ''
      },
      deleteItemObj: {},
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
    deleteItem(item) {
      this.dialogDelete = true;
      this.deleteItemObj = item;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteConfirm() {
      this.$axios.$delete(`/api/users/${this.deleteItemObj._id}`)
        .then(response => {
          this.alert.show = true;
          this.alert.type = 'success';
          this.alert.message = 'Berhasil hapus data';
          this.fetchUser();
        })
        .catch(err => {
          let message = err.response.data.message;
          this.alert.show = true;
          this.alert.type = 'error';
          this.alert.message = message;
        })
        .finally(() => {
          this.dialogDelete = false;
        });
    },
    fetchUser() {
      this.loading = true;
      this.users = [];
      const { page, itemsPerPage } = this.options
      this.$axios.$get(`/api/users?page=${page}&limit=${itemsPerPage}&search=${this.search}`)
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
    },
    alertFromRoute() {
      if (this.$route.params.message == 'UPDATE_SUCCESS') {
        this.alert.show = true;
        this.alert.type = 'success';
        this.alert.message = this.$t(this.$route.params.message, {
          title: 'user'
        });
      }
      else if (this.$route.params.message == "CREATE_SUCCESS") {
        this.showAlert(this.$t(this.$route.params.message, {
          title: 'user'
        }), this.$route.params.type ?? 'success');

      } else if (this.$route.params.message) {
        this.showAlert(this.$t(this.$route.params.message), this.$route.params.type ?? 'danger')
      }
    },
    showAlert(message, type) {
      this.alert.show = true;
      this.alert.type = type;
      this.alert.message = message;

    }
  },
  mounted() {
    this.fetchUser();
    this.alertFromRoute();
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
