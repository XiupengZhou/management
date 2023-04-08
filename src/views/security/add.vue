<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <div class="acc">
      <el-row class="flex aic">
        <el-col :span="2">
          <span>标签</span>
        </el-col>
        <el-col :span="4">
          <el-input
            size="small"
            placeholder="标签"
            v-model="securityInfo.tag"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="flex aic">
        <el-col :span="2">
          <span>访问权限</span>
        </el-col>
        <el-col :span="4">
          <el-input
            size="small"
            placeholder="访问权限"
            v-model="securityInfo.authority"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="flex aic">
        <el-col :span="2">
          <span>密钥状态</span>
        </el-col>
        <el-col :span="4">
          <el-select v-model="securityInfo.online" placeholder="请选择">
            <el-option  
              label="使用中"
              :value="true"
            >
            </el-option>
            <el-option  
              label="未使用"
              :value="false"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="btnsRow">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="2"></el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="submit">确认</el-button>
          <el-button size="mini" @click="$router.push('/security')">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { $securityAdd, $securityEdit } from "@/api";
export default {
  components: { ContentTitle },
  data() {
    return {
      editing: false,
      // 账号信息
      securityInfo: {
        tag: "超级用户",
        id: "",
        authority: "8",
        online: false
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
      this.securityInfo = this.$route.query;
    }
  },

  watch: {
    $route({ query }) {
      let id = query.id;
      if (id) {
        this.securityInfo = query; 
      } else {
        this.securityInfo = {}; 
      }
    },
  },

  methods: {
    submit() {
      if (this.editing) {
        $securityEdit(this.securityInfo).then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$router.push("/security/list");
        });
      } else {
        $securityAdd(this.securityInfo).then((res) => {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$router.push("/security/list");
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