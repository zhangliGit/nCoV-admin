<template>
  <div class="page-layout qui-fx">
    <grade-tree @select="select"></grade-tree>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form @search-form="searchForm" :search-label="searchLabel">
        <div slot="left" class="top-btn-group">
          <a-button icon="export" class="export-btn" @click="reportList()">导出</a-button>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import GradeTree from '../component/GradeTree'
import PageNum from '@c/PageNum'
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
    value: 'riskTime',
    type: 'rangeTime',
    label: '上报时间'
  }
]
const columns = [
  {
    title: '序号',
    width: '10%',
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
    width: '10%',
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
    title: '学号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: '10%'
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    width: '10%'
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
    width: '15%',
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
export default {
  name: 'ReportManageStu',
  components: {
    GradeTree,
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      searchLabel,
      columns,
      total: 100,
      pageList: {
        page: 1,
        size: 20,
        userType: '2',
        schoolCode: '',
        gradeCode: '',
        classCode: ''
      },
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
    select(item) {
      this.gradeCode = item.gradeId
      if (item.gradeId !== item.key) {
        this.classCode = item.key
      }
      this.showList()
    },
    async showList() {
      this.pageList.schoolCode = this.userInfo.orgCode
      this.pageList.gradeCode = this.gradeCode
      this.pageList.classCode = this.classCode
      const res = await this.getreportList(this.pageList)
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    searchForm(values) {
      this.pageList = Object.assign(values, this.pageList)
      this.showList()
    },
       reportList() {
      const schoolCode = this.userInfo.orgCode
      window.location.href ='http://wxz-test-001.natapp1.cc/school/userinfo/exportPersonnelInfo?schoolCode=' +schoolCode+'&userType=2&excelUrl=1'   
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
.student-leave {
  .page-left {
    background: #fff;
    margin-right: 10px;
  }
}
</style>
