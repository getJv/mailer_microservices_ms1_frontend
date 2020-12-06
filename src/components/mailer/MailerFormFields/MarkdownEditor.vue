<template>
  <div>
    <v-md-editor
      v-model="fieldValue"
      height="400px"
      :error-messages="fieldValueErrors"
      @input="$v.fieldValue.$touch()"
      @blur="$v.fieldValue.$touch()"
    ></v-md-editor>
    <div v-for="err in fieldValueErrors" :key="err" class="caption">
      <div class="red--text mt-2">{{ err }}</div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  name: "MarkdownEditor",

  props: {
    value: {
      required: true,
    },
  },
  mixins: [validationMixin],
  validations: {
    fieldValue: {
      required,
      maxLength: maxLength(100),
      minLength: minLength(10),
    },
  },
  computed: {
    fieldValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      },
    },
    fieldValueErrors() {
      const errors = [];
      if (!this.$v.fieldValue.$dirty) return errors;
      !this.$v.fieldValue.required && errors.push("Required field.");
      !this.$v.fieldValue.maxLength &&
        errors.push("Your message must have less than 100 letters.");
      !this.$v.fieldValue.minLength &&
        errors.push("Your message must have more than 10 letters.");
      return errors;
    },
  },

  data() {
    return {};
  },
};
</script>

<style></style>
