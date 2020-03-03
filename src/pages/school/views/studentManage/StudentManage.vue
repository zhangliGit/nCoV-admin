<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel">
      <div slot="left" class="top-btn-group">
        <a-button icon="plus" class="add-btn" @click="add(0)">添加学生</a-button>
        <a-button icon="export" class="export-btn">导入学生</a-button>
        <a-button icon="export" class="export-all-btn">导入人脸</a-button>
        <a-button icon="export" class="del-btn">导出</a-button>
      </div>
    </search-form>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑" @click="add(1,action.record)">
          <a-button size="small" class="edit-action-btn" icon="form"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">
            您确定删除吗?
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
        <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
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
    title: '人脸照片',
    dataIndex: 'photoPic',
    width: '9%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '9%'
  },
  {
    title: '创建时间',
    dataIndex: 'startTime',
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
    width: '9%'
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
    value: 'tel',
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号'
  }
]
export default {
  name: 'StudentManage',
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
      'getClassList'
    ]),
    async showList() {
      const res = await this.getClassList()
      this.userList = res.data
      this.total = res.total
    },
    add(record) {
      console.log(record)
    },
    del(record) {
      console.log(record)
    },
    searchForm (values) {

    },
    goDetail (record) {
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
