import store from "../store";
import router, { adminRoutes, superRoutes } from "./index";
// 添加权限路由
export default () => {
  let roleType = store.state.userInfo.type;
  if (roleType == 1) {
    router.addRoutes(superRoutes);
    store.commit("set_routes", superRoutes);
  } else {
    router.addRoutes(adminRoutes);
    store.commit("set_routes", adminRoutes);
  }
};
