<template>
  <div class="page-layout qui-fx-ver">
    <a-modal title="邀请教职工" :footer="null" v-model="teacherVisible" @ok="teacherVisible = false">
      <img
        style="widht: 200px; height: 200px; display: block; margin: 0 auto;"
        :src="
          'http://qr.liantu.com/api.php?text=http://canpointtest.com/mobile-protal/shareTeacher?schoolCode=' + userInfo.orgCode
        "
        alt=""
      />
      <div style="text-align: center; padding-top: 10px; font-size: 14px;">
        请使用微信扫描二维码，然后分享给教职工进行绑定注册
      </div>
    </a-modal>
    <search-form isReset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="plus" class="add-btn" @click="add(0)">添加教职工</a-button>
        <a-button icon="plus" class="share-btn" @click="teacherVisible = true">邀请教职工</a-button>
        <!--
        <a-button icon="export" class="export-btn">导入教职工</a-button>
        <a-button icon="export" class="export-all-btn">导入人脸</a-button>
        <a-button icon="export" class="del-btn">导出</a-button> -->
      </div>
    </search-form>
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
      <div slot="upload">
        <upload-one :file-info="fileInfo" v-model="picUrl"></upload-one>
      </div>
    </submit-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑" @click="add(1, action.record)">
          <a-button size="small" class="edit-action-btn" icon="form"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">您确定删除吗?</template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
        <!-- <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="goDetail(action.record)"
          ></a-button>
        </a-tooltip> -->
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import SubmitForm from '@c/SubmitForm'
import UploadOne from '@c/UploadOne'
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index',
    },
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '10%',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '10%',
    customRender: (text) => {
      if (text === '1') {
        return '男'
      } else if (text === '2') {
        return '女'
      } else {
        return '未知'
      }
    },
  },
  {
    title: '职位',
    dataIndex: 'classChargeMark',
    width: '10%',
    customRender: (text) => {
      if (text === '1') {
        return '班主任'
      } else if (text === '2') {
        return '教职工'
      }
    },
  },
  {
    title: '工号',
    dataIndex: 'workNo',
    width: '10%',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: '10%',
  },
  {
    title: '人脸照片',
    dataIndex: 'profilePhoto',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic',
    },
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '10%',
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action',
    },
  },
]
const searchLabel = [
  {
    value: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名',
  },
  {
    value: 'phone',
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号',
  },
]
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名',
  },
  {
    value: 'phone',
    initValue: '',
    type: 'input',
    label: '手机号',
    placeholder: '请输入正确的手机号',
    regular: 'phone',
  },
  {
    value: 'classChargeMark',
    initValue: '1',
    list: [
      {
        key: '1',
        val: '班主任',
      },
      {
        key: '2',
        val: '教职工',
      },
    ],
    type: 'radio',
    label: '职位',
    placeholder: '请选择职位',
  },
  {
    value: 'gender',
    initValue: '1',
    list: [
      {
        key: '1',
        val: '男',
      },
      {
        key: '2',
        val: '女',
      },
    ],
    type: 'radio',
    label: '性别',
    placeholder: '请选择性别',
  },
  {
    value: 'workNo',
    initValue: '',
    type: 'input',
    required: false,
    label: '工号',
    placeholder: '请输入工号',
  },
  {
    type: 'upload',
    required: false,
    label: '人脸照片',
  },
  {
    value: 'birthday',
    type: 'singleTime',
    label: '生日',
    required: false,
    initValue: '',
    placeholder: '请选择生日',
  },
]
export default {
  name: 'TeacherManage',
  components: {
    TableList,
    SearchForm,
    SubmitForm,
    UploadOne,
    PageNum,
  },
  data() {
    return {
      teacherVisible: false,
      columns,
      searchLabel,
      formData,
      title: '添加教职工',
      formStatus: false,
      pageList: {
        page: 1,
        size: 20,
      },
      total: 0,
      type: 0,
      record: null,
      userList: [],
      fileInfo: {
        url: '', // 接口地址
        tip: '上传图片',
        h: 120, // 高度
        w: 120, // 宽度
      },
      picUrl: '',
    }
  },
  computed: {
    ...mapState('home', ['userInfo']),
  },
  mounted() {
    this.fileInfo.url = `/api-pc-ncov/school/userinfo/uploadFile?schoolCode=${this.userInfo.orgCode}`
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getUserList', 'addTeacher', 'deleUser', 'editUser']),
    async showList(searchObj = {}) {
      const req = {
        schoolCode: this.userInfo.orgCode,
        userType: 1,
        ...this.pageList,
        ...searchObj,
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
        this.picUrl = record['profilePhoto']
        this.formData = this.$tools.fillForm(formData, record)
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
        id: record.id,
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
        phone: values.phone,
      }
      this.showList(searchObj)
    },
    submitForm(values) {
      console.log(values)
      if (this.type) {
        const req = {
          ...values,
          schoolCode: this.userInfo.orgCode,
          profilePhoto: this.picUrl,
          id: this.record.id,
        }
        console.log(req)
        req.userNo = values.workNo
          this.editUser(req).then(res => {
            this.$message.success('编辑成功')
            setTimeout(() => {
              this.picUrl = ''
              this.showList()
              this.$refs.form.reset()
            }, 2000)
          }).catch(() => {
          this.$refs.form.error()
        })
      } else {
        const req = {
          ...values,
          schoolCode: this.userInfo.orgCode,
          profilePhoto: this.picUrl,
        }
        console.log(req)
        req.userNo = values.workNo
          this.addTeacher(req).then(res => {
            this.$message.success('添加成功')
            setTimeout(() => {
              this.picUrl = ''
              this.showList()
              this.$refs.form.reset()
            }, 2000)
          }).catch(() => {
          this.$refs.form.error()
        })
      }
    },
    goDetail(record) {
      const obj = {
        path: '/reportManageTea/detail',
        query: { id: record.id },
      }
      this.$router.push(obj)
    },
  },
}
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 10px;
}
</style>
