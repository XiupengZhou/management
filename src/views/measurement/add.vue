<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <div class="acc">
      <el-row class="flex aic">
        <el-col :span="2">
          <span>测量名称</span>
        </el-col>
        <el-col :span="4">
          <el-input
            size="small"
            placeholder="测量名称"
            v-model="measurementInfo.name"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="flex aic">
        <el-col :span="2">
          <span>测量单位</span>
        </el-col>
        <el-col :span="4">
          <el-input
            size="small"
            placeholder="测量单位"
            v-model="measurementInfo.unit"
          ></el-input>
        </el-col>
      </el-row>

      <el-row class="btnsRow">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="2"></el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="submit">确认</el-button>
          <el-button size="mini" @click="$router.push('/measurement')"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { $measurementAdd, $measurementEdit } from "@/api";
export default {
  components: { ContentTitle },
  data() {
    return {
      editing: false,
      // 账号信息
      measurementInfo: {
        id: "",
        name: "二氧化碳传感器",
        unit: "lx",
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
      this.measurementInfo = this.$route.query;
    }
  },

  watch: {
    $route({ query }) {
      let id = query.id;
      if (id) {
        this.measurementInfo = query;
      } else {
        this.measurementInfo = {};
      }
    },
  },

  methods: {
    submit() {
      if (this.editing) {
        $measurementEdit(this.measurementInfo).then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$router.push("/measurement/list");
        });
      } else {
        let params = {
          name: this.measurementInfo.name,
          unit: this.measurementInfo.unit,
        };
        $measurementAdd(params).then((res) => {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$router.push("/measurement/list");
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