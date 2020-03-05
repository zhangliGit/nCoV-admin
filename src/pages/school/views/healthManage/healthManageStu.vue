<template>
  <div class="page-layout qui-fx">
    <grade-tree @select="select"></grade-tree>
     <div class="qui-fx-f1 qui-fx-ver">
       <search-form @search-form="searchForm" :search-label="searchLabel">
    </search-form> 
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="userList">
      <template v-slot:actions="action">
       <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
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
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import GradeTree from '@c/GradeTree'
const searchLabel = [
  {
    value: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
]
const columns = [
  {
    title: '序号',
    width: '9%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '9%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '9%',
    customRender: (text) => {
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
    title: '班级',
    dataIndex: 'grade',
    width: '9%'
  },
  {
    title: '学号',
    dataIndex: 'num',
    width: '9%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '9%'
  },
  {
    title: '关联家长',
    dataIndex: 'parents',
    width: '9%'
  },
  {
    title: '家长电话',
    dataIndex: 'parentsTel',
    width: '8%'
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'healthManageTea',
  components: {
    TableList,
    SearchForm,
    PageNum,
    GradeTree,
  },
  data () {
    return {
      columns,
     searchLabel,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      userList: []
    }
  },
  mounted () {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getStudentList'
    ]),
    async showList() {
      const res = await this.getStudentList()
      this.userList = res.data
      this.total = res.total
    },
        searchForm (values) {
      console.log(values)
    },
    goDetail (record) {
      console.log(record)
    },
      select (item) {
      console.log(item) // { name: '', code: ''}
    },
  }
}
</script>
<style lang="less" scoped>
.top{
  margin-bottom: 10px;
}
</style>
