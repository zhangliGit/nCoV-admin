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
    </a-menu>
    <div class="process qui-fx-jsb qui-fx-ac">
      <img :src="detailInfo.profilePhoto" alt />
      <a-row class="padd-l10">
        <a-col class="mar-b10" :span="12">姓名 : {{ detailInfo.userName}}</a-col>
        <a-col class="mar-b10" :span="12">性别 : {{ detailInfo.gender ? '女' : '男'}}</a-col>
        <a-col class="mar-b10" :span="12">工号 : {{ detailInfo.workNo}}</a-col>
        <a-col class="mar-b10" :span="12">生日 : {{detailInfo. birthday}}</a-col>
        <a-col class="mar-b10" :span="12">职位 : {{ detailInfo.classChargeMark}}</a-col>
        <a-col class="mar-b10" :span="12">风险时间 : {{ detailInfo.riskTime}}</a-col>
      </a-row>
    </div>
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">体验数据</a-menu-item>
    </a-menu>
    <div class="process qui-fx-jsb qui-fx-ac">
      <a-row class="padd-l10">
        <a-col class="mar-b10" :span="24">
          <a-button class="add-btn" @click="updateReport()">更新体检数据</a-button>
        </a-col>
        <a-col class="mar-b10" :span="12">身高 :</a-col>
        <a-col class="mar-b10" :span="12">体重 :</a-col>
        <a-col class="mar-b10" :span="12">视力 :</a-col>
        <a-col class="mar-b10" :span="12">重大病史 :</a-col>
        <a-col class="mar-b10" :span="12">家族病史 :</a-col>
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
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
const formData = [
  {
    value: 'userHeight',
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
    dataIndex: 'userName',
    width: '5%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '7%',
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
    title: '人员类型',
    dataIndex: 'userType',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '教职工'
      } else {
        return '学生'
      }
    }
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '5%'
  },
  {
    title: '上报区间',
    dataIndex: 'timeInterval',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '上午'
      } else {
        return '下午'
      }
    }
  },
  {
    title: '发热状态',
    dataIndex: 'feverMark',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '发热'
      } else {
        return '未发热'
      }
    }
  },
  {
    title: '附带症状',
    dataIndex: 'symptoms',
    width: '10%'
  },
  {
    title: '是否接触疫情人员 ',
    dataIndex: 'mark01',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    title: '健康状态',
    dataIndex: 'classChargeMark',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '正常'
      } else {
        return '异常'
      }
    }
  },
  {
    title: '上报人',
    dataIndex: 'reportPersonName',
    width: '10%'
  },
  {
    title: '上报时间',
    dataIndex: 'reportTime',
    width: '12%'
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
      title: '更新体检数据',
      formStatus: false,
      pageList: {
        page: 1,
        size: 20
      },
      unReportId: 'unReportId',
      unReportOption: {},
      total: 0,
      columns,
      detailList: [],
      detailData: '',
      detailInfo: '',
      reportTime: [],
      temperature: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  activated() {
    this.getTemperature()
    this.initUnReportChart()
    this.showList()
    this.getReportList()
  },
  created() {
    this.chartHeight = document.body.clientHeight * 0.35 + 'px'
  },
  methods: {
    ...mapActions('home', ['getLatestMedicalInfo', 'updateInfo', 'getTemperatureData', 'getReportInfoList']),
    //更新体检数据
    updateReport(record) {
      this.formStatus = true
      this.recordId = record.id
      this.formData = this.$tools.fillForm(formData, record)
    },
    submitForm(values) {
      console.log(values)
      try {
        let res
        values.id = this.recordId
        // res = await this.updateInfo(values)
        if (res.message === 'SUCCESS' || res.message === '操作成功') {
          const msg = '添加成功'
          this.$message.success(msg)
          this.formStatus = false
          setTimeout(() => {
            this.showList()
            this.$refs.form.reset()
          }, 1000)
        }
      } catch (err) {
        this.$refs.form.error()
      }
    },
    //获取体检数据加个人信息
    async showList() {
      this.detailInfo = this.$route.query
      const userCode = this.$route.query.id
      const schoolCode = this.userInfo.orgCode
      const req = 'userCode=' + userCode + '&schoolCode=' + schoolCode
      const res = await this.getLatestMedicalInfo(req)
      this.detailData = res.result
    },
    //获取个人体温数据
    async getTemperature() {
      const userCode = this.$route.query.id
      this.schoolCode = this.userInfo.orgCode
      const par =
        'userCode=' +
        userCode +
        '&schoolCode=CANPOINT' +
        '&startTime=2020-03-09 12:12：12' +
        '&endTime=2020-03-19 12:12:12'
      const res = await this.getTemperatureData(par)
      this.reportTime = []
      this.temperature = []
      res.result.forEach(item => {
        this.reportTime.push(item.reportTime)
        this.temperature.push(item.temperature)
      })
      // this.initUnReportChart();
    },
    //获取上报信息记录
    async getReportList() {
      const res = await this.getReportInfoList(this.pageList)
      this.detailList = res.result.list
      this.total = res.result.totalCount
      console.log(this.total)
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
          type: 'datetime',
          categories: this.reportTime
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y}</b>℃'
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
            data: this.temperature
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
