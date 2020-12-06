<template>
  <v-textarea
    v-model="fieldValue"
    outlined
    label="Message"
    placeholder="Message"
    full-width
    single-line
    :error-messages="fieldValueErrors"
    @input="$v.fieldValue.$touch()"
    @blur="$v.fieldValue.$touch()"
  ></v-textarea>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  name: "PlainText",
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
};
</script>

<style></style>
