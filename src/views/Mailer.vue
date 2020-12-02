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
import MailerForm from "../components/mailer/MailerForm";
import MailerReport from "../components/mailer/MailerReport";
export default {
  name: "MailerView",
  components: {
    MailerForm,
    MailerReport,
  },
  data() {
    return {
      recipients: "",
      title: "",
      contentType: "",
      body: "",
    };
  },
};
</script>

<style></style>
