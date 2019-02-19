import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Private from "./views/Private.vue";
import Commend from "./views/Commend.vue";
import Shopping from "./views/Shopping.vue";
import Hotal from "./views/Hotal.vue";
import UserCenter from "./views/UserCenter.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/userCenter",
      name: "userCenter",
      component: UserCenter
    },
    {
      path: "/hotal",
      name: "hotal",
      component: Hotal
    },
    {
      path: "/shopping",
      name: "shopping",
      component: Shopping
    },
    {
      path: "/commend",
      name: "commend",
      component: Commend
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/private",
      name: "private",
      component: Private
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
