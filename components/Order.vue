<template>
  <v-row>
    <v-col cols="12">
      <h2>Order</h2>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ currency(item.price) }}
              <v-btn @click="decrementItem(item.id)" icon color="primary" class="px-0" x-small>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn @click="incrementItem(item.id)" icon color="primary" class="px-0" x-small>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-action :name="index">
            <v-btn @click="removeItem(item.id)" icon color="error" x-small>
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
            <v-list-item-title>{{ currency(itemTotal(item.price, item.quantity)) }}</v-list-item-title>
          </v-list-action>
        </v-list-item>
        <v-list-item v-if="items.length" class="text-h6 black-text grey lighten-2">
          <v-list-item-content>
            <v-list-item-title>Sub Total</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>
              {{ subTotal }}
            </v-list-item-title>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>
</v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  methods: {
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
    ...mapActions('carts', {
      decrementItem: 'decrementItem',
      incrementItem: 'incrementItem',
      removeItem: 'removeItem',
    })
  },
  computed: {
    // ...mapState('carts', {
    //   items: 'items'
    // }),
    ...mapGetters('carts', {
      items: 'cartItems',
      itemTotal: 'itemTotal',
      subTotal: 'subTotal'
    })
  }
}
</script>
