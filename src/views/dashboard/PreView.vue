<template>
  <div class="flex jc-sb">
    <el-card class="box-card bc1 fg1">
      <template #header>
        <div class="card-header">
          <div>
            <span>设备概览</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="统计当前帐号下，绑定的网关和传感器节点的总数量。"
              placement="bottom"
            >
              <span class="iconfont icon-askoutline"></span>
            </el-tooltip>
          </div>
          <el-button class="button" size="mini" type="text">绑定设备</el-button>
        </div>
      </template>
      <div class="bcBody">
        <img src="../../assets/gateway.png" />
        <span class="line"></span>
        <div class="getway">
          <span>{{ LoRaWAN.total }}</span>
          <span>LoRaWAN</span>
          <span>网关</span>
        </div>
        <span class="line"></span>
        <div class="getway">
          <span>{{ LoRaPP.total }}</span>
          <span>LoRaPP</span>
          <span>网关</span>
        </div>
        <span class="line"></span>
        <div class="getway">
          <span>{{ group }}</span>
          <span style="height: 20px"></span>
          <span>群组</span>
        </div>
        <span class="line"></span>
        <!-- <img src="../../assets/devNode.png" /> -->
        <i class="icon iconfont icon-yalichuanganqi f999"></i>
        <div class="devNode">
          <span>{{ sensor.total }}</span>
          <span>传感器节点</span>
        </div>
      </div>
    </el-card>
    <!-- 监控 -->
    <el-card class="box-card bc2">
      <template #header>
        <div class="card-header">
          <div>
            <span>监控</span>
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
      <ul class="monitorList">
        <li>
          <span>网关离线</span>
          <i>{{ LoRaWAN.offline + LoRaPP.offline }}</i>
        </li>
        <li>
          <span>节点离线</span>
          <i>{{ sensor.offline }}</i>
        </li>
        <li>
          <span>传感器低电量</span>
          <i>{{ sensor.lowBattery }}</i>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import {$deviceCount} from '@/api/index';
export default {
  data() {
    return {
      LoRaWAN: {
        total: 0,
        offline: 0,
      },
      LoRaPP: {
        total: 0,
        offline: 0,
      },
      group: 6,
      sensor: {
        total: 40,
        offline: 27,
        lowBattery: 0,
      },
    };
  },
  created() {
    this.getCount();
  },

  methods: {
    getCount() {
      $deviceCount().then((res) => {
        let { LoRaWAN, LoRaPP, group, sensor } = res.data;
        this.LoRaWAN = LoRaWAN;
        this.LoRaPP = LoRaPP;
        this.group = group;
        this.sensor = sensor;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import './PreView.less';
</style>