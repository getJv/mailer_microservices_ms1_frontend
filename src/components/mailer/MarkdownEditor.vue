<template>
  <v-md-editor v-model="_text" height="400px"></v-md-editor>
</template>

<script>
export default {
  name: "MarkdownEditor",
  props: {
    text: {
      type: String,
      required: false,
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
  data() {
    return {};
  },
};
</script>

<style></style>
