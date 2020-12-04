<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card min-height="400">
          <v-toolbar flat color="orange darken-3" dark>
            <v-toolbar-title>Mailer Tool</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>mdi-inbox</v-icon>
              Mailer Tool
            </v-tab>
            <v-tab>
              <v-icon left>mdi-history</v-icon>
              History Report
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  {{ body }}
                  <MailerForm
                    :recipients.sync="recipients"
                    :title.sync="title"
                    :contentType.sync="contentType"
                    :body.sync="body"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <MailerReport />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import MailerForm from "../components/mailer/MailerForm";
import MailerReport from "../components/mailer/MailerReport";
export default {
  name: "MailerView",
  components: {
    MailerForm,
    MailerReport,
  },
  methods: {
    async createMails(data) {
      try {
        this.creatingEmail = true;
        const url_path = process.env.VUE_APP_BACKEND_URI + "/mails";
        const res = await axios.post(url_path, data);
        commit("addGroup", res.data);
        commit("setAlertGroup", {
          show: true,
          type: "success",
          message: `O grupo: ${res.data.data.attributes.name} foi criado.`,
        });
      } catch (err) {
        let msg = err.message;
        if (err.response.status === 422) {
          const { title, detail, meta } = err.response.data.errors;
          msg = `<div class='caption'>${title}</div>`;
          msg += `<div>${detail}</div>`;
          msg += "<ul>";
          msg += Object.values(meta).map((item) => `<li>${item}</li>`);
          msg += "</ul>";
        }
        commit("setAlertGroup", {
          show: true,
          type: "error",
          message: msg,
        });
        console.log(err);
      } finally {
        commit("setSavingGroup", false);
      }
    },
  },
  data() {
    return {
      recipients: "",
      title: "",
      contentType: "richText",
      body: "",
    };
  },
};
</script>

<style></style>
