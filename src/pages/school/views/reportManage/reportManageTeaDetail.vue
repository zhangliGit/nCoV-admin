<template>
  <div class="leave-detail page-layout qui-fx-ver">
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">基本信息</a-menu-item>
    </a-menu>
    <div class="info qui-fx-wp">
      <p v-for="item in detailInfo" :key="item.key">
        <span>{{ item.key }}</span>
        <span>:</span>
        <span>{{ item.val }}</span>
      </p>
    </div>
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">体检数据</a-menu-item>
    </a-menu>
    <div class="info qui-fx-wp">
      <p v-for="item in detailInfo" :key="item.key">
        <span>{{ item.key }}</span>
        <span>:</span>
        <span>{{ item.val }}</span>
      </p>
    </div>
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">体温走势</a-menu-item>
    </a-menu>
    <div style="margin-top:10px;">
      <chart-component :style="{height:chartHeight}" :id="unReportId" :option="unReportOption"></chart-component>
    </div>
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">疫情上报记录</a-menu-item>
    </a-menu>
    <div class="qui-fx-f1 qui-fx-ver">
      <table-list is-zoom :page-list="pageList" :columns="columns" :table-list="detailList"></table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import ChartComponent from '../component/ChartComponent'
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '5%',
    customRender: text => {
      if (text === 1) {
        return '男'
      } else if (text === 2) {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '10%'
  },
  {
    title: '测量位置',
    dataIndex: 'position',
    width: '10%'
  },
  {
    title: '发热状态',
    dataIndex: 'feverstatus',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '未发热'
      } else if (text === 2) {
        return '轻微'
      } else {
        return '高烧'
      }
    }
  },
  {
    title: '附带症状',
    dataIndex: 'Incidentalsymptoms',
    width: '10%'
  },
  {
    title: '是否接触疫情人员',
    dataIndex: 'isno',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '有'
      } else if (text === 2) {
        return '没有'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '上报人',
    dataIndex: 'ReportPerson',
    width: '10%'
  },
  {
    title: '上报时间',
    dataIndex: 'ReportTime',
    width: '10%'
  }
]
export default {
  name: 'ReportManageTeaDetail',
  components: {
    TableList,
    PageNum,
    ChartComponent
  },
  data() {
    return {
      pageList: {
        page: 1,
        size: 20
      },
      unReportId: 'unReportId',
      unReportOption: {},
      total: 0,
      columns,
      detailList: [],
      detailId: '',
      baseList: [],
      detailInfo: [
        {
          key: '姓名',
          val: '张三'
        },
        {
          key: '组织机构',
          val: '教务处'
        },
        {
          key: '请假事由',
          val: '事假'
        },
        {
          key: '是否出校',
          val: '是'
        },
        {
          key: '请假时间',
          val: '2019-12-10'
        },
        {
          key: '请假时长',
          val: '24小时'
        },
        {
          key: '审批状态',
          val: '审批通过'
        }
      ]
    }
  },

  mounted() {
    this.initUnReportChart()
    this.showList()
  },
  created() {
    this.chartHeight = document.body.clientHeight * 0.35 + 'px'
  },
  methods: {
    ...mapActions('home', ['getreportList']),
    async showList() {
      const res = await this.getreportList(this.pageList)
      this.detailList = res.data
      this.total = res.total
    },
    initUnReportChart() {
      this.unReportOption = {
        chart: {
          type: 'areaspline'
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
          allowDecimals: false
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
        series: [
          {
            name: '温度',
            color: 'rgb(105, 167, 254)',
            data: [0, 10, 20, 30, 40, 30, 20, 10, 9, 0]
          }
        ]
      }
      this.unReportChart = new Highcharts.Chart(this.unReportId, this.unReportOption)
    }
  }
}
</script>
<style lang="less" scoped>
.leave-detail {
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
.leave-detail {
  background: #fff;
  .info,
  .pic {
    margin-top: 20px;
    padding: 0 20px;
    p {
      margin-right: 50px;
      span {
        margin: 0 5px;
      }
    }
  }
  .pic {
    margin-top: 0;
  }
  .title {
    margin: 10px;
    p {
      margin: 0;
      font-weight: bold;
    }
  }
  .process {
    width: 400px;
    margin: 10px;
    img {
      width: 60px;
      height: 60px;
      background: #ddd;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
}
</style>
