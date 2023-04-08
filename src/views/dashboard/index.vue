<template>
  <div class="">
    <ContentTitle :info="ctInfo" /> 

    <div>
      <!-- 设备概览 -->
      <div class="mainContent">
        <PreView class="fg1"/>  
        <!-- 公告 -->
        <el-card class="box-card bc3">
          <template #header>
            <div class="card-header">
              <div>
                <span>公告</span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="统计当前帐号下，绑定的网关和传感器节点的总数量。"
                  placement="right"
                >
                  <span class="iconfont icon-askoutline"></span>
                </el-tooltip>
              </div>
            </div>
          </template>
          <ul class="infoList">
            <li>
              <p>
                <span class="iconfont icon-info"></span
                ><span>senseCAP V3.0</span>
              </p>
              <span class="cTitme">2020-02-13 14:28:07</span>
            </li>
            <li>
              <p>
                <span class="iconfont icon-info"></span
                ><span>senseCAP V3.0</span>
              </p>
              <span class="cTitme">2020-02-13 14:28:07</span>
            </li>
          </ul>
        </el-card>
      </div> 
      <!-- 数据可视化 -->
      <Chart />
    </div>
  </div>
</template>

<script> 
import ContentTitle from "@/components/ContentTitle.vue"; 
import Chart from "./Chart.vue";
import PreView from "./PreView.vue";
export default {
  components: { ContentTitle, Chart,PreView },
  data() {
    return {
     
      ctInfo: {
        text: "仪表盘",
        msg: "设备概览和传感数据可视化。",
        a: {
          href: "https://sensecap-docs.seeed.cc/zh/dashboard.html",
          text: "点击查看仪表盘使用指南",
        },
      },  
    };
  }, 
};
</script>

<style lang="less">
@import "./index.less";
</style>
