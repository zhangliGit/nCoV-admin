<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel">
      <!-- <div slot="left">
        <a-button icon="export" class="export-btn" @click="reportList()">导出</a-button>
      </div> -->
    </search-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="detail(action.record)"
          ></a-button>
        </a-tooltip>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import hostEnv from '@/config/host-env'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
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
    width: '7%'
  },
 {
    title: '性别',
    dataIndex: 'gender',
    width: '8%',
    customRender: text => {
      if (text === '1') {
        return '男'
      } else if (text === '2') {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '工号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: '10%'
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    width: '10%'
  },
  {
    title: '职位',
    dataIndex: 'classChargeMark',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '班主任'
      } else {
        return '教职工'
      }
    }
  },
  {
    title: '风险类型 ',
    dataIndex: 'healthyState',
    width: '10%',
    customRender: text => {
      if (parseInt(text) === 1) {
        return '疑似'
      } else if (parseInt(text) === 2) {
        return '确诊'
      } else if (parseInt(text) === 3) {
        return '健康'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '风险时间',
    dataIndex: 'riskTime',
    width: '10%',
    customRender: text => {
      return (
        new Date(text).getFullYear() +
        '-' +
        (new Date(text).getMonth() + 1 > 9 ? new Date(text).getMonth() + 1 : '0' + (new Date(text).getMonth() + 1)) +
        '-' +
        (new Date(text).getDate() > 9 ? new Date(text).getDate() : '0' + new Date(text).getDate()) +
        ' ' +
        (new Date(text).getHours() > 9 ? new Date(text).getHours() : '0' + new Date(text).getHours()) +
        ':' +
        (new Date(text).getMinutes() > 9 ? new Date(text).getMinutes() : '0' + new Date(text).getMinutes()) +
        ':' +
        (new Date(text).getSeconds() > 9 ? new Date(text).getSeconds() : '0' + new Date(text).getSeconds())
      )
    }
  },
  {
    title: '人脸图像',
    dataIndex: 'profilePhoto',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const searchLabel = [
  {
    value: 'userName',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '疑似'
      },
      {
        key: 2,
        val: '确诊'
      },
      {
        key: 3,
        val: '健康'
      }
    ],
    value: 'healthyState',
    type: 'select',
    label: '风险类型'
  },
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '上报时间'
  }
]
export default {
  name: 'ReportManageTea',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      columns,
      searchLabel,
      pageList: {
        page: 1,
        size: 20,
        userType: '1',
        schoolCode: ''
      },
      total: 0,
      userList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getreportList']),
    async showList(searchObj = {}) {
      this.pageList.schoolCode = this.userInfo.orgCode
      const res = await this.getreportList({
        ...this.pageList,
        ...searchObj
      })
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    searchForm(values) {
      this.pageList.page = 1
      const searchObj = {
        userName: values.userName,
        healthyState: values.healthyState,
        startTime:values.rangeTime["0"],
        endTime:values.rangeTime["1"]

      }
      this.showList(searchObj)
    },
    // reportList() {
    //   debugger;
    //   const schoolCode = this.userInfo.orgCode
    //   window.location.href = `${hostEnv.wangxuanzhang}/school/userinfo/exportPersonnelInfo?schoolCode=${schoolCode}&userType=1&excelUrl=`
    // },
    detail(record) {
      this.$router.push({
        path: '/component/detail',
        query: {
          id: record.userCode,
          userName: record.userName,
          gender: record.gender,
          workNo: record.workNo,
          birthday: record.birthday,
          userType: record.userType,
          riskTime: record.riskTime,
          profilePhoto: record.profilePhoto
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 10px;
}
</style>
