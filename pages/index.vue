<template>
  <v-row>
    <v-col cols="8" class="frame-content">
      <product></product>
    </v-col>
    <v-col cols="4" class="frame-content white">
      <order></order>
    </v-col>
</v-row>
</template>

<script>
export default {
  middleware: ['authenticated'],
  name: 'IndexPage',
  head:{
    title: 'App'
  }
}
</script>

<style scoped></style>
