import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/content" },
  {
    path: "/valid",
    name: "valid",
    component: () => import("../components/Valid.vue"),
  },
  {
    path: "/content",
    name: "content",
    component: () => import("../components/Content.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

import { getToken } from "./token";

router.beforeEach((to, _, next) => {
  if (to.name !== "valid" && !getToken()) next({ name: "valid" });
  else next();
});

export default router;
