<template>
  <div class="page-layout qui-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <div>
      <a-button icon="plus" class="add-btn" @click="modify">新增</a-button>
    </div>
    <table-list
      :page-list="pageList"
      :columns="schoolColumns"
      :table-list="schoolList">
      <template v-slot:actions="action">
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">
            您确定解绑该学校吗?
          </template>
          <a-tooltip placement="topLeft" title="解绑">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <choose-school ref="chooseSchool" v-model="userTag" @submit="chooseSchool" title="选择学校">
    </choose-school>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubmitForm from '@c/SubmitForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import chooseSchool from './ChooseSchool'
const userColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: '手机',
    dataIndex: 'phone',
    width: '35%'
  },
  {
    title: '操作',
    width: '35%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const schoolColumns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '学校名称',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: '学校编码',
    dataIndex: 'code',
    width: '15%'
  },
  {
    title: '管理员',
    dataIndex: 'admin',
    width: '20%'
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: '20%'
  },
  {
    title: '操作',
    width: '25%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '姓名',
    max: 50, // 最大长度
    placeholder: '请输入姓名'
  }, {
    value: 'phone',
    initValue: '',
    type: 'input',
    label: '手机号',
    max: 50, // 最大长度
    placeholder: '请输入手机号'
  }
]
export default {
  name: 'OrgDetail',
  components: {
    TableList,
    PageNum,
    SubmitForm,
    chooseSchool
  },
  data() {
    return {
      formStatus: false,
      formData,
      tabActive: '1',
      userColumns,
      schoolColumns,
      userList: [
        {
          id: '1',
          name: '管理员',
          phone: '13209320193'
        }
      ],
      schoolList: [],
      title: '添加管理员',
      pageList: {
        page: 1,
        size: 20
      },
      total: 100,
      userTag: false
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getSchoolList']),
    async showList() {
      const res = await this.getSchoolList(this.pageList)
      this.schoolList = res.data
      this.total = res.total
    },
    del() {

    },
    modify() {
      console.log(this.tabActive)
      if (this.tabActive === '1' && this.userList.length === 0) {
        this.formStatus = true
      } else {
        this.userTag = true
      }
    },
    submitForm (values) {
      console.log(values)
      setTimeout(() => {
        this.$refs.form.reset() // 成功调用
        // this.$refs.form.error() // 失败调用
      }, 2000)
    },
    edit() {
      this.formStatus = true
    },
    chooseSchool (item) {
      console.log(item)
      setTimeout(() => {
        this.$refs.chooseSchool.reset()
      }, 2000)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
