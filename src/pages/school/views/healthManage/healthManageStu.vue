<template>
  <div class="student-leave page-layout qui-fx">
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="page-right qui-fx-ver">
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
import SearchForm from '@c/SearchForm'
import GradeTree from '@c/GradeTree'
import PageNum from '@c/PageNum'
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
    width: '6%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '6%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '6%',
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
    title: '部门',
    dataIndex: 'grade',
    width: '6%'
  },
  {
    title: '工号',
    dataIndex: 'num',
    width: '6%'
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '6%',
  },
  {
    title: '测量位置',
    dataIndex: 'remark',
    width: '7%'
  },
  {
    title: '发热状态',
    dataIndex: 'startTime',
    width: '6%'
  },
  {
    title: '附带症状',
    dataIndex: 'parents',
    width: '6%'
  },
  {
    title: '是否接触疫情人员',
    dataIndex: 'parentsTel',
    width: '8%'
  },  {
    title: '健康状态',
    dataIndex: 'parentsTel',
    width: '6%'
  },  {
    title: '上报人',
    dataIndex: 'parentsTel',
    width: '6%'
  },  {
    title: '上报时间',
    dataIndex: 'parentsTel',
    width: '8%'
  },  {
    title: '所属学校',
    dataIndex: 'parentsTel',
    width: '8%'
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
  name: 'reportManageStu',
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
        size: 20
      },
      userList: []
    }
  },
  mounted () {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getClassList'
    ]),
    async showList() {
      const res = await this.getClassList()
      this.userList = res.data
      this.total = res.total
    },
    searchForm (values) {
      console.log(values)
    },
    submitForm (values) {
      console.log(values)
      setTimeout(() => {
        this.$refs.form.reset()
      }, 2000)
    },
    goDetail (record) {
      console.log(record)
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
