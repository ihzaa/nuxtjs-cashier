<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="my-3">
        <v-toolbar color="primary" dark>
          Users
        </v-toolbar>
        <v-card-text>
          <div class="mb-4">
            <v-breadcrumbs :items="breadcrumbs" class="pa-0" />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
</v-row>
</template>

<script>

export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Users',
          disabled: true,
          to: '/users'
        }
      ]
    }
  }
}

</script>
