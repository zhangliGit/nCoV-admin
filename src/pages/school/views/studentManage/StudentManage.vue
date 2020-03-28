<template>
  <div class="page-layout qui-fx">
    <div class="page-left qui-fx-ver">
      <grade-class @select="select"></grade-class>
    </div>
    <div class="page-right qui-fx-ver">
      <search-form isReset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left">
          <a-button icon="plus" class="add-btn" @click="add(0)">添加学生</a-button>
          <!--<a-button icon="export" class="export-btn">导入学生</a-button>
          <a-button icon="export" class="export-all-btn">导入人脸</a-button>-->
          <!-- <a-button icon="export" class="del-btn">导出</a-button> -->
        </div>
      </search-form>
      <submit-form
        ref="form"
        @submit-form="submitForm"
        :title="title"
        v-model="formStatus"
        :form-data="formData"
      >
        <div slot="upload">
          <upload-one :file-info="fileInfo" v-model="picUrl"></upload-one>
        </div>
      </submit-form>
      <table-list :page-list="pageList" :columns="columns" :table-list="userList">
        <template v-slot:actions="action">
          <span>{{action.record.gradeName}}{{action.record.className}}</span>
        </template>
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="编辑" @click="add(1,action.record)">
            <a-button size="small" class="edit-action-btn" icon="form"></a-button>
          </a-tooltip>
          <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
            <template slot="title">您确定删除吗?</template>
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
          <!--           <a-tooltip placement="topLeft" title="查看健康档案">
            <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
          </a-tooltip>-->
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
import SubmitForm from '@c/SubmitForm'
import UploadOne from '@c/UploadOne'
import GradeClass from '@c/GradeClass'
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
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '10%',
    customRender: text => {
      if (text === '1') {
        return '男'
      } else if (text === '2') {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: '10%',
    scopedSlots: {
      customRender: 'className'
    }
  },
  {
    title: '学号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '人脸照片',
    dataIndex: 'profilePhoto',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '10%'
  },
  {
    title: '家长',
    dataIndex: 'patriarchName',
    width: '10%'
  },
  {
    title: '电话',
    dataIndex: 'patriarchPhone',
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
    value: 'workNo',
    type: 'input',
    label: '学号',
    placeholder: '请输入学号'
  }
]
const formData = [
  {
    value: 'userName',
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
    value: 'classCode',
    initValue: [],
    list: [],
    type: 'select',
    label: '班级',
    placeholder: '请选择班级'
  },
  {
    value: 'gender',
    initValue: '1',
    required: false,
    list: [
      {
        key: '1',
        val: '男'
      },
      {
        key: '2',
        val: '女'
      }
    ],
    type: 'radio',
    label: '性别',
    placeholder: '请选择性别'
  },
  {
    value: 'workNo',
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
    value: 'patriarchName',
    initValue: '',
    type: 'input',
    label: '家长姓名',
    placeholder: '请输入家长姓名'
  },
  {
    value: 'patriarchPhone',
    initValue: '',
    type: 'input',
    label: '家长手机号',
    regular: 'phone',
    placeholder: '请输入正确手机号'
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
    GradeClass
  },
  data() {
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
      type: 0,
      id: '',
      record: null,
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
  async mounted() {
    this.getGradeInfo()
  },
  methods: {
    ...mapActions('home', ['getClassList', 'getGradeList', 'getUserList', 'addStudent', 'deleUser', 'editUser']),
    // 获取年级列表
    async getGradeInfo() {
      this.formData[1].list = []
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
      this.gradeCode = item.gradeCode
      this.classCode = item.classCode
      this.showList()
    },
    async showList(gradeCode = this.gradeCode, classCode = this.classCode, searchObj = {}) {
      const req = {
        schoolCode: this.userInfo.orgCode,
        gradeCode,
        classCode,
        userType: 2,
        ...searchObj,
        ...this.pageList
      }
      const res = await this.getUserList(req)
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    add(type, record = {}) {
      this.formStatus = true
      if (type) {
        // 编辑
        this.type = 1
        this.record = record
        console.log(record)
        this.formData = this.$tools.fillForm(formData, record)
        this.formData[2].initValue = record.className
        this.selectGrade(record.gradeCode)
        this.picUrl = record['profilePhoto']
      } else {
        // 添加
        this.type = 0
        this.formData = formData
        this.picUrl = ''
      }
    },
    async del(record) {
      console.log(record.id)
      const req = {
        id: record.id
      }
      console.log(req)
      await this.deleUser(req)
      this.$message.success('删除成功')
      setTimeout(() => {
        this.showList()
      }, 2000)
    },
    searchForm(values) {
      this.pageList.page = 1
      const searchObj = {
        userName: values.name,
        workNo: values.workNo
      }
      this.showList(this.gradeCode, this.classCode, searchObj)
    },
    async submitForm(values) {
      console.log(values)
      if (this.type) {
        const req = {
          ...values,
          schoolCode: this.userInfo.orgCode,
          profilePhoto: this.picUrl,
          id: this.record.id,
          patriarchCode: this.record.patriarchCode
        }
        const gradeCodeList = this.formData[1].list.filter(ele => {
          return ele.key === values.gradeCode
        })[0]
        req.gradeName = gradeCodeList ? gradeCodeList.val : this.record.gradeName
        const classCodeList = this.formData[2].list.filter(ele => {
          return ele.key === values.classCode
        })[0]
        req.className = classCodeList ? classCodeList.val : this.record.className
        if (Array.isArray(values.gradeCode)) {
          req.gradeCode = values.gradeCode[0]
        }
        try {
          await this.editUser(req)
        } catch (e) {
          this.$refs.form.error()
        }
        this.$message.success('编辑成功')
        setTimeout(() => {
          this.picUrl = ''
          this.showList()
          this.$refs.form.reset()
        }, 2000)
      } else {
        const req = {
          birthday: values.birthday,
          gender: values.gender,
          stuName: values.userName,
          clazzCode: values.classCode,
          gradeCode: values.gradeCode,
          parName: values.patriarchName,
          parphone: values.patriarchPhone,
          userNo: values.workNo,
          schoolCode: this.userInfo.orgCode,
          profilePhoto: this.picUrl
        }
        req.gradeName = this.formData[1].list.filter(ele => {
          return ele.key === values.gradeCode
        })[0].val
        req.clazzName = this.formData[2].list.filter(ele => {
          return ele.key === values.classCode
        })[0].val
        console.log(req)
        try {
          await this.addStudent(req)
        } catch (e) {
          this.$refs.form.error()
        }
        this.$message.success('添加成功')
        setTimeout(() => {
          this.picUrl = ''
          this.showList()
          this.$refs.form.reset()
        }, 2000)
      }
    },
    goDetail(record) {
      console.log(record)
      const obj = {
        path: '/healthManageStu',
        query: { id: record.id }
      }
      this.$router.push(obj)
    }
  }
}
</script>
<style lang="less" scoped>
.top {
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
