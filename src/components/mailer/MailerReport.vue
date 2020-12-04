<template>
  <div>MailerForm</div>
</template>

<script>
import axios from "axios";
export default {
  name: "MailerReport",
  methods: {
    async fetchMails() {
      try {
        this.loadingMails = true;
        const url_path = process.env.VUE_APP_BACKEND_URI + "/mails";
        this.emails = await axios.postGET(url_path);
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
        this.alert = {
          show: true,
          type: "error",
          message: msg,
        };
      } finally {
        this.loadingMails = true;
      }
    },
  },
};
</script>

<style></style>
