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
import { mapState, mapActions } from 'vuex'
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
      baseList: [],
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
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.chartHeight = (document.body.clientHeight * 0.35) + 'px'
  },
  mounted() {
    this.showList()
    this.initHeatChart()
    this.initUnReportChart()
    this.initUserPieChart()
    this.initUnHealthyChart()
  },
  methods: {
    ...mapActions('home', ['getDailyData', 'getFeverAndHealth', 'getNoReport', 'getSymptomsUser']),
    getDateTime (date) {
      if (date === '' || date === null) {
        return '--'
      }
      const d = new Date(date)
      return d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' ' +
            (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' +
              d.getMinutes()) +
            ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
    },
    async showList() {
      const req = `schoolCode=${this.userInfo.orgCode}&todayTime=${this.getDateTime(new Date())}`
      const res = await this.getDailyData(req)
      this.baseList = [{
        id: 1,
        icon: reportImg,
        num: res.result.reportNum,
        tip: '已上报人数',
        color: '#e6fbea'
      }, {
        id: 2,
        icon: unreportImg,
        num: res.result.noReportNum,
        tip: '未上报人数',
        color: '#e0f3ff'
      }, {
        id: 3,
        icon: unhealthyImg,
        num: res.result.healthNum,
        tip: '健康异常人数',
        color: '#f2efff'
      }, {
        id: 4,
        icon: heatImg,
        num: res.result.feverNum,
        tip: '发热人数',
        color: '#ffdedf'
      }]
    },
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
    async initHeatChart() {
      const req = `schoolCode=${this.userInfo.orgCode}&startTime=${this.getDateTime(new Date((new Date()).getTime() - 15 * 24 * 60 * 60 * 1000))}&endTime=${this.getDateTime(new Date())}`
      const res = await this.getFeverAndHealth(req)
      const feverData = res.result.feverNum.map(item => {
        return item.num
      })
      const unnormalData = res.result.healthNum.map(item => {
        return item.num
      })
      const feverDate = res.result.feverNum.map(item => {
        return item.reportTime
      })
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
          allowDecimals: false,
          categories: feverDate
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
            pointStart: 0,
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
          data: feverData
        }, {
          name: '异常次数',
          color: '#ffac00',
          data: unnormalData
        }]
      }
      this.heatChart = new Highcharts.Chart(this.heatId, this.heatOption)
    },
    async initUnReportChart() {
      const req = `schoolCode=${this.userInfo.orgCode}&startTime=${this.getDateTime(new Date((new Date()).getTime() - 15 * 24 * 60 * 60 * 1000))}&endTime=${this.getDateTime(new Date())}`
      const res = await this.getNoReport(req)
      console.log('+++++getNoReport', res)
      const data = res.result.map(item => {
        return item.num
      })
      const date = res.result.map(item => {
        return item.reportTime
      })
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
          allowDecimals: false,
          categories: date
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
            pointStart: 0,
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
          data: data
        }]
      }
      this.unReportChart = new Highcharts.Chart(this.unReportId, this.unReportOption)
    },
    async initUserPieChart() {
      const req = `schoolCode=${this.userInfo.orgCode}&todayTime=${this.getDateTime(new Date())}`
      const res = await this.getSymptomsUser(req)
      console.log('+++++getSymptomsUser', res)
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
