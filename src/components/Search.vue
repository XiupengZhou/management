<template>
  <el-tabs
    v-model="activeName"
    class="switchCard"
    type="border-card"
    @tab-click="handleClick"
  >
    <el-tab-pane label="所有设备" name="all"></el-tab-pane>
    <el-tab-pane label="LoRaWAN" name="LoRaWAN"></el-tab-pane>
    <el-tab-pane label="LoRaPP" name="LoRaPP"></el-tab-pane>
    <div class="bcContent">
      <el-row>
        <el-col :span="2">
          <span>在线状态 : &nbsp;</span>
        </el-col>
        <el-col :span="5">
          <el-select
            @change="changeStatus"
            v-model="online"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>EUI : &nbsp;</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="eui" size="small" placeholder="设备EUI"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>绑定时间 : &nbsp;</span>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="date"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="shortcuts"
            size="small"
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="10" class="searchBtns">
          <el-button-group>
            <el-button
              @click="search"
              type="primary"
              icon="el-icon-search"
              size="mini"
              >搜索</el-button
            >
            <el-button
              @click="clearSearch"
              type="primary"
              icon="el-icon-delete"
              size="mini"
              >清除条件</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-refresh"
              size="mini"
              @click="refresh"
              >刷新</el-button
            >
          </el-button-group>
          <span class="searchResult">搜索结果: {{ total }}</span>
        </el-col>
      </el-row>
    </div>
  </el-tabs>
</template>

<script>
export default {
  methods: {
    handleClick(tab) {
      this.currPage = 1;
      this.agreement = tab.paneName;
      this.getGateWayList();
    },
  },
};
</script>

<style>
</style>