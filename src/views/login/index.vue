<template>
  <div class="login">
    <!-- <Navbar /> -->
    <div class="content">
      <div class="popup">
        <img src="@/assets/cn.png" class="lang" />
        <img src="@/assets/logo.png" class="logo" />
        <div class="inputGroup" :class="{ inputError: uInputError.account }">
          <h2>{{ $t("lang.account") }}:</h2>
          <el-input
            v-model="uInput.account"
            placeholder="Email Address"
          ></el-input>
          <p class="errInfo" v-show="uInputError.account">
            请输入正确的用户名!
          </p>
        </div>
        <div class="inputGroup" :class="{ inputError: uInputError.password }">
          <h2>{{ $t("lang.password") }}:</h2>
          <el-input
            v-model="uInput.password"
            placeholder="Your Password"
            show-password
          ></el-input>
          <p class="errInfo" v-show="uInputError.password">
            {{ $t("lang.password") }}
          </p>
        </div>
        <router-link to="/" class="forgetPassword">{{
          $t("lang.forgetPassword")
        }}</router-link>
        <div class="yanZhengGroup">
          <h2>{{ $t("lang.sliderCheck") }}</h2>
          <div class="progressGroup"><Slider ref="slider"></Slider></div>
        </div>
        <el-button type="primary" class="loginBtn" @click.stop="loginClick">{{
          $t("lang.login")
        }}</el-button>
        <el-button type="primary" plain class="registerBtn">{{
          $t("lang.register")
        }}</el-button>
      </div>
    </div>

    <footer>
      <img src="@/assets/seeed.png" class="seeed" />
      <div class="copyright">
        <p>© 2008-2021 {{ $t("lang.compony") }}</p>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
          >粤ICP备13058720号</a
        >
      </div>
      <router-link to="">{{ $t("lang.privacy") }}</router-link>
      <img src="@/assets/mcafee.png" class="mcafee" />
      <el-select
        v-model="lang"
        @change="changeLang"
        placeholder="$('lang.lang')"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Slider from "./slider.vue";
import { $accountLogin } from "@/api/index"; 
import addPermisson from '@/router/addPermisson';

export default {
  name: "Login",
  components: { Navbar, Slider },
  data() {
    return {
      options: [
        {
          value: "zh",
          label: this.$t("lang.cs"),
        },
        {
          value: "en",
          label: this.$t("lang.is"),
        },
      ],
      lang: "",

      uInput: {
        account: "super",
        password: "super",
      },
      uInputError: {
        account: !true,
        password: !true,
      },
    };
  },
  created() {
    this.lang = this.$store.state.lang;
  },

  methods: {
    changeLang(lang) {
      console.log(lang);
      this.$store.commit("set_lang", lang);
      this.$router.go(0);
    },

    async loginClick() {
      let confirmSuccess = this.$refs["slider"].confirmSuccess;
      if (!confirmSuccess) {
        this.$message({
          message:
            this.lang === "zh"
              ? "请先滑动验证码"
              : "Please slide the verification code first",
          type: "error",
        });
        return false;
      }

      // 获取到用户信息
      let userInfo = {
        account: this.uInput.account,
        password: this.uInput.password,
      };
      // 登录验证...
      let res = await $accountLogin(userInfo);
      this.$store.commit("set_userInfo", res.data);
      this.$store.commit("set_token", res.token);

      // 如果角色是超级管理员, 添加响应的路由
      let roleType = res.data.type * 1;
      addPermisson();  
      // 登录成功后跳转管理页
      this.$router.push("/home/dashboard");
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<style lang="less">
.registerBtn > span {
  margin-left: -8px;
}
</style>
