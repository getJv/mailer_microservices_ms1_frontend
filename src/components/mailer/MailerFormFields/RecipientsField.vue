<template>
  <div>
    <v-text-field
      v-model="fieldValue"
      outlined
      label="To:"
      placeholder="Recipients"
      :error-messages="fieldValueErrors"
      @input="$v.fieldValue.$touch()"
      @blur="$v.fieldValue.$touch()"
    ></v-text-field>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "RecipientsFormField",
  props: {
    value: {
      required: true,
    },
  },
  mixins: [validationMixin],
  validations: {
    fieldValue: {
      required,
      email,
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
      !this.$v.fieldValue.email && errors.push("Invalid email.");
      return errors;
    },
  },
};
</script>

<style></style>
