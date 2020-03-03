<template>
  <div class="page-layout qui-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <choose-user ref="chooseUser" v-if="userTag" v-model="userTag" @submit="chooseUser" title="选择教职工">
    </choose-user>
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn" @click="addClass()">添加班级</a-button>
      <a-button icon="export" class="export-btn">导出</a-button>
    </div>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="绑定班主任">
          <a-button size="small" class="add-action-btn" icon="plus" @click="addTeacher()"></a-button>
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
import SubmitForm from '@c/SubmitForm'
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
const formData = [
  {
    value: 'className',
    initValue: '',
    type: 'input',
    label: '年级',
    placeholder: '请输入年级名称'
  },
  {
    value: 'classNum',
    initValue: '',
    type: 'input',
    label: '新增班级数',
    placeholder: '请输入新增班级个数'
  },
  {
    value: 'startNum',
    initValue: '',
    type: 'input',
    label: '起始编号',
    placeholder: '请输入起始编号'
  }
]
export default {
  name: 'ClassManage',
  components: {
    TableList,
    SearchForm,
    SubmitForm,
    chooseUser,
    PageNum
  },
  data () {
    return {
      columns,
      formData,
      title: '添加班级',
      formStatus: false,
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
    addClass() {
      this.formStatus = true
    },
    addTeacher() {
      this.userTag = true
    },
    del(record) {
      console.log(record)
    },
    submitForm (values) {
      console.log(values)
      setTimeout(() => {
        this.$refs.form.reset()
      }, 2000)
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
