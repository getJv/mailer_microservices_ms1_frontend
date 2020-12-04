<template>
  <v-snackbar
    v-model="alert.show"
    :timeout="timeToClose"
    :color="alert.type"
    right
  >
    <div v-html="alert.message" />
  </v-snackbar>
</template>

<script>
export default {
  name: "alertComponent",
  props: {
    alert: {
      type: Object,
      required: true,
    },
    timeToClose: {
      type: Number,
      default: 8000,
    },
  },
};
</script>

<style></style>
