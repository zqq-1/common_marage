<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/tuo.jpeg" alt="" />
            <div class="text">
              <div class="name">Admin</div>
              <div class="privilege">超级管理员</div>
            </div>
          </div>
          <div class="logintime">
            <p>上次登录时间： <span>2024-1-22</span></p>
            <p>上次登录地点： <span>河北</span></p>
          </div>
        </el-card>

        <el-card style="margin-top: 20px; height: 450px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              :prop="key"
              :label="val"
              v-for="(val, key) in tableLabel"
              :key="key"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="money">
              <div class="value">￥{{ item.value }}</div>
              <div class="name">{{ item.name }}</div>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <div ref="echart1" style="width: auto; height: 280px"></div>
        </el-card>

        <div class="graph">
          <el-card style="height: 260px">
            <div ref="echart2" style="width: auto; height: 260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="echart3" style="width: auto; height: 220px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getData } from "@/api/index.js";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "手机",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData, orderData, userData, videoData } = data.data;
      this.tableData = tableData;
      // echart1
      const echart1 = echarts.init(this.$refs.echart1);
      const xAxis = Object.keys(orderData.data[0]);
      const series = [];
      xAxis.forEach((key) => {
        series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      var option = {
        xAxis: {
          type: "category",
          data: xAxis,
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: xAxis,
        },
        series: series,
      };
      echart1.setOption(option);

      // echart2
      const echart2 = echarts.init(this.$refs.echart2);
      var option2 = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],

        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
            color: ["#2ec7c9"],
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
            color: ["#b6a2de"],
          },
        ],
      };
      echart2.setOption(option2);

      // echart3
      const echart3 = echarts.init(this.$refs.echart3);
      const option3 = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            type: "pie",
            data: videoData.map((item) => {
              return {
                name: item.name,
                value: item.value,
              };
            }),
          },
        ],
      };

      echart3.setOption(option3);
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.box-card {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }

    .text {
      margin-left: 40px;

      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }

      .privilege {
        color: #999;
      }
    }
  }

  .logintime {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999;
    }

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
.num {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .money {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .value {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .name {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>