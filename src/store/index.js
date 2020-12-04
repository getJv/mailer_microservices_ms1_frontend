import Vue from "vue";
import Vuex from "vuex";
import Mails from "./modules/mails";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Mails,
  },
});
