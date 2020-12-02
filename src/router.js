import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import Mailer from "./views/Mailer";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/mailer",
      component: Mailer,
    },
    {
      path: "*",
      component: Home,
    },
  ],
});
