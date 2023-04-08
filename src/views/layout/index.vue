<template>
  <div class="portal">
    <Navbar />
    <div class="main">
      <div class="sidebar">
        <el-menu
          :uniqueOpened="true"
          default-active="dashboard"
          class="el-menu-sidebar-menu"
          background-color="#0d2439"
          text-color="#fff"
          active-text-color="#69B3FF"
          :collapse="isCollapse"
          :router="true"
        >
          <template v-for="(item, index) in routes">
            <!-- 只有一个子路由 -->
            <el-menu-item
              v-if="(item.children.length === 1) & !item.hidden"
              :index="item.path"
              :key="item.name"
            >
              <i class="iconfont" :class="item.meta && item.meta.icon"></i>
              <span>{{ item.meta && item.meta.title }}</span>
            </el-menu-item>

            <!-- 多个子路由 -->
            <el-submenu
              v-if="(item.children.length > 1) & !item.hidden"
              :index="String(index)"
              :key="item.name"
            >
              <template #title>
                <i class="iconfont" :class="item.meta && item.meta.icon"></i>
                <span>{{ item.meta && item.meta.title }}</span>
              </template>
              <el-menu-item
                v-for="subitem in item.children.filter((item) => !item.hidden)"
                :index="`${item.path}/${subitem.path}`"
                :key="subitem.name"
                >{{ subitem.meta && subitem.meta.title }}</el-menu-item
              >
            </el-submenu>
          </template>

          <!-- <el-menu-item index="/dashboard">
            <i class="iconfont icon-panel"></i>
            <span>仪表盘</span>
          </el-menu-item>

          <el-submenu index="1">
            <template #title>
              <i class="iconfont icon-luyouqi"></i>
              <span>设备</span>
            </template>
            <el-menu-item index="/device/gateway">网关列表</el-menu-item>
            <el-menu-item index="/device/group">节点群组</el-menu-item>
            <el-menu-item index="/device/sensor">传感器列表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template #title>
              <i class="iconfont icon-shuju"></i>
              <span>数据</span>
            </template>
            <el-menu-item index="/data/list">数据列表</el-menu-item>
            <el-menu-item index="/data/view">数据图表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <i class="iconfont icon-signal"></i>
              <span>自定义类型</span>
            </template>
            <el-menu-item index="/measurement"
              >测量类型</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <i class="iconfont icon-anquan"></i>
              <span>安全</span>
            </template>
            <el-menu-item index="/security">API访问密钥</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template #title>
              <i class="iconfont icon-fyxx"></i>
              <span>计费</span>
            </template>
            <el-menu-item index="/fee/account">账户信息</el-menu-item>
            <el-menu-item index="/fee/recharge">充值记录</el-menu-item>
            <el-menu-item index="/fee/usage">使用记录</el-menu-item
            >
          </el-submenu>

          <el-submenu index="6">
            <template #title>
              <i class="iconfont icon-luyouqi"></i>
              <span>子帐号</span>
            </template>
            <el-menu-item index="/account/add">添加子账号</el-menu-item>
            <el-menu-item index="/account/list">子账号列表</el-menu-item>
          </el-submenu>
          
          <el-menu-item index="/demo">
            <i class="iconfont icon-panel"></i>
            <span>demo</span>
          </el-menu-item> 
          <el-menu-item index="/api/index">
            <i class="iconfont icon-panel"></i>
            <span>api</span>
          </el-menu-item> -->
        </el-menu>
        <span
          class="iconfont zhedieBtn"
          :class="{
            'icon-foldLeft': !isCollapse,
            'icon-foldRight': isCollapse,
          }"
          @click.stop="isCollapse = !isCollapse"
        ></span>
      </div>
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"; 
export default {
  name: "Home",
  components: { Navbar },
  data() {
    return {
      isCollapse: !true,
    };
  },
 
  computed: {
    routes() {  
      return this.$store.state.routes;
    },
  },
};
</script>

<style lang="less" scoped>
.portal {
  // display: flex;
  // flex-direction: column;
  height: 100%;
}

.main {
  height: calc(100% - 50px);
  flex-grow: 1;
  display: flex;

  .sidebar {
    // width: 167px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background: #0d2439;

    .el-menu-sidebar-menu {
      width: 167px;

      &.el-menu--collapse {
        width: auto;
      }
    }
    .iconfont {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }

    .el-submenu [class*="icon-"],
    .icon-panel {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }

    .zhedieBtn {
      color: #fff;
      margin: 0 0 20px 20px;
      cursor: pointer;
    }
  }
  .content {
    box-sizing: border-box;
    flex-grow: 1;
    padding: 10px; 
    overflow: auto;
  }
}
</style>
