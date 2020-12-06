<template>
  <div>
    <v-text-field
      v-model="fieldValue"
      outlined
      :counter="100"
      label="Subject:"
      placeholder="Message Subject"
      :error-messages="fieldValueErrors"
      @input="$v.fieldValue.$touch()"
      @blur="$v.fieldValue.$touch()"
    ></v-text-field>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  name: "SubjectFormField",
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
      minLength: minLength(5),
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
        errors.push("Your subject has more than 100 letters.");
      !this.$v.fieldValue.minLength &&
        errors.push("Your subject need to have more than 5 letters.");
      return errors;
    },
  },
};
</script>

<style></style>
