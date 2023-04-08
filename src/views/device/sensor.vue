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
      <el-tab-pane label="NB-IoT" name="NB-IoT"></el-tab-pane>
      <el-tab-pane label="4G/2G" name="4G/2G"></el-tab-pane>
      <el-tab-pane label="LoRaPP" name="LoRaPP"></el-tab-pane>
      <div class="bcContent">
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
            <span>设备群组 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
            <el-select v-model="devGroup" placeholder="设备群组" size="small">
              <el-option
                v-for="item in groupList"
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
            <span>在线状态 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
            <el-select
              v-model="online"
              placeholder="在线状态"
              size="small"
              @change="changeStatus"
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
            <span>绑定时间 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
            <!-- <el-date-picker
              v-model="date"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="shortcuts"
              size="small"
            >
            </el-date-picker> -->

            <el-date-picker
              v-model="date"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="2"></el-col>
          <el-col :span="10" class="searchBtns">
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="search"
                >搜索</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="clearSearch"
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
    <List :devListData="devListData" />
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
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { $sensorList,$groupList } from "@/api/index";
import List from "./sensor/List.vue";
export default {
  components: { ContentTitle, List },
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
      devGroup:'',
      keyword: "",
      ctInfo: {
        type: "设备",
        text: "传感器列表",
        msg: "展示EUI、名称、状态、数据类型等设备信息，可根据EUI、群组、状态、绑定时间等条件筛选具体的传感器节点，并提供移动群组等功能。",
      },
      activeName: "first",
      options: [
        {
          value: "all",
          label: "全部",
        },
        {
          value: "true",
          label: "在线",
        },
        {
          value: false,
          label: "离线",
        },
      ],
      groupList: [
        {
          value: "id",
          label: "组名",
        }, 
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      value1: "",
      online: "",
      devListData: [],
    };
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
  created() {
    this.getList();
    this.getGroupList();
  },
  methods: {
    getGroupList() {
       $groupList({}).then(res=> {
         this.groupList = res.data.map(item=>{
           return {
             value: item.groupName,
             label: item.groupName
           }
         });
       })
    },
    // 清除搜索
    clearSearch() {
      this.currPage = 1;
      this.total = 0;
      this.eui = "";
      this.date = "";
      this.online = "all";
      this.getList();
    },

    search() {
      this.getList();
    },
    // 在线离线
    changeStatus(value) {
      this.online = value;
      this.currPage = 1;
    },
    changePage(page) {
      this.currPage = page;
      this.getList();
    },
    handleClick(tab) {
      this.currPage = 1;
      this.agreement = tab.paneName;
      this.getList();
    },
    refresh() {
      this.$router.go(0);
    },
    getList() {
      let params = {
        agreement: this.agreement,
        currPage: this.currPage,
        pageSize: this.pageSize,
        online: this.online,
        eui: this.eui,
        devGroup: this.devGroup,
        date: this.dateStr,
      };
      $sensorList(params).then((res) => {
        this.devListData = res.data;
        this.total = res.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./sensor.less";
</style>