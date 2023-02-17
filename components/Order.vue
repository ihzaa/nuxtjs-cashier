<template>
  <v-row>
    <v-col cols="12">
      <h2>Order</h2>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ currency(item.price) }} x {{ item.quantity }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-action>
            <v-list-item-title>{{ currency(itemTotal(item.price, item.quantity)) }}</v-list-item-title>
          </v-list-action>
        </v-list-item>
      </v-list>
    </v-col>
</v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  methods: {
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    }
  },
  computed: {
    // ...mapState('carts', {
    //   items: 'items'
    // }),
    ...mapGetters('carts', {
      items: 'cartItems',
      itemTotal: 'itemTotal',
    })
  }
}
</script>
