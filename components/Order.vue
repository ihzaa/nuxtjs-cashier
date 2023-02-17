<template>
  <div>
    {{ items }}
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    // ...mapState('carts', {
    //   items: 'items'
    // }),
    ...mapGetters('carts', {
      items: 'cartItems'
    })
  }
}
</script>
