<template>
  <div>
    <ContentTitle :info="ctInfo" />

    <div class="acc">
      <el-row>
        <el-col :span="2">
          <span>*账号:</span>
        </el-col>
        <el-col :span="4">
          <el-input
            size="small"
            placeholder="账号"
            v-model="accountInfo.account"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>*用户名称:</span>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="accountInfo.username"
            size="small"
            placeholder="用户名称"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>*密码:</span>
        </el-col>
        <el-col :span="4">
          <el-input
            type="password"
            v-model="accountInfo.password"
            size="small"
            placeholder="密码"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>*确认密码:</span>
        </el-col>
        <el-col :span="4">
          <el-input
            type="password"
            v-model="confirmPsw"
            size="small"
            placeholder="确认密码"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>*类型:</span>
        </el-col>
        <el-col :span="4">
          <el-radio v-model="accountInfo.type" label="1"
            >超级管理员 (所有权限)</el-radio
          >
          <el-radio v-model="accountInfo.type" label="2"
            >管理员 (拥有部分权限)</el-radio
          >
          <el-radio v-model="accountInfo.type" label="3"
            >观察员 (只读权限)</el-radio
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span>账号描述:</span>
        </el-col>
        <el-col :span="4">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5 }"
            placeholder="请输入内容"
            v-model="accountInfo.desc"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row class="btnsRow">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="2"></el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="submit">确认</el-button>
          <el-button size="mini">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { $accountAdd,$accountEdit } from "@/api";
export default {
  components: { ContentTitle },
  data() {
    return {
      editing: false,
      // 账号信息
      accountInfo: {
        id: "",
        account: "acc123456",
        username: "测试账号",
        password: "123",
        type: "2",
        desc: "这是一个测试账号",
      },
      confirmPsw: "123", // 确认密码
      ctInfo: {
        type: "子账号",
        text: "添加子账号",
        msg: "可添加当前组织的子账号，并为其分配权限。",
      },
    };
  },

  created() { 
    let { id } = this.$route.query;
    // 有id说明是在编辑
    if (id) {
      this.editing = true;
      this.accountInfo = this.$route.query;
    } 
  },

  watch:{
    $route({query}) {
      let id = query.id;
      if (id) {
          this.accountInfo = query;
           this.confirmPsw = query.password;
      }else {
        this.accountInfo = {};
        this.confirmPsw = '';
      }
    }
  },

  methods: {
    submit() {
      if (this.editing) {
        $accountEdit(this.accountInfo).then((res) => {
          this.$message({
            message:'修改成功',
            type:'success'
          }) 
          this.$router.push('/account/list');
        });
      } else {
        $accountAdd(this.accountInfo).then((res) => {
          this.$message({
            message:'添加成功',
            type:'success'
          })
          this.$router.push('/account/list');
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.acc {
  padding: 10px 10px 30px;
  background: #fff;
  margin-top: 10px;

  .el-row {
    margin-bottom: 10px;
  }
  .el-col-2 {
    display: flex;
    justify-content: flex-end;
    padding-right: 5px;
    font-size: 13px;
    font-weight: 600;
  }

  .btnsRow {
    margin-top: 10px;
  }
}
</style>