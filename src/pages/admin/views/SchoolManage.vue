<template>
  <div class="page-layout qui-fx-ver">
    <search-form isRest @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary">添加学校</a-button>
      </div>
    </search-form>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="详情">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del">
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
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '学校名称',
    dataIndex: 'userName',
    width: '20%'
  },
  {
    title: '学校编码',
    dataIndex: 'age',
    width: '15%'
  },
  {
    title: '管理员',
    dataIndex: 'depart',
    width: '15%'
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: '20%'
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const searchLabel = [
  {
    value: 'name', // 表单属性
    type: 'input', // 表单类型
    label: '姓名', // 表单label值
    placeholder: '请输入姓名' // 表单默认值(非必选字段)
  },
  {
    value: 'keyword', // 分类查询
    type: 'selectInput', // 表单类型
    selectType: [
      {
        key: 1,
        val: '姓名'
      },
      {
        key: 2,
        val: '工号'
      }
    ],
    placeholder: '请输入' // 表单默认值(非必选字段)
  }
]
export default {
  name: 'SchoolManage',
  components: {
    SearchForm,
    TableList,
    PageNum
  },
  data() {
    return {
      searchLabel,
      pageList: {
        page: 1,
        size: 20
      },
      total: 100,
      columns,
      userList: []
    }
  },
  methods: {
    searchForm (values) {

    },
    goDetail() {

    },
    del() {

    }
  }
}
</script>
<style lang="less" scoped></style>
