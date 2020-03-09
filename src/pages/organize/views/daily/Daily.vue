<template>
  <div class="daily page-layout qui-fx-ver">
    <div class="top">
      <a-row :gutter="14">
        <a-col :span="8">
          <div class="gutter-box qui-fx-jsb">
            <div class="left">
              <h1>
                {{ schoolData.schoolNum }}
                <span>所</span>
              </h1>
              <p>隶属学校</p>
            </div>
            <div class="right">
              <img :src="xxImg" alt />
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="gutter-box">
            <div class="gutter-box qui-fx-jsb">
              <div class="left">
                <h1>
                  {{ schoolData.studentNum }}
                  <span>人</span>
                </h1>
                <p>学生人数</p>
              </div>
              <div class="right">
                <img :src="xsImg" alt />
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="gutter-box">
            <div class="gutter-box qui-fx-jsb">
              <div class="left">
                <h1>
                  {{ schoolData.teacherNum }}
                  <span>人</span>
                </h1>
                <p>教职工人数</p>
              </div>
              <div class="right">
                <img :src="jzgImg" alt />
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="mid">
      <a-row :gutter="14">
        <a-col :span="16">
          <div class="gutter-box" :style="{height:midHeight}">
            <div class="title">
              <h3>体温异常态势</h3>
            </div>
            <div id="container" :style="{height: charHeight}"></div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="gutter-box" :style="{height:midHeight}">
            <div class="title">
              <h3>疫情上报态势</h3>
            </div>
            <div id="container1" :style="{height: charHeight}"></div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="bottom">
      <div class="gutter-box qui-fx-ver" :style="{height:autoHeight}">
        <div class="qui-fx-jsb">
          <div class="title">
            <h3>疫情日报</h3>
          </div>
          <div class="momth">
            <a-month-picker :allowClear="false" :defaultValue="chooseMonth" @change="panelChange" />
          </div>
        </div>
        <table-list :page-list="pageList" :columns="columns" :table-list="userList"></table-list>
        <!-- <page-num v-model="pageList" :total="total" @change-page="showList"></page-num> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import Highcharts from 'highcharts/highstock'
import xsImg from '@a/img/organize/xs.png'
import xxImg from '@a/img/organize/xx.png'
import jzgImg from '@a/img/organize/jzg.png'
import moment from 'moment'
const columns = [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: '20%'
  },
  {
    title: '实上报/应上报（学生）',
    dataIndex: 'studentNum',
    width: '20%'
  },
  {
    title: '体温异常学生',
    dataIndex: 'anomalyStudent',
    width: '20%'
  },
  {
    title: '实上报/应上报（教职工）',
    dataIndex: 'teacherNum',
    width: '20%'
  },
  {
    title: '体温异常教职工',
    dataIndex: 'anomalyTeacher',
    width: '20%'
  }
]
export default {
  name: 'Daily',
  components: {
    TableList,
    PageNum
  },
  data() {
    return {
      columns,
      moment,
      xsImg,
      xxImg,
      jzgImg,
      xDate: [],
      chooseMonth: moment(new Date()),
      midHeight: '300px',
      charHeight: '270px',
      autoHeight: '200px',
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      userList: [],
      schoolData: {
        schoolNum: 0,
        studentNum: 0,
        teacherNum: 0
      }
    }
  },
  created() {
    this.midHeight = document.body.clientHeight * 0.35 + 'px'
    this.charHeight = document.body.clientHeight * 0.35 - 30 + 'px'
    this.autoHeight = document.body.clientHeight * 0.65 - 275 + 'px'
    this.showBaseData()
  },
  mounted() {
    for (var i = 0; i < 14; i++) {
      this.xDate.unshift(moment(new Date(new Date().setDate(new Date().getDate() - i))).format('MM-DD'))
    }
    this.showBI('container', this.xDate)
    this.showLine('container1', this.xDate.slice(-7))
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getBaseData', 'getDailyList']),
    async showBaseData() {
      const res = await this.getBaseData()
      this.schoolData = res.data
    },
    async showList() {
      const res = await this.getDailyList()
      this.userList = res.data
      this.total = res.total
    },
    panelChange(value) {
      console.log(value.format('YYYY-MM'))
    },
    showBI(id, xDate) {
      Highcharts.chart(id, {
        chart: {
          type: 'column'
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        legend: {
          verticalAlign: 'top',
          margin: 5,
          align: 'right'
        },
        xAxis: {
          categories: xDate,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '人/天'
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} 人</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        series: [
          {
            name: '学生',
            color: '#2163da',
            data: [49, 71, 69, 32, 56, 24, 12, 34, 54, 78, 21, 43, 57, 81]
          },
          {
            name: '教职工',
            color: '#ffb944',
            data: [3, 4, 8, 2, 1, 1, 4, 2, 2, 3, 2, 1, 4, 3]
          }
        ]
      })
    },
    showLine(id, xDate) {
      Highcharts.chart(id, {
        chart: {
          type: 'area'
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: xDate
        },
        yAxis: {
          title: {
            text: '人/次'
          }
        },
        legend: {
          verticalAlign: 'top',
          margin: 5,
          align: 'right'
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormatter: function() {
            return '<span style="color:this.series.color"></span>' + this.series.name + '：' + this.y + '人'
          }
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#3e52c1',
              lineWidth: 1
            }
          }
        },
        series: [
          {
            name: '未上报',
            marker: {
              symbol: 'square'
            },
            data: [50, 43, 56, 63, 35, 25, 41]
          }
        ]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.daily {
  .title {
    padding: 5px 0 0 10px;
    height: 25px;
    line-height: 25px;
    h3 {
      background: url('../li.png') no-repeat left center;
      text-indent: 15px;
      margin-bottom: 0;
    }
  }
  .top,
  .mid,
  .bottom {
    margin: 5px 5px 10px 5px;
    .gutter-box {
      background: #fff;
      border-radius: 4px;
    }
  }
  .top {
    .gutter-box {
      .left {
        margin: 20px 0 20px 40px;
        h1 {
          margin-bottom: 0;
          color: #2163da;
          span {
            margin-left: 10px;
            font-size: 12px;
          }
        }
        p {
          margin-bottom: 0;
          font-size: 12px;
          color: #999;
        }
      }
      .right {
        margin: 20px 40px 20px 0;
        img {
          width: 66px;
          height: 66px;
          border-radius: 100%;
        }
      }
    }
  }
  .bottom {
    .gutter-box {
      .momth {
        margin: 5px;
        height: 33px;
      }
    }
  }
}
</style>
