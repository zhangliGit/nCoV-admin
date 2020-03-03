<template>
  <div class="page-layout qui-fx-ver">
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn">添加班级</a-button>
      <a-button icon="export" class="export-btn">导出</a-button>
    </div>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="新增">
          <a-button size="small" class="add-action-btn" icon="plus" @click="addTeacher(action.record)"></a-button>
        </a-tooltip>
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
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: '10%'
  },
  {
    title: '班级',
    dataIndex: 'class',
    width: '10%'
  },
  {
    title: '班主任',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '班级人数',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '已加入学生',
    dataIndex: 'num2',
    width: '10%'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '10%'
  },
  {
    title: '创建时间',
    dataIndex: 'startTime',
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
export default {
  name: 'ClassManage',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data () {
    return {
      columns,
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
    addTeacher(record) {
      console.log(record)
    },
    del(record) {
      console.log(record)
    }
  }
}
</script>
<style lang="less" scoped>
.top{
  margin-bottom: 10px;
}
</style>
