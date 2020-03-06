<template>
  <div class="leave-detail page-layout qui-fx-ver">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">基本信息</a-menu-item>
      <a-button class="add-btn" @click="updateReport()">更新档案</a-button>
    </a-menu>
    <div class="process qui-fx-jsb qui-fx-ac">
      <img :src="approveImg" alt />
      <a-row class="padd-l10">
        <a-col
          v-for="item in detailInfo"
          :key="item.key"
          :span="12"
          class="mar-b10"
        >{{ item.key }} : {{ item.val }}</a-col>
      </a-row>
    </div>
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">体验数据</a-menu-item>
    </a-menu>
    <div class="process qui-fx-jsb qui-fx-ac">
      <a-row class="padd-l10">
        <a-col
          v-for="item in detailData"
          :key="item.key"
          :span="12"
          class="mar-b10"
        >{{ item.key }} : {{ item.val }}</a-col>
      </a-row>
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
import SubmitForm from '@c/SubmitForm'
const formData = [
  {
    value: 'hight',
    initValue: '',
    type: 'input',
    label: '身高',
    placeholder: '请输入身高'
  },
  {
    value: 'weight',
    initValue: '',
    type: 'input',
    label: '体重',
    placeholder: '请输入体重'
  },
  {
    value: 'vision',
    initValue: '',
    type: 'input',
    label: '视力',
    placeholder: '请输入视力'
  },
  {
    value: 'majordicalhistory',
    initValue: '',
    type: 'input',
    label: '重大病史',
    placeholder: '请输入重大病史'
  },
  {
    value: 'familydicalhistory',
    initValue: '',
    type: 'input',
    label: '家族病史',
    placeholder: '请输入家族病史'
  }
]
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
  name: 'PersonalDetail',
  components: {
    TableList,
    PageNum,
    ChartComponent,
    SubmitForm
  },
  data() {
    return {
      formData,
      title: '更新健康档案',
      formStatus: false,
      approveImg: '',
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
      detailData: [
        {
          key: '身高  ',
          val: '175'
        },
        {
          key: '体重',
          val: '50kg'
        },
        {
          key: '视力',
          val: '5.1'
        },
        {
          key: '重大病史',
          val: 'XXXXXXXXXXXXXXXXXXX'
        },
        {
          key: '家族病史',
          val: 'XXXXXXXXXXXXXXXXXX'
        }
      ],
      detailInfo: [
        {
          key: '姓名',
          val: '张三'
        },
        {
          key: '性别',
          val: '男'
        },
        {
          key: '出生年月',
          val: '1994-9-17'
        },
        {
          key: '年龄',
          val: '26'
        },
        {
          key: '部门',
          val: '研发部'
        },
        {
          key: '建档时间',
          val: '2018-03-19'
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
    updateReport() {
      this.formStatus = true
    },
    submitForm(values) {
      console.log(values)
    },
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
          categories: ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9']
        },
        credits: {
          enabled: false
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
          pointFormat: '{series.name} <b>{point.y:,.0f}</b>℃'
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
            name: '体温',
            color: 'rgb(105, 167, 254)',
            data: [0, 36, 37, 38, 39, 38, 37, 36, 0]
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
    width: 600px;
    margin: 20px;
    img {
      width: 60px;
      height: 60px;
      background: #ddd;
      margin-right: 10px;
    }
  }
}
</style>
