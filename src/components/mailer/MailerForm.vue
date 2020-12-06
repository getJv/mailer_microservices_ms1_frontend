<template>
  <v-card outlined class="pa-12">
    <alert :alert="$store.getters.alertMail" />
    <v-row align="start" justify="center">
      <v-col cols="12" sm="10">
        <RecipientField ref="recipientfield" :value.sync="recipients" />
      </v-col>
      <v-col cols="12" sm="10">
        <SubjectFormField ref="subjectField" :value.sync="subject" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn-toggle mandatory>
          <v-tooltip bottom v-for="item in editorOptions" :key="item.icon">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="contentType = item.value">
                <v-icon> {{ item.icon }} </v-icon>
              </v-btn>
            </template>
            <span>{{ item.tooltip }}</span>
          </v-tooltip>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" sm="10">
        <component :is="selectedEditor" :text.sync="body" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn
          left
          color="orange"
          outlined
          :loading="$store.getters.savingMail"
          @click="save"
          >Send it!</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Alert from "../widgets/Alert";
import richText from "./MailerFormFields/RichTextEditor";
import markdown from "./MailerFormFields/MarkdownEditor";
import plainText from "./MailerFormFields/PlainTextEditor";
import RecipientField from "./MailerFormFields/RecipientsField";
import SubjectFormField from "./MailerFormFields/SubjectFormField";
export default {
  name: "MailerForm",
  components: {
    richText,
    markdown,
    plainText,
    RecipientField,
    SubjectFormField,
    Alert,
  },
  computed: {
    selectedEditor() {
      const editor = this.editorsComponents.find(
        (i) => i.key === this.contentType
      ).component;
      return editor;
    },
  },
  methods: {
    save() {
      //validations goes here

      const newMail = {
        recipients: this.recipients,
        title: this.subject,
        content_type: this.contentType,
        body: this.body,
      };
      this.$store.dispatch("createMail", newMail);
    },
  },

  data() {
    return {
      recipients: "",
      subject: "",
      contentType: "text/html",
      body: "",

      editorOptions: [
        {
          text: "HTML",
          icon: "mdi-microsoft-word",
          value: "text/html",
          tooltip: "Html Editor",
        },
        {
          text: "Markdown",
          icon: "mdi-language-markdown",
          value: "text/markdown",
          tooltip: "Markdown",
        },
        {
          text: "Plain Text",
          icon: "mdi-signature-text",
          value: "text/plain",
          tooltip: "Plain",
        },
      ],
      editorsComponents: [
        {
          key: "text/html",
          component: "richText",
        },
        {
          key: "text/markdown",
          component: "markdown",
        },
        {
          key: "text/plain",
          component: "plainText",
        },
      ],
    };
  },
};
</script>

<style></style>
