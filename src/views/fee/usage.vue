<template>
  <div>
    <ContentTitle :info="ctInfo" /> 

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
import {$feeUsageList} from '@/api/index';
import moment from 'moment';

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
        text: "使用记录",
        msg: "统计当前账户每天消耗的消息额度总数，可查看历史月份的使用记录。",
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
      $feeUsageList({ currPage, pageSize, date }).then((res) => {
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



