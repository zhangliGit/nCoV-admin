<template>
  <div class="page-layout qui-fx">
    <!-- <grade-tree @select="select"></grade-tree> -->
    <div class="qui-fx-f1 qui-fx-ver">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import GradeTree from '@c/GradeTree'
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
        val: '发热'
      },
      {
        key: 2,
        val: '未发热'
      }
    ],
    value: 'status',
    type: 'select',
    label: '发热状态'
  },
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '上报时间'
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
      customRender: 'profilePhoto'
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
    PageNum,
  },
  data() {
    return {
      searchLabel,
      columns,
      total: 100,
     pageList: {
        page: 1,
        size: 20,
        userType: '2'
      },
      userList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getreportList']),
    async showList() {
      const res = await this.getreportList(this.pageList)
      this.userList = res.result.list
      this.total = res.total
    },
    searchForm(values) {
    this.pageList = Object.assign(values, this.pageList)
      this.showList()   
   },
    detail(record) {
      console.log(record.id)
      this.$router.push({
      path: '/component/detail',
        query: { id: record.userCode }
      })
    },
    select(item) {
      console.log(item)
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
