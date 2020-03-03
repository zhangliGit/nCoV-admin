<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel">
      <div slot="left" class="top-btn-group">
        <a-button icon="plus" class="add-btn" @click="add()">添加</a-button>
      </div>
    </search-form>
    <choose-user ref="chooseUser" v-if="userTag" v-model="userTag" @submit="chooseUser" title="选择教职工">
    </choose-user>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="userList">
      <template v-slot:actions="action">
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">
            您确定删除吗?
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import chooseUser from '@c/ChooseUser'
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
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '10%',
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
    title: '身份',
    dataIndex: 'identity',
    width: '10%'
  },
  {
    title: '部门/班级',
    dataIndex: 'grade',
    width: '10%'
  },
  {
    title: '工号/学号',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '风险类型',
    dataIndex: 'riskType',
    width: '10%'
  },
  {
    title: '加入时间',
    dataIndex: 'startTime',
    width: '10%'
  },
  {
    title: '所属学校',
    dataIndex: 'school',
    width: '10%'
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
    value: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    list: [
      {
        key: 1,
        val: '确诊'
      },
      {
        key: 2,
        val: '疑似'
      },
      {
        key: 3,
        val: '隔离'
      }
    ],
    value: 'type',
    type: 'select',
    label: '风险类型'
  }
]
export default {
  name: 'RiskList',
  components: {
    TableList,
    SearchForm,
    chooseUser,
    PageNum
  },
  data () {
    return {
      columns,
      searchLabel,
      userTag: false,
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
      'getClassList'
    ]),
    async showList() {
      const res = await this.getClassList()
      this.userList = res.data
      this.total = res.total
    },
    add() {
      this.userTag = true
    },
    del(record) {
      console.log(record)
    },
    searchForm (values) {
      console.log(values)
    },
    chooseUser (item) {
      console.log(item)
      setTimeout(() => {
        this.$refs.chooseUser.reset()
      }, 2000)
    }
  }
}
</script>
<style lang="less" scoped>
.top{
  margin-bottom: 10px;
}
</style>
