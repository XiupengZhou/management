<template>
  <div class="server-index flex jc-sa fww">
    <el-card class="card-box" v-for="(value, key) in modueObj" :key="key">
      <h4 class="lh15">
        <span>{{ value }}</span>
      </h4>
      <ul class="mt-20 list">
        <li
          class="item flex aic"
          v-for="(item, index) in apiList.filter((item) =>
            item.url.includes(key)
          )"
          :key="index"
          v-clipboard:copy="item.fnName"
          v-clipboard:success="onCopy"
        >
          <div class="fn-name flex aic aic">
            <span>{{ item.fnName }}</span>
          </div>
          <span class="url">{{ item.url }}</span> 
        </li>
      </ul>
    </el-card>
    <el-card class="card-box fix"></el-card>
    <el-card class="card-box fix"></el-card>
  </div>
</template>

<script>
import * as apiObj from "@/api";
export default {
  data() {
    return {
      apiList: [],
      modueObj: {
        account: "账号模块",
        device: "设备模块",
        gateway: "网关模块 ",
        group: "群组模块",
        sensor: "传感器模块",
        account: "账号模块",
        fee: "计费模块",
        demo: "demo模块",
      },
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    onCopy() {
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },
    getList() {
      let list = [];
      for (let key in apiObj) {
        let str = String(apiObj[key]);
        let startIndex = str.indexOf("/");
        let lastIndex = str.lastIndexOf("'");
        let url = str.slice(startIndex, lastIndex);

        startIndex = str.indexOf("$");
        lastIndex = str.indexOf("(");
        let fnName = str.slice(startIndex, lastIndex);
        list.push({
          url,
          fnName,
        });
      }
      this.apiList = list;
    },
  },
};
</script>

<style lang="less">
.server-index {
  align-content: flex-start;
  .card-box {
    width: 20%;
    flex-grow: 1;
    &.fix {
      padding-top: 0;
      margin-top: 0;
      height: 0;
      border: 0;
    }
  }
  .list {
    width: 500px;
  }
  .item {
    margin-top: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    justify-content: flex-start;
  }
  .url {
    margin-left: 15px;
  }
}
</style>