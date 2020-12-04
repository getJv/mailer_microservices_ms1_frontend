<template>
  <v-card outlined class="pa-12">
    <alert :alert="$store.getters.alertMail" />
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="recipients"
          outlined
          label="To:"
          placeholder="Recipients"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="title"
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
        <component :is="contentType" :text.sync="body" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn left color="orange" outlined @click="save">Send</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import richText from "./RichTextEditor";
import markdown from "./MarkdownEditor";
import plainText from "./PlainTextEditor";
import Alert from "../widgets/Alert";
export default {
  name: "MailerForm",
  components: {
    richText,
    markdown,
    plainText,
    Alert,
  },
  methods: {
    save() {
      //validations goes here

      const newMail = {
        recipients: this.recipients,
        title: this.title,
        contentType: this.content_type,
        body: this.body,
      };
      this.$store.dispatch("createMail", newMail);
    },
  },

  data() {
    return {
      recipients: "",
      title: "",
      contentType: "richText",
      body: "",

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
