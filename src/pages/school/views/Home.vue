<template>
  <div class="home page-layout qui-fx-ver">
    <div>
      <div class="daily-card qui-fx qui-fx-ac" v-for="item in baseList" :key="item.id">
        <div class="img-box" :style="`background:${item.color}`">
          <img :src="item.icon" alt="">
        </div>
        <div class="qui-fx-f1" style="text-align:center;">
          <div class="num">{{item.num}}</div>
          <div class="tip">{{item.tip}}</div>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;">
      <a-row :gutter="10">
        <a-col :span="18">
          <chart-component :style="{height:chartHeight}" :id="heatId" :option="heatOption"></chart-component>
        </a-col>
        <a-col :span="6">
          <chart-component :style="{height:chartHeight}" :id="userPieId" :option="userPieOption"></chart-component>
        </a-col>
      </a-row>
    </div>
    <div style="margin-top:10px;" >
      <a-row :gutter="10">
        <a-col :span="18">
          <chart-component :style="{height:chartHeight}" :id="unReportId" :option="unReportOption"></chart-component>
        </a-col>
        <a-col :span="6">
          <chart-component :style="{height:chartHeight}" :id="unHealthyId" :option="unHealthyOption"></chart-component>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import ChartComponent from './component/ChartComponent'
import reportImg from '@a/img/report.gif'
import heatImg from '@a/img/heat.png'
import unhealthyImg from '@a/img/unhealthy.gif'
import unreportImg from '@a/img/unreport.gif'
export default {
  name: 'Home',
  components: {
    ChartComponent
  },
  data() {
    return {
      reportImg,
      baseList: [{
        id: 1,
        icon: reportImg,
        num: 200,
        tip: '已上报人数',
        color: '#e6fbea'
      }, {
        id: 2,
        icon: unreportImg,
        num: 11,
        tip: '未上报人数',
        color: '#e0f3ff'
      }, {
        id: 3,
        icon: unhealthyImg,
        num: 23,
        tip: '健康异常人数',
        color: '#f2efff'
      }, {
        id: 4,
        icon: heatImg,
        num: 17,
        tip: '发热人数',
        color: '#ffdedf'
      }],
      heatId: 'heatId',
      unReportId: 'unReportId',
      userPieId: 'userPieId',
      unHealthyId: 'unHealthyId',
      heatOption: {},
      unReportOption: {},
      userPieOption: {},
      unHealthyOption: {},
      heatChart: null,
      unReportChart: null,
      userPieChart: null,
      unHealthyChart: null,
      chartHeight: ''
    }
  },
  created() {
    this.chartHeight = (document.body.clientHeight * 0.35) + 'px'
  },
  mounted() {
    this.initHeatChart()
    this.initUnReportChart()
    this.initUserPieChart()
    this.initUnHealthyChart()
  },
  methods: {
    initUnHealthyChart() {
      this.unHealthyOption = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '健康异常上报分布'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        colors: ['#ff8d8c', '#9898ff', '#9ddc93', '#69a7fe', '#d68dff', '#60b5ff'],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'

            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
            name: '发热',
            y: 61.41,
            sliced: true,
            selected: true
          }, {
            name: '咳嗽',
            y: 11.84
          }, {
            name: '腹泻',
            y: 10.85
          }, {
            name: '咽痛',
            y: 4.67
          }, {
            name: '乏力',
            y: 4.18
          }, {
            name: '鼻塞流涕',
            y: 7.05
          }]
        }]
      }
      this.unHealthyChart = new Highcharts.Chart(this.unHealthyId, this.unHealthyOption)
    },
    initHeatChart() {
      this.heatOption = {
        chart: {
          type: 'area'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '发热及健康异常趋势图'
        },
        legend: {
          verticalAlign: 'top',
          margin: 5,
          align: 'right'
        },
        xAxis: {
          allowDecimals: false
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return this.value
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y:,.0f}</b>人'
        },
        plotOptions: {
          area: {
            pointStart: 2,
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: '发热次数',
          color: '#ff0000',
          data: [0, 4, 9, 11, 7, 9, 15, 8, 3, 0]
        }, {
          name: '异常次数',
          color: '#ffac00',
          data: [1, 6, 10, 11, 9, 12, 14, 9, 5, 1]
        }]
      }
      this.heatChart = new Highcharts.Chart(this.heatId, this.heatOption)
    },
    initUnReportChart() {
      this.unReportOption = {
        chart: {
          type: 'area'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '未上报人员统计趋势'
        },
        legend: {
          verticalAlign: 'top',
          margin: 5,
          align: 'right'
        },
        xAxis: {
          allowDecimals: false
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return this.value
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y:,.0f}</b>人'
        },
        plotOptions: {
          area: {
            pointStart: 2,
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: '数量',
          color: '#0089ff',
          data: [30, 21, 16, 8, 5, 3, 1, 0, 0, 0]
        }]
      }
      this.unReportChart = new Highcharts.Chart(this.unReportId, this.unReportOption)
    },
    initUserPieChart() {
      this.userPieOption = {
        chart: {
          spacing: [40, 0, 40, 0]
        },
        credits: {
          enabled: false
        },
        title: {
          floating: true,
          text: '健康异常人员分布'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        colors: ['#ff8d8c', '#69a7fe'],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            },
            point: {
              events: {
                mouseOver: function(e) { // 鼠标滑过时动态更新标题
                // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                // chart.setTitle({
                // 	text: e.target.name+ '\t'+ e.target.y + ' %'
                // });
                }
              // click: function(e) { // 同样的可以在点击事件里处理
              //     chart.setTitle({
              //         text: e.point.name+ '\t'+ e.point.y + ' %'
              //     });
              // }
              }
            }
          }
        },
        series: [{
          type: 'pie',
          innerSize: '80%',
          name: '市场份额',
          data: [
            ['发热', 20],
            ['未发热', 70]
          ]
        }]
      }
      this.userPieChart = new Highcharts.Chart(this.userPieId, this.userPieOption)
    }
  }
}
</script>
<style lang="less" scoped>
.home{

}
  .daily-card {
    padding: 10px 30px;
    width: 23.5%;
    float: left;
    margin-left: 2%;
    height: 80px;
    border-radius: 5px;
    background-color: #fff;
    &:first-of-type{
      margin: 0;
    }
    .img-box{
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
    }
    .num {
      font-size: 24px;
      font-weight: bold;
    }
    .tip{
      font-size: 16px;
    }
  }
</style>
