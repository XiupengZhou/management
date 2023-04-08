<template>
  <div id="sensor-move">
    <el-dialog title="提示" :visible.sync="show" width="30%" center>
      <div class="select-box flex jc-c">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="changeGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import {$groupList,$sensorChangGroup} from '@/api'
export default {
  props:['sensor'],
  data() {
    return {
      show: false,
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        }, 
      ],
    };
  }, 

  created() {
    this.getGroupList();
  },

  methods: {
    changeGroup() { 
      this.show = false;
      let {id} = this.sensor;
      let groupObj = this.options.find(item=>item.value === this.value);
      let devGroup = groupObj.label;
      let params = {
        id,
        devGroup
      }
      $sensorChangGroup(params).then(res=> {
        this.sensor.devGroup = devGroup;
        this.$message({
          message:'移动成功',
          type:'success'
        })
      })
    },
    getGroupList() {
      $groupList().then(res=> {
        this.options = res.data.map(item=>{
          return {
            value: item.id,
            label: item.groupName
          }
        })
      })
    }
  }
};
</script> 


<style lang="less">
#sensor-move {
  .el-select {
    width: 80%;
  }
}
</style>