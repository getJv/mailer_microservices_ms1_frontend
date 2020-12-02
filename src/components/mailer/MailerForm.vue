<template>
  <v-card outlined class="pa-12">
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="_recipients"
          outlined
          label="To:"
          placeholder="Recipients"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="_title"
          outlined
          :counter="150"
          label="Title:"
          placeholder="Message Title"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn-toggle v-model="_contentType" mandatory>
          <v-tooltip bottom v-for="item in editorOptions" :key="item.value">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                <v-icon> {{ item.icon }} </v-icon>
              </v-btn>
            </template>
            <span>{{ item.tooltip }}</span>
          </v-tooltip>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" sm="8">
        <v-textarea
          v-model="_body"
          outlined
          label="Message Body"
          placeholder="Message Body"
          full-width
          single-line
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn left color="orange" outlined>Send</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "MailerForm",
  props: {
    recipients: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  computed: {
    _recipients: {
      get() {
        return this.recipients;
      },
      set(value) {
        this.$emit("update:recipients", value);
      },
    },
    _title: {
      get() {
        return this.title;
      },
      set(value) {
        this.$emit("update:title", value);
      },
    },
    _contentType: {
      get() {
        return this.contentType;
      },
      set(value) {
        this.$emit("update:contentType", value);
      },
    },
    _body: {
      get() {
        return this.body;
      },
      set(value) {
        this.$emit("update:body", value);
      },
    },
  },
  data() {
    return {
      editorOptions: [
        {
          text: "HTML",
          icon: "mdi-microsoft-word",
          value: "1",
          tooltip: "Html Editor",
        },
        {
          text: "MarkDown",
          icon: "mdi-language-markdown",
          value: "2",
          tooltip: "Markdown",
        },
        {
          text: "Plain Text",
          icon: "mdi-signature-text",
          value: "3",
          tooltip: "Plain",
        },
      ],
    };
  },
};
</script>

<style></style>
