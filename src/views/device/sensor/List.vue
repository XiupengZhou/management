<template>
  <div class="SearchResultTab">
    <el-table :data="devListData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>

      <el-table-column prop="eui" label="EUI"> </el-table-column>

      <el-table-column prop="name" label="设备名称"> </el-table-column>

      <el-table-column prop="nums" label="传感器通道"> </el-table-column>

      <el-table-column prop="devGroup" label="设备群组"> </el-table-column>

      <el-table-column prop="loop" label="上报周期(分钟)"> </el-table-column>

      <el-table-column prop="mhz" label="频率(MHz)"> </el-table-column>

      <el-table-column prop="online" label="在线状态"> </el-table-column>

      <el-table-column prop="bTime" label="绑定时间"> </el-table-column>

      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            @click="move(scope.$index, scope.row)"
            type="text"
            size="small"
            >移动</el-button
          >
          <el-button type="text" size="small">数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <Move ref="move" :sensor="sensor"/> -->
  </div>
</template>

<script>
import Move from "./Move.vue";

export default {
  components: { Move },
  props: ["devListData"],
  data() {
    return {
      sensor: {},
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    move(index, row) { 
      this.sensor = row; 
      this.$refs['move'].show = true;
    },
  },
};
</script>

<style>
</style>