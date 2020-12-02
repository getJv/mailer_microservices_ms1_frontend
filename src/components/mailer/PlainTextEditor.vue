<template>
  <v-textarea
    v-model="_text"
    outlined
    label="Message Body"
    placeholder="Message Body"
    full-width
    single-line
  ></v-textarea>
</template>

<script>
export default {
  name: "PlainText",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    _text: {
      get() {
        return this.text;
      },
      set(value) {
        this.$emit("update:text", value);
      },
    },
  },
};
</script>

<style></style>
