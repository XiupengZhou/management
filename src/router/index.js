import Vue from "vue";
import Router from "vue-router";
import store from "../store";
Vue.use(Router);
import Layout from "../views/layout/index.vue";
let isDev = process.env.NODE_ENV === 'development';

// 无需登录即可访问的路由
const initRoutes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
  },
];

export const adminRoutes = [
  // 仪表盘
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      icon: "icon-panel",
    },
    component: Layout,
    redirect: "/home/dashboard",
    children: [
      {
        path: "dashboard",
        name: "home-dashboard",
        meta: {
          title: "仪表盘",
        },
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "data",
        meta: { title: "设备数据" },
        name: "data-view",
        component: () => import("@/views/dashboard/data.vue"),
      },
    ],
  },
  // 设备
  {
    path: "/device",
    name: "device",
    meta: {
      title: "设备",
      icon: "icon-luyouqi",
    },
    component: Layout,
    children: [
      {
        path: "gateway",
        meta: { title: "网关" },
        name: "device-gateway",
        component: () => import("@/views/device/gateway.vue"),
      },
      {
        path: "group",
        meta: { title: "设备群组" },
        name: "device-group",
        component: () => import("@/views/device/group.vue"),
      },
      {
        path: "sensor",
        meta: { title: "传感器列表" },
        name: "device-sensor",
        component: () => import("@/views/device/sensor.vue"),
      },
      {
        path: "developkit",
        hidden: true,
        meta: { title: "开发套件" },
        name: "device-developkit",
        component: () => import("@/views/device/developKit.vue"),
      },
    ],
  }, 

  // 计费
  {
    path: "/fee",
    name: "fee",
    component: Layout,
    meta: { title: "计费", icon: "icon-fyxx" },
    redirect: "/fee/account",
    children: [
      {
        path: "account",
        meta: { title: "账户信息" },
        name: "fee-account",
        component: () => import("@/views/fee/account.vue"),
      },
      {
        path: "recharge",
        meta: { title: "充值记录" },
        name: "fee-recharge",
        component: () => import("@/views/fee/recharge.vue"),
      },
      {
        path: "usage",
        meta: { title: "使用记录" },
        name: "fee-usage",
        component: () => import("@/views/fee/usage.vue"),
      },
    ],
  },

  // 自定义类型
  {
    path: "/measurement",
    name: "measurement",
    component: Layout,
    redirect: "/measurement/list",
    meta: { title: "测量类型", icon: "icon-signal" },
    children: [
      {
        path: "add",
        meta: { title: "添加测量类型" },
        name: "measurement-add",
        component: () => import("@/views/measurement/add.vue"),
      },
      {
        path: "list",
        meta: { title: "测量类型列表" },
        name: "measurement-list",
        component: () => import("@/views/measurement/list.vue"),
      },
    ],
  },
];

export const superRoutes = [
  ...adminRoutes,
  // 以下是超级管理员才可以访问的路由
  {
    path: "/security",
    name: "security",
    component: Layout,
    redirect: "/security/list",
    meta: { title: "安全", icon: "icon-anquan" },
    children: [
      {
        path: "add",
        meta: { title: "添加密钥" },
        name: "security-add",
        component: () => import("@/views/security/add.vue"),
      },
      {
        path: "list",
        meta: { title: "密钥列表" },
        name: "security-list",
        component: () => import("@/views/security/list.vue"),
      },
    ],
  },
  {
    path: "/account",
    name: "account",
    component: Layout,
    meta: { title: "账号", icon: "icon-account" },
    children: [
      {
        path: "add",
        meta: { title: "添加账号" },
        name: "account-add",
        component: () => import("@/views/account/addAccount.vue"),
      },
      {
        path: "list",
        meta: { title: "账号列表" },
        name: "account-list",
        component: () => import("@/views/account/accountList.vue"),
      },
    ],
  },
  {
    path: "/server",
    name: "server",
    meta: {
      title: "server",
      icon: "icon-d-right-arrow",
    },
    hidden: isDev?false:true,
    component: Layout,
    redirect: "/server/index",
    children: [
      {
        path: "index",
        name: "server-index",
        component: () => import("@/views/server/index.vue"),
      },
    ],
  },

  {
    path: "/demo",
    name: "demo",
    meta: {
      title: "demo",
      icon: "icon-d-right-arrow",
    },
    hidden: isDev?false:true,
    component: Layout,
    redirect: "/demo/index",
    children: [
      {
        path: "index",
        name: "demo-index",
        component: () => import("@/views/demo/index.vue"),
      },
    ],
  },
];

// 最初的路由
const router = new Router({
  // mode: isDev?"history":"hash",
  mode: "history",
  routes: initRoutes,
});

// 路由白名单
const whiteList = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
  if (store.state.token) {
    //已经登录: 如果路由是 登录页，默认跳转到首页
    if (to.path == "/login") {
      next({
        path: "/home/dashboard",
      });
    } else {
      next();
    }
  } else {
    //没有登录,路由是否在白名单中
    if (whiteList.includes(to.path)) {
      //放行
      next();
    } else {
      //没在白名单
      next("/login");
    }
  }
});

export default router;
