<template>
  <nav class="navbar">
    <div class="leftMenu">
      <img src="../assets/logo.png" />
    </div>
    <div class="rightMenu">
      <!-- <img src="../assets/flag.png" class="flag" /> -->

      <!-- <el-select v-model="value" placeholder="语言选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
     
      <span>{{ $store.state.userInfo.username }}({{ role }})</span>
       <img class="ml-5" style="height:30px;" src="@/assets/gita.gif" alt="">  
      <span class="line"></span>
      <!-- <span class="iconfont icon-screenfull"></span> -->
      <span class="logout" @click="logout">退出登录</span>
      <!-- <img class="langSelect" src="../assets/cn.png" /> -->
      <div class="lang rel">
        <span class="text abs"> {{ $i18n.locale }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  props: {
    userinfo: String,
  },
  data() {
    return {};
  },

  computed: {
    role() {
      let obj = {
        1: "超级管理员",
        2: "管理员",
        3: "观察员",
      };
      let type = this.$store.state.userInfo.type;
      return obj[type];
    },
  },

  methods: {
    logout() {
      this.$store.commit("set_userInfo", {});
      this.$store.commit("set_token", "");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.leftMenu {
  height: 100%;
  display: flex;
  align-items: center;

  > img {
    height: 35px;
    width: auto;
    margin-left: 15px;
  }
}

.rightMenu {
  display: flex;
  align-items: center;
  // padding-right: 50px;
  .lang {
    width: 0;
    height: 0;
    border: 25px solid #014ff7;
    border-bottom-color: transparent;
    border-left-color: transparent;
    .text {
      font-size: 20px;
      top: -24px;
      left: 0;
      color: #fff;
    }
  }

  .flag {
    height: 30px;
    width: auto;
    margin-right: 10px;
  }
  .logout {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 10px;
  }

  .line {
    height: 16px;
    width: 1px;
    background: rgba(90, 88, 88, 0.36);
    margin-left: 10px;
  }
  .icon-screenfull {
    font-size: 22px;
    margin: 0 10px;
  }
  .langSelect {
    height: 50px;
    width: auto;
  }
}
</style>
