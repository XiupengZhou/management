<template>
  <div class="dashboard-sensorlist ">
    <ContentTitle :info="ctInfo" />

    <div class="mainContent">
      <PreView class="fg1" />
    </div>

    <div class="list-box" v-for="(value, key) in sensorList" :key="key">
      <el-card class="sensor-box box-card bc1 bc4 bc6">
        <template #header>
          <div class="card-header">
            <div>
              <span>{{ key }}</span>
            </div>
            <div class="boxTools"></div>
          </div>
        </template>
        <ul class="devList flex aic fww jc-sb">
          <template v-for="item in value">
            <li class="devItem pt-5" :key="item.eui">
              <p>
                <i
                  v-if="item.online"
                  class="icon iconfont icon-yalichuanganqi f999"
                  style="color: #3dd93d"
                ></i>
                <i
                  v-else
                  class="icon iconfont icon-yalichuanganqi"
                  style="color: gray"
                ></i>
                <span
                  v-if="item.powerNum < 30 && item.online"
                  class="icon iconfont icon-dianchidianliang red f26"
                  style="margin-left: -15px"
                ></span>
              </p>
              <span class="devValue">{{ item.devValue }}</span>
              <span class="devName">{{ item.devName }}</span>
              <div class="devInfo">
                <span class="devId">EUI: {{ item.eui }}</span>
                <span class="uTime">{{ item.uploadTime }}</span>
              </div>
            </li>
          </template>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
          <li class="fixed"></li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import { $deviceSensorList } from "@/api";
import ContentTitle from "@/components/ContentTitle";
import PreView from "../dashboard/PreView";
export default {
  components: {
    ContentTitle,
    PreView,
  },
  data() {
    return {
      ctInfo: {
        text: "设备列表",
        msg: "监控所有设备状态",
      },
      sensorList: [],
    };
  },
  created() {
    this.getSensorList();
  },

  methods: {
    getSensorList() {
      $deviceSensorList().then((res) => {
        this.sensorList = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dashboard-sensorlist {
  // margin-top: 10px;
}
.list-box {
  width: 100%;
  flex-grow: 1;
  & > * {
    margin: 10px 0 0;
  }

  .bc1 {
    .bcBody {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > img {
        &:first-child {
          width: 51px;
          height: auto;
        }

        &:nth-of-type(2) {
          width: 25px;
          height: auto;
        }
      }

      > .line {
        width: 2px;
        height: 60px;
        background: #e9eef6;

        &:nth-of-type(4) {
          height: 127px;
        }
      }

      > .getway,
      > .devNode {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;

        > span {
          &:nth-of-type(1) {
            font-size: 35px;
            line-height: 45px;
          }
        }
      }
    }
  }

  .bc2 {
    width: 240px;
    margin: 10px 10px 0;

    .monitorList {
      li {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        height: 36px;
        font-weight: 600;

        i {
          width: 46px;
          height: 21px;
          line-height: 21px;
          text-align: center;
          border-radius: 21px;
          background: rgba(85, 179, 100, 0.2);
          color: #3f8c4b;
        }

        &:last-child {
          i {
            background: rgba(236, 70, 78, 0.2);
            color: #ec464e;
          }
        }
      }
    }
  }

  .bc3 {
    .infoList {
      li {
        height: 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;

        p {
          span {
            vertical-align: middle;

            &.iconfont {
              font-weight: 600;
              font-size: 16px;
              color: rgb(6, 209, 6);
              margin-right: 3px;
            }
          }
        }
      }
    }
  }

  .bc4 {
    .boxTools {
      span {
        font-size: 22px;
        margin-left: 25px;
        color: #86919b;
        font-weight: 500;
        cursor: pointer;

        &:first-child {
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          color: #379aff;
          border: 1px solid #abafb38a;
          border-radius: 50%;

          &:hover {
            border-color: #379aff;
            box-shadow: 0 0 6px #379bff56;
          }
        }

        &:hover {
          color: #379aff;
        }
      }
    }

    .devList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li.fixed {
        height: 0;
        border: none;
      }
      li {
        position: relative;
        width: 12%;
        flex-grow: 1;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        box-shadow: 0 0 12px rgba(212, 212, 212, 0.301);
        margin-bottom: 10px;
        // margin-right: 10px;
        margin: 5px;
        font-size: 14px;

        &:nth-of-type(3n) {
          margin-right: 0;
        }

        > span.icon-Delete {
          position: absolute;
          top: 5px;
          right: 6px;
          font-size: 20px;
          color: #86919b;
          cursor: pointer;
          display: none;
        }

        &:hover > span.icon-Delete {
          display: block;

          &:hover {
            font-weight: 600;
          }
        }

        img {
          width: 15px;
          height: auto;
          margin-top: 20px;
        }

        .devValue {
          font-size: 18px;
          color: #434343;
          font-weight: 600;
          line-height: 24px;
        }

        .devName {
          font-size: 13px;
          color: #434343;
          line-height: 30px;
          font-weight: 600;
        }

        .devInfo {
          background: #f3f4f5;
          display: flex;
          width: 100%;
          color: #030609;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          line-height: 25px;
        }
      }
    }
  }

  .bc5 {
    width: 1070px;
    margin-left: 10px;
    flex-grow: 1;
    align-self: flex-start;

    .humidityChart {
      height: 250px;
    }
  }

  .card-header {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
    font-weight: 600;

    .iconfont {
      font-size: 16px;
      color: #bdc0c4;
      font-weight: 400;
      margin-left: 3px;
    }
  }

  .icon-yalichuanganqi {
    font-size: 48px;
    transform: rotate(180deg);
  }
  .red {
    color: #f56c6c;
  }
}
.devItem {
  width: 25%;
  margin-top: 5px;
}
</style>