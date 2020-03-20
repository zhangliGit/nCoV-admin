<template>
  <div class="page-layout qui-fx">
    <div class="page-left qui-fx-ver">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="page-right qui-fx-ver">
      <search-form isReset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left" class="top-btn-group">
          <a-button icon="plus" class="add-btn" @click="add(0)">添加学生</a-button>
          <!--<a-button icon="export" class="export-btn">导入学生</a-button>
          <a-button icon="export" class="export-all-btn">导入人脸</a-button> -->
          <a-button icon="export" class="del-btn">导出</a-button>
        </div>
      </search-form>
      <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
        <div slot="upload">
          <upload-one :file-info="fileInfo" v-model="picUrl"></upload-one>
        </div>
      </submit-form>
      <table-list
        :page-list="pageList"
        :columns="columns"
        :table-list="userList">
        <template v-slot:actions="action">
          <span>{{action.record.gradeName}}{{action.record.className}}</span>
        </template>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import SubmitForm from '../component/SubmitForm'
import UploadOne from '@c/UploadOne'
import GradeTree from '../component/GradeTree'
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
    dataIndex: 'userName',
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
    dataIndex: 'className',
    width: '9%',
    scopedSlots: {
      customRender: 'className'
    }
  },
  {
    title: '学号',
    dataIndex: 'workNo',
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
    width: '9%'
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
    value: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    value: 'workNo',
    type: 'input',
    label: '学号',
    placeholder: '请输入学号'
  }
]
const formData = [
  {
    value: 'stuName',
    initValue: '',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    value: 'gradeCode',
    initValue: [],
    list: [],
    type: 'select',
    label: '年级',
    placeholder: '请选择年级'
  },
  {
    value: 'clazzCode',
    initValue: [],
    list: [],
    type: 'select',
    label: '班级',
    placeholder: '请选择班级'
  },
  {
    value: 'gender',
    initValue: 1,
    required: false,
    list: [
      {
        key: 1,
        val: '男'
      },
      {
        key: 2,
        val: '女'
      }
    ],
    type: 'radio',
    label: '性别',
    placeholder: '请选择性别'
  },
  {
    value: 'userNo',
    initValue: '',
    type: 'input',
    required: false,
    label: '学号',
    placeholder: '请输入学号'
  },
  {
    type: 'upload',
    required: false,
    label: '人脸照片'
  },
  {
    value: 'birthday',
    type: 'singleTime',
    label: '生日',
    required: false,
    initValue: '',
    placeholder: '请选择生日'
  },
  {
    value: 'parName',
    initValue: '',
    type: 'input',
    label: '家长姓名',
    required: false,
    placeholder: '请输入家长姓名'
  },
  {
    value: 'parphone',
    initValue: '',
    type: 'input',
    label: '家长手机号',
    required: false,
    placeholder: '请输入家长手机号'
  }
]
export default {
  name: 'StudentManage',
  components: {
    TableList,
    SearchForm,
    SubmitForm,
    UploadOne,
    PageNum,
    GradeTree
  },
  data () {
    return {
      columns,
      searchLabel,
      formData,
      title: '添加学生',
      formStatus: false,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      userList: [],
      fileInfo: {
        url: '', // 接口地址
        tip: '上传图片',
        h: 120, // 高度
        w: 120 // 宽度
      },
      picUrl: '',
      gradeCode: '',
      classCode: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.fileInfo.url = `/admin/school/userinfo/uploadFile?schoolCode=${this.userInfo.orgCode}`
    this.formData[1].selectGrade = this.selectGrade
  },
  mounted () {
    this.getGradeInfo()
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getClassList', 'getGradeList', 'getUserList', 'addStudent'
    ]),
    // 获取年级列表
    async getGradeInfo() {
      const req = {
        schoolCode: this.userInfo.orgCode
      }
      const res = await this.getGradeList(req)
      res.result.forEach(ele => {
        this.formData[1].list.push({
          key: ele.gradeCode,
          val: ele.gradeName
        })
      })
    },
    // 选择年级班级
    async selectGrade(val) {
      console.log(val)
      this.formData[2].list = []
      const req = {
        schoolCode: this.userInfo.orgCode,
        gradeCode: val
      }
      const res = await this.getClassList(req)
      res.result.forEach(ele => {
        this.formData[2].list.push({
          key: ele.classCode,
          val: ele.className
        })
      })
    },
    // 切换班级
    select(item) {
      console.log(item)
      this.gradeCode = item.gradeId
      if (item.gradeId === item.key) {
        this.classCode = ''
      } else {
        this.classCode = item.key
      }
      this.showList()
    },
    async showList(gradeCode = this.gradeCode, classCode = this.classCode, searchObj = {}) {
      const req = {
        schoolCode: this.userInfo.orgCode,
        gradeCode,
        classCode,
        userType: 2,
        ...searchObj
      }
      const res = await this.getUserList(req)
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    add(type, record = {}) {
      this.formStatus = true
      if (type) { // 编辑
        this.picUrl = ''
        this.formData = this.$tools.fillForm(formData, record)
        this.fileList.push({ uid: record.id, url: record.photoPic })
      } else { // 添加
        this.formData = formData
        this.picUrl = ''
      }
    },
    del(record) {
      console.log(record)
    },
    searchForm (values) {
      console.log(values)
      const searchObj = {
        userName: values.name,
        workNo: values.workNo
      }
      this.showList(this.gradeCode, this.classCode, searchObj)
    },
    async submitForm (values) {
      console.log(values)
      const req = {
        ...values,
        schoolCode: this.userInfo.orgCode,
        profilePhoto: this.picUrl
      }
      req.gradeName = this.formData[1].list.filter(ele => {
        return ele.key === values.gradeCode
      })[0].val
      req.clazzName = this.formData[2].list.filter(ele => {
        return ele.key === values.clazzCode
      })[0].val
      console.log(req)
      await this.addStudent(req)
      this.$message.success('添加成功')
      setTimeout(() => {
        this.picUrl = ''
        this.showList()
        this.$refs.form.reset()
      }, 2000)
    },
    goDetail (record) {
      console.log(record)
      const obj = {
        path: '/healthManageTea/detail',
        query: { id: record.id }
      }
      this.$router.push(obj)
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
