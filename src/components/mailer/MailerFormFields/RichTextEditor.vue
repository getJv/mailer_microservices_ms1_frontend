<template>
  <div>
    <vue-editor
      v-model="fieldValue"
      :error-messages="fieldValueErrors"
      @input="$v.fieldValue.$touch()"
      @blur="$v.fieldValue.$touch()"
    />
    <div v-for="err in fieldValueErrors" :key="err" class="caption">
      <div class="red--text mt-2">{{ err }}</div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  name: "RichText",
  components: {
    VueEditor,
  },
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
      minLength: minLength(17),
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

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";
</style>
