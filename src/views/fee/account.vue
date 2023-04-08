<template>
  <div>
    <ContentTitle :info="ctInfo" />

    <div class="infoArea">
      <p>
        <span class="iconfont icon-info"></span>
        <span>目前计费功能暂不完善，所以计费功能暂未正式启用。</span>
      </p>
      <p>
        <span class="iconfont icon-info"></span>
        <span
          >正式收费后，我们将发送通知至首页公告；在此期间，若有欠费情况可联系我们：发送邮件至</span
        >
        <el-link type="primary">sensecap@seeed.cc</el-link>
      </p>
      <el-link type="primary">点击查看具体收费规则</el-link>
    </div>

    <el-card class="box-card bc1">
      <template #header>
        <div class="card-header">
          <span class="iconfont icon-info"></span>
          <span>设备概览</span>
        </div>
      </template>
      <div class="">
        <el-row>
          <el-col :span="2" class="titleName">计划:&nbsp;</el-col>
          <el-col :span="4">按量付费</el-col>
        </el-row>
        <el-row>
          <el-col :span="2" class="titleName">状态:&nbsp;</el-col>
          <el-col :span="4">正常</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card bc2">
      <template #header>
        <div class="card-header">
          <span class="iconfont icon-info"></span>
          <span>设备概览</span>
        </div>
      </template>
      <div class="bcBody">
        <el-row>
          <el-col :span="2" class="titleName">账户余额:&nbsp;</el-col>
          <el-col :span="10">¥ {{ balanceStr }}</el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span='2' class="titleName">调用额度剩余:&nbsp;</el-col>
          <el-col :span='10'>10,468,782,660</el-col>
        </el-row> -->
        <!-- <el-row>
          <el-col :span='2' ></el-col>
          <el-col :span='10'>
            <el-button type="primary" size="mini">购买兑换码</el-button>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="2" class="titleName">充值金额:&nbsp;</el-col>
          <el-col :span="4">
            <el-input v-model="amount" size="mini" placeholder="请输入充值金额" clearable></el-input>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span="2" class="titleName">备注:&nbsp;</el-col>
          <el-col :span="4">
            <el-input v-model="desc" size="mini" placeholder="请输入备注信息" clearable></el-input>
          </el-col> 
        </el-row>
        <el-row> 
          <el-col :span="4" class="ml-5" :offset="2">
            <el-button type="primary" size="mini" @click="recharge"
              >充值</el-button
            >
          </el-col>
        </el-row> 
      </div>
    </el-card>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { $feeAdd,$feeBalance } from "@/api/index";
export default {
  components: { ContentTitle },
  data() {
    return {
      // 余额
      balance: 0,
      // 充值金额
      amount: '',
      desc:'',

      ctInfo: {
        type: "计费",
        text: "账户信息",
        msg: "展示当前账户的剩余消息额度，可根据兑换码兑换消息额度。",
      },
    };
  },
  created() {
    this.getFeeBalance();
  },
  computed: {
    balanceStr() {
      return this.balance.toFixed(2);
    },
  },
  methods: {
    getFeeBalance() {
      $feeBalance().then(res=> {
        this.balance = res.data.balance;
      })
    },
    recharge() {
      let params = {
        amount: this.amount,
        type: "recharge",
        desc:this.desc
      };
      $feeAdd(params).then((res) => {
        this.balance += this.amount*1;
        this.$message({
          message:'充值成功',
          type:'success'
        })
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

.el-card {
  margin-top: 10px;
  font-size: 13px;

  .el-row {
    height: 40px;
    align-items: center;
  }
  .titleName {
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
  }
}
</style>