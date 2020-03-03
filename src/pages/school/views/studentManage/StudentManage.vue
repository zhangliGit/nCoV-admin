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
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
      <div slot="upload">
        <upload-multi :length="1" v-model="fileList" :fileInfo="fileInfo" ></upload-multi>
      </div>
    </submit-form>
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
import SubmitForm from '@c/SubmitForm'
import UploadMulti from '@c/UploadMulti'
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '8%',
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
    width: '8%'
  },
  {
    title: '学号',
    dataIndex: 'num',
    width: '8%'
  },
  {
    title: '人脸照片',
    dataIndex: 'photoPic',
    width: '8%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '8%'
  },
  {
    title: '创建时间',
    dataIndex: 'startTime',
    width: '8%'
  },
  {
    title: '关联家长',
    dataIndex: 'parents',
    width: '8%'
  },
  {
    title: '家长电话',
    dataIndex: 'parentsTel',
    width: '8%'
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
    value: 'tel',
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号'
  }
]
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    value: 'grade',
    initValue: [],
    list: [
      {
        key: 1,
        val: '1班'
      },
      {
        key: 2,
        val: '2班'
      },
      {
        key: 3,
        val: '3班'
      }
    ],
    type: 'select',
    label: '班级',
    placeholder: '请选择班级'
  },
  {
    value: 'sex',
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
    value: 'num',
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
    value: 'parentName',
    initValue: '',
    type: 'input',
    label: '家长姓名',
    required: false,
    placeholder: '请输入家长姓名'
  },
  {
    value: 'parentTel',
    initValue: '',
    type: 'input',
    label: '家长手机号',
    required: false,
    placeholder: '请输入家长手机号'
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '备注',
    required: false,
    placeholder: '请输入备注'
  }
]
export default {
  name: 'StudentManage',
  components: {
    TableList,
    SearchForm,
    SubmitForm,
    UploadMulti,
    PageNum
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
        url: '/upload/base/file/freeUpload', // 接口地址
        tip: '上传图片',
        h: 120, // 高度
        w: 120 // 宽度
      },
      fileList: []
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
    add(type, record = {}) {
      this.formStatus = true
      if (type) { // 编辑
        this.formData = this.$tools.fillForm(formData, record)
      } else { // 添加
        this.formData = formData
      }
    },
    del(record) {
      console.log(record)
    },
    searchForm (values) {
      console.log(values)
    },
    submitForm (values) {
      console.log(values)
      setTimeout(() => {
        this.$refs.form.reset()
      }, 2000)
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
