<template>
  <div class="page-layout qui-fx">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <choose-user ref="chooseUser" v-if="userTag" v-model="userTag" @submit="chooseUser" title="选择教职工">
    </choose-user>
    <div class="page-left qui-fx-ver">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="page-right qui-fx-ver">
      <div class="top-btn-group" style="padding: 8px 0 15px 0;">
        <a-button icon="plus" class="add-btn" @click="addClass()">添加班级</a-button>
        <!-- <a-button icon="export" class="export-btn">导出</a-button> -->
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
      <!-- <page-num v-model="pageList" :total="total" @change-page="showList"></page-num> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import SubmitForm from '@c/SubmitForm'
import chooseUser from '@c/ChooseUser'
import GradeTree from '../component/GradeTree'
const columns = [
  {
    title: '序号',
    width: '20%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '年级',
    dataIndex: 'grade_name',
    width: '20%'
  },
  {
    title: '班级',
    dataIndex: 'class_name',
    width: '20%'
  },
  {
    title: '班主任',
    dataIndex: 'user_name',
    width: '20%'
  },
  /*   {
    title: '班级人数',
    dataIndex: 'num',
    width: '14%'
  },
  {
    title: '已加入学生',
    dataIndex: 'num2',
    width: '14%'
  }, */
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const formData = [
  {
    value: 'gradeName',
    initValue: [],
    list: [],
    type: 'select',
    label: '年级',
    placeholder: '请输入年级名称'
  },
  {
    value: 'classNum',
    initValue: '',
    type: 'input',
    label: '新增班级数',
    placeholder: '请输入新增班级个数'
  }
]
export default {
  name: 'ClassManage',
  components: {
    TableList,
    SearchForm,
    SubmitForm,
    chooseUser,
    PageNum,
    GradeTree
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
      gradeList: [],
      userList: [],
      gradeCode: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.getGradeInfo()
    this.showList('')
  },
  async mounted () {
  },
  methods: {
    ...mapActions('home', [
      'getClassList', 'getGradeList', 'bathAddClass', 'deleteClass', 'getClassInfoList'
    ]),
    // 获取年级列表
    async getGradeInfo() {
      const req = {
        schoolCode: this.userInfo.orgCode
      }
      const res = await this.getGradeList(req)
      res.result.forEach(ele => {
        this.formData[0].list.push({
          key: ele.gradeCode,
          val: ele.gradeName
        })
      })
    },
    select(item) {
      console.log(item)
      this.gradeCode = item.gradeId
      this.showList()
    },
    async showList(gradeCode = this.gradeCode) {
      const req = {
        schoolCode: this.userInfo.orgCode,
        gradeCode
      }
      const res = await this.getClassInfoList(req)
      this.userList = res.result
    },
    addClass() {
      this.formStatus = true
    },
    addTeacher() {
      this.userTag = true
    },
    // 删除班级
    async del(record) {
      console.log(record)
      const req = {
        id: record.id,
        schoolCode: record.school_code,
        classCode: record.class_code
      }
      await this.deleteClass(req)
      this.$message.success('删除成功')
      setTimeout(() => {
        this.showList()
      }, 2000)
    },
    // 添加班级
    async submitForm (values) {
      console.log(values)
      const gradeName = this.formData[0].list.filter(ele => {
        if (ele.key === values.gradeName) {
          return ele
        }
      })[0].val
      console.log(gradeName)
      const req = {
        schoolCode: this.userInfo.orgCode,
        gradeCode: values.gradeName,
        classNum: values.classNum,
        gradeName
      }
      await this.bathAddClass(req)
      this.$message.success('操作成功')
      setTimeout(() => {
        this.$refs.form.reset()
        this.showList()
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
  .page-left {
    background: #fff;
    margin-right: 10px;
  }
  .page-right {
    width: 100%;
  }
</style>
