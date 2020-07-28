import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/hello",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/",
      name: "D3Demo",
      component: () => import("@/components/d3Demo.vue")
    },
    {
      path: "/index",
      name: "Index",
      component: () => import("@/components/index.vue")
    },
    {
      path: "/chartsDemo",
      name: "ChartsDemo",
      component: () => import("@/components/03-chartsDemo.vue")
    },
    {
      path: "/chart",
      name: "Chart",
      component: () => import("@/components/04-chart.vue")
    }
  ]
});
