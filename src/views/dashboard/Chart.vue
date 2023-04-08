<template>
    <ul class="chartList">
      <li>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div>
                <span>空气湿度</span>
                <!-- <span class="iconfont icon-bianji"></span> -->
              </div>
            </div>
          </template>
          <div class="chartArea" ref="chart1"></div>
        </el-card>
      </li>
      <li>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div>
                <span>光照</span>
                <!-- <span class="iconfont icon-bianji"></span> -->
              </div>
            </div>
          </template>
          <div class="chartArea" ref="chart2"></div>
        </el-card>
      </li>

      <li>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div>
                <span>气压</span>
                <!-- <span class="iconfont icon-bianji"></span> -->
              </div>
            </div>
          </template>
          <div class="chartArea" ref="chart4"></div>
        </el-card>
      </li>

      <li>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div>
                <span>土壤湿度</span>
                <!-- <span class="iconfont icon-bianji"></span> -->
              </div>
            </div>
          </template>
          <div class="chartArea" ref="chart3"></div>
        </el-card>
      </li>
    </ul>
</template>

<script>
import * as echarts from "echarts";
import ContentTitle from "@/components/ContentTitle.vue";
import { $sensorCount } from "@/api";

export default {
  components: { ContentTitle },
  data() {
    return {
      ctInfo: {
        type: "数据",
        text: "数据图表",
        msg: "以曲线图的形式展示设备的历史数据。",
      },

      // 空气
      air: [],
      // 光照
      beam: [],
      // 土壤
      soil: [],
      // 气压
      pressure: [],

      chartList: {
        chart1: null,
        chart2: null,
        chart3: null,
        chart4: null,
        chart5: null,
        chart6: null,
      },
    };
  },

  created() {
    this.getCount();
  },

  methods: {
    draw() {
      this.chartList.chart1 = echarts.init(this.$refs.chart1);
      this.chartList.chart2 = echarts.init(this.$refs.chart2);
      this.chartList.chart3 = echarts.init(this.$refs.chart3);
      this.chartList.chart4 = echarts.init(this.$refs.chart4);

      let opt1 = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.air,
            type: "line",
            smooth: true,
          },
        ],
      };

      let opt2 = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.beam,
            type: "bar",
          },
        ],
      };
      let opt3 = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.soil,
            type: "line",
            smooth: true,
          },
        ],
      };

      let opt4 = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [10, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 7,
            },
            data: this.pressure,
          },
        ],
      };

      this.chartList.chart1.setOption(opt1);
      this.chartList.chart2.setOption(opt2);
      this.chartList.chart3.setOption(opt3);
      this.chartList.chart4.setOption(opt4);
    },

    getCount() {
      $sensorCount().then((res) => {
        let { air, beam, soil, pressure } = res.data;
        this.air = air;
        this.beam = beam;
        this.soil = soil;
        this.pressure = pressure;
        this.draw();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.chartList {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > li {
    width: 40%;
    flex-grow: 1;
    margin-bottom: 5px;

    &:nth-of-type(even) {
      margin-left:10px;
    }

    .chartArea {
      height: 220px;
    }
  }
}
</style>