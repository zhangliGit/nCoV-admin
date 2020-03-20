<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel">
      <div slot="left" class="top-btn-group">
        <a-button icon="export" class="export-btn">导出</a-button>
      </div>
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
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '8%',
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
      if (text === 1) {
        return '疑似'
      } else if (text === 2) {
        return '确诊'
      } else {
        return '健康'
      }
    }
  },
  {
    title: '风险时间',
    dataIndex: 'riskTime',
    width: '10%'
  },
  {
    title: '人脸图像',
    dataIndex: 'profilePhoto',
    width: '10%',
    scopedSlots: {
      customRender: 'profilePhoto'
    }
  },
  {
    title: '操作',
    width: '7%',
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
    value: 'riskTime',
    type: 'rangeTime',
    label: '上报时间'
  }
]
export default {
  name: 'reportManageTea',
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
        schoolCode: '',
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
    async showList() {
       this.pageList.schoolCode = this.userInfo.orgCode
      const res = await this.getreportList(this.pageList)
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    searchForm(values) {
      this.pageList = Object.assign(values, this.pageList)
      this.showList()
      console.log(values)
    },
    detail(record) {
      this.$router.push({
        path: '/component/detail',
        query: {
          id: record.userCode,
          userName: record.userName,
          gender: record.gender,
          workNo: record.workNo,
          birthday: record.birthday,
          classChargeMark: record.classChargeMark,
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
