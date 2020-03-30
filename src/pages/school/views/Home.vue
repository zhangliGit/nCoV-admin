<template>
  <div class="home page-layout qui-fx-ver">
    <div>
      <div class="daily-card qui-fx qui-fx-ac" v-for="item in baseList" :key="item.id">
        <div class="img-box" :style="`background:${item.color}`">
          <img :src="item.icon" alt />
        </div>
        <div class="qui-fx-f1" style="text-align:center;">
          <div class="num">{{ item.num }}</div>
          <div class="tip">{{ item.tip }}</div>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;">
      <a-row :gutter="10">
        <a-col :span="18">
          <div id="heatId" :style="{ height: chartHeight }"></div>
        </a-col>
        <a-col :span="6">
          <div id="userPieId" :style="{ height: chartHeight }"></div>
        </a-col>
      </a-row>
    </div>
    <div style="margin-top:10px;">
      <a-row :gutter="10">
        <a-col :span="18">
          <div id="unReportId" :style="{ height: chartHeight }"></div>
        </a-col>
        <a-col :span="6">
          <div id="unHealthyId" :style="{ height: chartHeight }"></div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Highcharts from 'highcharts/highstock'
import reportImg from '@a/img/report.gif'
import heatImg from '@a/img/heat.png'
import unhealthyImg from '@a/img/unhealthy.gif'
import unreportImg from '@a/img/unreport.gif'
export default {
  name: 'Home',
  data() {
    return {
      reportImg,
      baseList: [],
      heatChart: null,
      unReportChart: null,
      userPieChart: null,
      unHealthyChart: null,
      chartHeight: '',
      dailyData: {},
      symptomList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.chartHeight = document.body.clientHeight * 0.35 + 'px'
  },
  mounted() {
    this.showList()
    this.symptomGet()
    this.feverAndHealthGet()
    this.noReportGet()
  },
  methods: {
    ...mapActions('home', ['getDailyData', 'getFeverAndHealth', 'getNoReport', 'getSymptomsUser', 'getSymptomList']),
    getDateTime(date) {
      if (date === '' || date === null) {
        return '--'
      }
      const d = new Date(date)
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
        ' ' +
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
        ':' +
        (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      )
    },
    async showList() {
      const res = await this.getDailyData({
        schoolCode: this.userInfo.orgCode,
        todayTime: this.getDateTime(new Date())
      })
      this.dailyData = res.result
      this.initUserPieChart('userPieId', res.result.healthNum, res.result.noFeverNum)
      this.baseList = [
        {
          id: 1,
          icon: reportImg,
          num: res.result.reportNum,
          tip: '已上报人数',
          color: '#e6fbea'
        },
        {
          id: 2,
          icon: unreportImg,
          num: res.result.noReportNum,
          tip: '未上报人数',
          color: '#e0f3ff'
        },
        {
          id: 3,
          icon: unhealthyImg,
          num: res.result.healthNum,
          tip: '健康异常人数',
          color: '#f2efff'
        },
        {
          id: 4,
          icon: heatImg,
          num: res.result.feverNum,
          tip: '发热人数',
          color: '#ffdedf'
        }
      ]
    },
    async symptomGet() {
      const res = await this.getSymptomList()
      const result = await this.getSymptomsUser({
        schoolCode: this.userInfo.orgCode,
        todayTime: this.getDateTime(new Date())
      })
      const res1 = res.result
      this.symptomList = result.result
      for (var i = 0; i < this.symptomList.length; i++) {
        for (var j = 0; j < res1.length; j++) {
          if (this.symptomList[i].MARK === res1[j].symptomsCode) {
            this.symptomList[i].name = res1[j].symptomsName
            this.symptomList[i].y = this.symptomList[i].count1
            break
          }
        }
      }
      this.initUnHealthyChart('unHealthyId', res.result)
    },
    async initUnHealthyChart(id, data) {
      Highcharts.chart(id, {
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
        series: [
          {
            name: 'Brands',
            colorByPoint: true,
            data: data
          }
        ]
      })
    },
    async feverAndHealthGet() {
      const res = await this.getFeverAndHealth({
        schoolCode: this.userInfo.orgCode,
        startTime: this.getDateTime(new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000)),
        endTime: this.getDateTime(new Date())
      })
      const feverData = res.result.feverNum.map(item => {
        return item.num
      })
      const unnormalData = res.result.healthNum.map(item => {
        return item.num
      })
      const feverDate = res.result.feverNum.map(item => {
        return item.reportTime
      })
      this.initHeatChart('heatId', feverData, unnormalData, feverDate)
    },
    initHeatChart(id, feverData, unnormalData, feverDate) {
      Highcharts.chart(id, {
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
            formatter: function() {
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
        series: [
          {
            name: '发热次数',
            color: '#ff0000',
            data: feverData
          },
          {
            name: '异常次数',
            color: '#ffac00',
            data: unnormalData
          }
        ]
      })
    },
    async noReportGet() {
      const res = await this.getNoReport({
        schoolCode: this.userInfo.orgCode,
        startTime: this.getDateTime(new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000)),
        endTime: this.getDateTime(new Date())
      })
      const data = res.result.map(item => {
        return item.num
      })
      const date = res.result.map(item => {
        return item.reportTime
      })
      this.initUnReportChart('unReportId', data, date)
    },
    initUnReportChart(id, data, date) {
      Highcharts.chart(id, {
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
            formatter: function() {
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
        series: [
          {
            name: '数量',
            color: '#0089ff',
            data: data
          }
        ]
      })
    },
    initUserPieChart(id, healthNum, noFeverNum) {
      Highcharts.chart(id, {
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
            }
          }
        },
        series: [
          {
            type: 'pie',
            innerSize: '80%',
            name: '',
            data: [
              ['发热', healthNum],
              ['未发热', noFeverNum]
            ]
          }
        ]
      })
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
  &:first-of-type {
    margin: 0;
  }
  .img-box {
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
  .tip {
    font-size: 16px;
  }
}
</style>
