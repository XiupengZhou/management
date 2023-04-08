<template>
  <div>
    <ContentTitle :info="ctInfo" />

    <el-tabs v-model="activeName" class="switchCard" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="所有设备" name="first"></el-tab-pane>
      <el-tab-pane label="LoRaWAN" name="second"></el-tab-pane>
      <el-tab-pane label="NB-IoT" name="third"></el-tab-pane>
      <el-tab-pane label="4G/2G" name="fourth"></el-tab-pane>
      <el-tab-pane label="LoRaPP" name="fifth"></el-tab-pane>
      <div class="bcContent">
        <el-row>
          <el-col :span="2">
            <span>EUI : &nbsp;</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" size='small' placeholder="设备EUI"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span>导出条数 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" size='small' placeholder="100"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span>设备群组 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
              <el-select v-model="value" placeholder="设备群组" size="small">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span>传感器节点 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
              <el-select v-model="value" placeholder="传感器节点" size="small">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span>在线状态 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
              <el-select v-model="value" placeholder="在线状态" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span>绑定时间 : &nbsp;</span>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="value2"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
              size='small'
            >
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="2"></el-col>
          <el-col :span="10" class="searchBtns">
            <el-button-group >
              <el-button type="primary" icon="el-icon-search" size='mini'>搜索</el-button>
              <el-button type="primary" icon="el-icon-delete" size='mini'>清除条件</el-button>
              <el-button type="primary" icon="el-icon-download" size='mini'>导出数据</el-button>
              <el-button type="primary" icon="el-icon-refresh" size='mini'>刷新</el-button>
            </el-button-group>
             <span class="searchResult">搜索结果: 1</span>
          </el-col>
        </el-row>
      </div>
    </el-tabs>

    <div class="SearchResultTab">
      <el-table
        :data="devListData"
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>

        <el-table-column
          prop="eui"
          label="EUI">
        </el-table-column>

        <el-table-column
          prop="name"
          label="设备名称">
        </el-table-column>

        <el-table-column
          prop="devType"
          label="测量类型">
        </el-table-column>

        <el-table-column
          prop="devValue"
          label="测量值">
        </el-table-column>

        <el-table-column
          prop="channel"
          label="通道编号(通道名称)">
        </el-table-column>

        <el-table-column
          prop="agreement"
          label="组网协议类型">
        </el-table-column>

        <el-table-column
          prop="devGroup"
          label="设备群组">
        </el-table-column>

        <el-table-column
          prop="cTime"
          label="数据采集时间">
        </el-table-column>

        <el-table-column
          prop="uTime"
          label="数据采集时间">
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
export default {
  components: { ContentTitle },
  data() {
    return {
      ctInfo: {
        type:'数据',
        text: "数据列表",
        msg: "展示EUI、设备名称、测量值、采集时间和上报时间等设备的历史信息，可根据EUI、群组、数据采集时间等条件筛选或导出数据。",
      },
      activeName: 'first',
       options: [{
          value: 'on',
          label: '在线'
        }, {
          value: 'off',
          label: '离线'
        }],
        options2: [{
          value: '1',
          label: '998'
        }, {
          value: '2',
          label: '南山'
        }, {
          value: '3',
          label: '喧嚣'
        }],
      shortcuts: [{
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        }, {
          text: '最近一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        }, {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        }],
        value:'',
        value1: '',
        value2: '',
        input:'',
      devListData: [
        {
          eui:'2CF7F17221300055',
          name: '二氧化碳传感器',
          devType:'4101',
          devValue:' 100474Pa',
          channel:'1',
          agreement:'LoRaPP',
          devGroup:'默认组',
          cTime:'2021-09-02 09:39:01',
          uTime:'2021-09-02 09:39:02',
        },
        {
          eui:'2CF7F17221300055',
          name: '空气温湿度传感器',
          devType:'4097',
          devValue:'26.3℃',
          channel:'1',
          agreement:'LoRaPP',
          devGroup:'默认组',
          cTime:'2021-09-02 09:39:01',
          uTime:'2021-09-02 09:39:02',
        },
        {
          eui:'2CF7F17221300055',
          name: '光照传感器',
          devType:'4099',
          devValue:'0Lux',
          channel:'1',
          agreement:'LoRaPP',
          devGroup:'默认组',
          cTime:'2021-09-02 09:39:01',
          uTime:'2021-09-02 09:39:02',
        },
        {
          eui:'2CF7F17221300055',
          name: '气压传感器',
          devType:'4099',
          devValue:'100468Pa',
          channel:'1',
          agreement:'LoRaPP',
          devGroup:'默认组',
          cTime:'2021-09-02 09:39:01',
          uTime:'2021-09-02 09:39:02',
        },
        {
          eui:'2CF7F17221300055',
          name: '土壤温湿度传感器',
          devType:'4091',
          devValue:'26.15℃',
          channel:'1',
          agreement:'LoRaPP',
          devGroup:'默认组',
          cTime:'2021-09-02 09:39:01',
          uTime:'2021-09-02 09:39:02',
        },

      ]
    };
  },
  methods: {
    handleClick(){}
  }
};
</script>

<style lang="less" scoped>

.switchCard{
  background: #fff;
  margin-top: 10px;

  .el-select{
    width:100%;
  }
  .el-row{
    margin: 10px 0;
  }
  .el-col-2{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 13px;
    font-weight: 600;
  }
  .searchBtns{
    display: flex;
    align-items: center;

    .searchResult{
      color: #7C7C7C;
      font-size: 12px;
      margin-left: 6px;
    }
  }


}
.SearchResultTab{
  margin-top: 10px;
}
</style>