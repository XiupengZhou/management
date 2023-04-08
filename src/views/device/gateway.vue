<template>
  <div>
    <ContentTitle :info="ctInfo" />

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
            <el-input
              v-model="eui"
              size="small"
              placeholder="设备EUI"
            ></el-input>
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
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="refresh">刷新</el-button
              >
            </el-button-group>
            <span class="searchResult">搜索结果: {{ total }}</span>
          </el-col>
        </el-row>
      </div>
    </el-tabs>

    <div class="SearchResultTab">
      <el-table :data="devListData" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="eui" label="EUI"> </el-table-column>
        <el-table-column prop="name" label="设备名称"> </el-table-column>
        <el-table-column prop="mhz" label="频率(MHz)"> </el-table-column>
        <el-table-column
          :formatter="({ online }) => (online ? '在线' : '离线')"
          prop="online"
          label="在线状态"
        >
        </el-table-column>

        <el-table-column prop="country" label="国家"> </el-table-column>

        <el-table-column prop="agreement" label="组网协议类型">
        </el-table-column>
        <el-table-column width="150" prop="bTime" label="绑定时间">
        </el-table-column>

        <!-- <el-table-column prop="uploadTime" label="最新数据上报时间"> </el-table-column> -->
        <!-- <el-table-column prop="desc" label="描述"> </el-table-column> -->
      </el-table>
      <div class="flex jc-c pt-10 bg-fff pb-10">
        <el-pagination
          background
          :hide-on-single-page="true"
          :current-page="currPage"
          @current-change="changePage"
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { $gatewayList } from "@/api";
export default {
  components: { ContentTitle },
  data() {
    return {
      // 搜索条件
      agreement: "all", // 协议类型
      currPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 0, // 总条数
      eui: "", // 设备eui
      online: "all", // 是否在线
      date: [], // 搜索日期
      ctInfo: {
        type: "设备",
        text: "网关列表",
        msg: "展示EUI、名称、状态等设备信息，可根据EUI、状态，和绑定时间等条件筛选具体的网关。",
      },
      activeName: "all",
      options: [
        {
          value: true,
          label: "在线",
        },
        {
          value: false,
          label: "离线",
        },
        {
          value: "all",
          label: "全部",
        },
      ],
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      value1: "",

      devListData: [],
    };
  },

  created() {
    this.getGateWayList();
  },

  computed: {
    dateStr() {
      let d1 = this.date[0];
      let d2 = this.date[1];
      let time1 = d1 && d1.getTime();
      let time2 = d2 && d2.getTime();
      if (time1 && time2) {
        return time1 + "-" + time2;
      } else {
        return "";
      }
    },
  },

  methods: {
    getGateWayList(data = {}) {
      let query = {
        agreement: this.agreement,
        currPage: this.currPage,
        pageSize: this.pageSize,
        online: this.online,
        eui: this.eui,
        date: this.dateStr,
      };
      $gatewayList(query).then((res) => {
        this.devListData = res.data;
        this.total = res.total;
      });
    },

    // 清除搜索
    clearSearch() {
      this.currPage = 1;
      this.total = 0;
      this.eui = "";
      this.date = "";
      this.online = "all";
      this.getGateWayList();
    },

    search() {
      this.getGateWayList();
    },

    // 切换页面
    changePage(page) {
      this.currPage = page;
      this.getGateWayList();
    },

    handleClick(tab) {
      this.currPage = 1;
      this.agreement = tab.paneName;
      this.getGateWayList();
    },

    // 在线离线
    changeStatus(value) {
      this.online = value;
      this.currPage = 1;
    },
    // 刷新
    refresh() {
      this.$router.go(0);
    }
  },
};
</script>

<style lang="less" scoped>
@import "./gateway.less";
</style> 