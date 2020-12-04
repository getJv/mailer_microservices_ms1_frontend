import axios from "axios";

const state = {
  loadingMails: false,
  savingMail: false,
  mails: null,
  alertMail: {
    show: false,
    type: "",
    message: "",
  },
};

const getters = {
  mails: (state) => state.mails,
  loadingMails: (state) => state.loadingMails,
  savingMail: (state) => state.savingMail,
  alertMail: (state) => state.alertMail,
};

const actions = {
  async createMail({ commit }, newMail) {
    try {
      commit("setSavingMail", true);
      const url_path = process.env.VUE_APP_BACKEND_URI + "/mails";
      const { data } = await axios.post(url_path, newMail);
      commit("addMail", data);
      commit("setAlertMail", {
        show: true,
        type: "success",
        message: `Your e-mail was queued to delivery.`,
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
      commit("setAlertMail", {
        show: true,
        type: "error",
        message: msg,
      });
      console.log(err);
    } finally {
      commit("setSavingMail", false);
    }
  },
  async fetchMails({ commit }) {
    try {
      commit("setLoadingMails", true);
      const url_path = process.env.VUE_APP_BACKEND_URI + "/mails";
      const { data } = await axios.get(url_path);
      commit("setMails", data);
    } catch (error) {
      commit("setAlertMail", {
        show: true,
        type: "error",
        message: "Impossible to fetch the mail list. Try later",
      });
    } finally {
      commit("setLoadingMails", false);
    }
  },
  alertMail({ commit }, alert) {
    commit("setAlertMail", alert);
  },
  closeAlertMail({ commit }) {
    commit("setAlertMail", {
      show: false,
      type: "",
      message: "",
    });
  },
};

const mutations = {
  setAlertMail(state, value) {
    state.alertMail = value;
  },
  setLoadingMails(state, value) {
    state.loadingMails = value;
  },
  setLoadingMail(state, value) {
    state.loadingMail = value;
  },
  setSavingMail(state, value) {
    state.savingMail = value;
  },
  setMails(state, value) {
    state.mails = value;
  },
  addMail(state, value) {
    state.mails.data.push(value);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
