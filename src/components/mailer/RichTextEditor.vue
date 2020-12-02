<template>
  <vue-editor v-model="_text" />
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "RichText",
  components: {
    VueEditor,
  },
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

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";
</style>
