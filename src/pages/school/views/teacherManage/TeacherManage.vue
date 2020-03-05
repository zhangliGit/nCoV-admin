<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel">
      <div slot="left" class="top-btn-group">
        <a-button icon="plus" class="add-btn" @click="add(0)">添加教职工</a-button>
        <a-button icon="plus" class="add-btn">邀请教职工</a-button>
        <a-button icon="export" class="export-btn">导入教职工</a-button>
        <a-button icon="export" class="export-all-btn">导入人脸</a-button>
        <a-button icon="export" class="del-btn">导出</a-button>
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
        <upload-multi :length="1" v-model="fileList" :fileInfo="fileInfo"></upload-multi>
      </div>
    </submit-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="userList">
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
        <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="goDetail(action.record)"
          ></a-button>
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
    width: '10%',
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
    width: '10%',
    customRender: text => {
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
    title: '职位',
    dataIndex: 'position',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '班主任'
      } else if (text === 2) {
        return '非班主任'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '工号',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    width: '10%'
  },
  {
    title: '人脸照片',
    dataIndex: 'photoPic',
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
    value: 'tel',
    initValue: '',
    type: 'input',
    label: '手机号',
    placeholder: '手机号'
  },
  {
    value: 'position',
    initValue: 1,
    list: [
      {
        key: 1,
        val: '班主任'
      },
      {
        key: 2,
        val: '非班主任'
      }
    ],
    type: 'radio',
    label: '职位',
    placeholder: '请选择职位'
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
    value: 'num',
    initValue: '',
    type: 'input',
    required: false,
    label: '工号',
    placeholder: '请输入工号'
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
  }
]
export default {
  name: 'TeacherManage',
  components: {
    TableList,
    SearchForm,
    SubmitForm,
    UploadMulti,
    PageNum
  },
  data() {
    return {
      columns,
      searchLabel,
      formData,
      title: '添加学教职工',
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
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getTeacherList']),
    async showList() {
      const res = await this.getTeacherList()
      this.userList = res.data
      this.total = res.total
    },
    add(type, record = {}) {
      this.formStatus = true
      if (type) {
        // 编辑
        this.fileList = []
        this.formData = this.$tools.fillForm(formData, record)
        this.fileList.push({ uid: record.id, url: record.photoPic })
      } else {
        // 添加
        this.formData = formData
        this.fileList = []
      }
    },
    del(record) {
      console.log(record)
    },
    searchForm(values) {
      console.log(values)
    },
    submitForm(values) {
      console.log(values)
      setTimeout(() => {
        this.$refs.form.reset()
      }, 2000)
    },
    goDetail(record) {
      const obj = {
        path: '/reportManageTea/detail',
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
</style>
