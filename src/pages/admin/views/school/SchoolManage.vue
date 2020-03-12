<template>
  <div class="page-layout qui-fx-ver">
    <!-- <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form> -->
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn" @click="modify(0)">新增学校</a-button>
    </div>
    <table-list :page-list="pageList" :columns="columns" :table-list="schoolList">
      <template v-slot:actions="action">
        <!-- <a-tooltip placement="topLeft" title="详情">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
        </a-tooltip>-->
        <a-tooltip placement="topLeft" title="编辑">
          <a-button
            size="small"
            class="edit-action-btn"
            icon="form"
            @click="modify(1,action.record)"
          ></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del">
          <template slot="title">您确定删除吗?</template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <add-school ref="addSchool" :title="title"></add-school>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
// import SubmitForm from '@c/SubmitForm'
import AddSchool from './AddSchool'
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '学校名称',
    max: 50,
    placeholder: '请输入学校名称'
  }, {
    value: 'org',
    initValue: '',
    type: 'input',
    label: '学校编码',
    max: 50,
    placeholder: '请输入学校编码'
  }, {
    value: 'account',
    initValue: '',
    type: 'input',
    label: '账号',
    max: 50,
    placeholder: '请输入账号'
  }, {
    value: 'psdWord',
    initValue: '',
    type: 'input',
    label: '密码',
    max: 50,
    placeholder: '请输入密码'
  },
  // {
  //   value: 'admin',
  //   initValue: '',
  //   type: 'input',
  //   label: '管理员',
  //   max: 50,
  //   placeholder: '请输入管理员'
  // },
  {
    value: 'phone',
    initValue: '',
    type: 'input',
    label: '手机号',
    max: 50,
    placeholder: '请输入手机号'
  }
]
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  }, {
    title: '学校名称',
    dataIndex: 'name',
    width: '20%'
  }, {
    title: '学校编码',
    dataIndex: 'code',
    width: '15%'
  }, {
    title: '账号',
    dataIndex: 'account',
    width: '10%'
  }, {
    title: '密码',
    dataIndex: 'psdWord',
    width: '10%'
  },
  // {
  //   title: '管理员',
  //   dataIndex: 'admin',
  //   width: '15%'
  // },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: '20%'
  }, {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'SchoolManage',
  components: {
    TableList,
    PageNum,
    // SubmitForm,
    AddSchool
  },
  data() {
    return {
      pageList: {
        page: 1,
        size: 20
      },
      total: 100,
      columns,
      schoolList: [],
      title: '新增学校',
      // formStatus: false,
      formData
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getSchoolList', 'addSchool', 'updateSchool', 'delSchool']),
    // goDetail(record) {
    //   this.$router.push({
    //     query: {
    //       id: record.id
    //     },
    //     path: './schoolDetail'
    //   })
    // },
    async showList() {
      const res = await this.getSchoolList(this.pageList)
      this.schoolList = res.data
      this.total = res.total
    },
    del(record) {
      this.delSchool({ id: record.id }).then(() => {
        this.$message.success('操作成功')
        this.showList()
      })
      console.log(record)
    },
    modify(type, record) {
      this.$refs.addSchool.visible = true
      // this.formStatus = true
      if (type) {
        this.$refs.addSchool.recordId = record.id
        this.$refs.addSchool.appForm = record
        this.title = '编辑学校'
      } else {
        this.title = '新增学校'
      }
    }
    // submitForm(values) {
    //   console.log(values)
    //   this.$refs.form.reset() // 成功调用
    //   this.$refs.form.error() // 失败调用
    // }
  }
}
</script>
<style lang="less" scoped></style>
