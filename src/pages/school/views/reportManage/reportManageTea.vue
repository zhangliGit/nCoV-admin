<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel">
      <div slot="left" class="top-btn-group">
        <a-button icon="export" class="del-btn">导出</a-button>
      </div>
    </search-form>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="detail(action.record)"></a-button>
        </a-tooltip>
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
    title: '温度',
    dataIndex: 'temperature',
    width: '10%',
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
     customRender: (text) => {
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
    width: '10%',
  },
  {
    title: '是否接触疫情人员',
    dataIndex: 'isno',
    width: '10%',
     customRender: (text) => {
      if (text === 1) {
        return '有'
      } else if (text === 2) {
        return '没有'
      } else {
        return '未知'
      }
    }
  },    {
    title: '上报人',
    dataIndex: 'ReportPerson',
    width: '10%'
  },  {
    title: '上报时间',
    dataIndex: 'ReportTime',
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
export default {
  name: 'reportManageTea',
  components: {
    TableList,
    SearchForm,
    PageNum
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
      'getreportList'
    ]),
    async showList() {
      const res = await this.getreportList()
      this.userList = res.data
      this.total = res.total
    },
    searchForm (values) {
      console.log(values)
    },
     detail(record) {
      console.log(record.id)
      this.$router.push({
        path: '/reportManageTea/detail',
        query: { id: record.id }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.top{
  margin-bottom: 10px;
}
</style>
