<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <!-- <div class="infoArea">
      <p>
        <span class="iconfont icon-info"></span> 
        <span>注册组织初始赠送：上报额度和调用额度各赠送100,000。</span>
      </p>
      <p>
        <span class="iconfont icon-info"></span>
        <span>绑定设备赠送：LoRa单通道节点赠送100,000上报额度和1,000,000调用额度；4G/2G Sensor Hub赠送250,000上报额度和2,500,000调用额度。</span>
      </p>
    </div> -->

    <div class="SearchResultTab">
      <el-row class="flex aic">
        <el-col :span="2">月份选择：&nbsp;</el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月"
            size="small "
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <el-table :data="devListData" style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="120">
        </el-table-column>
        <el-table-column align="center" label="充值id" prop="id">
        </el-table-column>
        <el-table-column
          align="center"
          :formatter="formatDate"
          prop="cTime"
          label="日期"
        >
        </el-table-column>
        <el-table-column align="center" prop="amount" label="充值金额">
        </el-table-column>
        <el-table-column align="center" prop="desc" label="备注">
        </el-table-column>
      </el-table>
      <div class="flex jc-c pt-10 bg-fff pb-10">
        <el-pagination
          background
          :hide-on-single-page="false"
          :current-page="currPage"
          @current-change="changePage"
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
import { $feeRechargeList } from "@/api/index";
import moment from "moment";
export default {
  components: { ContentTitle },
  data() {
    return {
      currPage: 1,
      pageSize: 10,
      total: 20,
      date: "",
      moment,
      ctInfo: {
        type: "计费",
        text: "充值记录",
        msg: "展示当前账户的消息额度的所有充值记录。",
      },
      devListData: [ 
      ],
    };
  },
  created() {
    this.getList();
  },
  watch: {
    date() {
      this.currPage = 1;
      this.getList();
    },
  },
  computed: {
    dateStr() {
      if (this.date) {
        return moment(this.date).format("YYYY-MM");
      } else {
        return '';
      }
    }
  },

  methods: {
    changePage(page) {
      this.currPage = page;
      setTimeout(res=> {
        this.getList();
      },1000)
    },
    getList() {
      let currPage = this.currPage;
      let pageSize = this.pageSize;
      let date = this.dateStr;
      $feeRechargeList({ currPage, pageSize, date }).then((res) => {
        this.devListData = res.data;
        this.total = res.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.infoArea {
  padding: 10px;
  background: #fff;
  line-height: 22px;
  font-size: 14px;
  padding-left: 36px;

  p > * {
    vertical-align: middle;
  }

  .iconfont {
    color: orange;
    font-weight: 600;
    font-size: 20px;
    margin-right: 3px;
  }
}

.SearchResultTab {
  margin-top: 10px;
  background: #fff;

  .el-row {
    align-items: center;
    padding: 20px 0;
  }
  .el-col-2 {
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    font-weight: 600;
  }
}
</style>