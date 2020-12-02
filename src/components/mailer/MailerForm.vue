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
        <v-btn-toggle mandatory>
          <v-tooltip bottom v-for="item in editorOptions" :key="item.icon">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="_contentType = item.value"
              >
                <v-icon> {{ item.icon }} </v-icon>
              </v-btn>
            </template>
            <span>{{ item.tooltip }}</span>
          </v-tooltip>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" sm="8">
        <component :is="_contentType" :text.sync="_body" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn left color="orange" outlined>Send</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import richText from "./RichTextEditor";
import markdown from "./MarkdownEditor";
import plainText from "./PlainTextEditor";
export default {
  name: "MailerForm",
  components: {
    richText,
    markdown,
    plainText,
  },
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
          value: "richText",
          tooltip: "Html Editor",
        },
        {
          text: "Markdown",
          icon: "mdi-language-markdown",
          value: "markdown",
          tooltip: "Markdown",
        },
        {
          text: "Plain Text",
          icon: "mdi-signature-text",
          value: "plainText",
          tooltip: "Plain",
        },
      ],
    };
  },
};
</script>

<style></style>
