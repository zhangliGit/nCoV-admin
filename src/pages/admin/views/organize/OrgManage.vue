<template>
  <div class="page-layout qui-fx-ver">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn" @click="modify(0)">新增机构</a-button>
    </div>
    <table-list :page-list="pageList" :columns="columns" :table-list="orgList" @clickNum="clickNum">
      <template v-slot:totalNums="number">
        <a-tag color="green" @click="clickNum(number.record)">{{ number.record.number }}</a-tag>
      </template>
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
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">您确定删除吗?</template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="changePage"></page-num>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
const formData = [
  {
    value: 'organizationName',
    initValue: '',
    type: 'input',
    label: '机构名称',
    max: 50,
    placeholder: '请输入机构名称'
  },
  {
    value: 'organizationCode',
    initValue: '',
    type: 'input',
    label: '机构编码',
    max: 50,
    placeholder: '请输入机构编码'
  },
  {
    value: 'manageName',
    initValue: '',
    type: 'input',
    label: '管理员姓名',
    max: 50,
    placeholder: '请输入管理员姓名'
  },
  {
    value: 'phone',
    initValue: '',
    type: 'input',
    label: '手机号',
    max: 12,
    placeholder: '请输入正确的手机号',
    regular: 'phone'
  },
  {
    value: 'password',
    initValue: '',
    type: 'input',
    label: '密码',
    max: 20,
    regular: 'password',
    placeholder: '请输入密码, 密码只允许字母、数字、下划线'
  }
  // {
  //   value: 'admin',
  //   initValue: '',
  //   type: 'input',
  //   label: '管理员',
  //   max: 50,
  //   placeholder: '请输入管理员'
  // },
]
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '机构名称',
    dataIndex: 'organizationName',
    width: '14%'
  },
  {
    title: '机构编码',
    dataIndex: 'organizationCode',
    width: '12%'
  },
  {
    title: '管理员姓名',
    dataIndex: 'manageName',
    width: '14%'
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: '14%'
  },
  {
    title: '密码',
    dataIndex: 'password',
    width: '14%'
  },
  // {
  //   title: '管理员',
  //   dataIndex: 'admin',
  //   width: '15%'
  // },
  {
    title: '关联学校数',
    // dataIndex: 'num',
    width: '10%',
    scopedSlots: {
      customRender: 'totalNum'
    }
  },
  {
    title: '操作',
    width: '14%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'OrgManage',
  components: {
    TableList,
    PageNum,
    SubmitForm
  },
  data() {
    return {
      pageList: {
        page: 1,
        size: 20,
        organizationType: '1'
      },
      total: 0,
      columns,
      orgList: [],
      title: '新增机构',
      formStatus: false,
      formData,
      recordId: '',
      managerId: ''
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getOrgList', 'addOrg', 'delOrg', 'updateOrg']),
    goDetail(record) {
      this.$router.push({
        query: {
          id: record.id
        },
        path: './orgDetail'
      })
    },
    async showList() {
      const res = await this.getOrgList(this.pageList)
      this.orgList = res.result.list
      this.total = res.result.totalCount
    },
    changePage(page, size) {
      this.pageList.organizationType = '1'
      this.showList()
    },
    del(record) {
      this.delOrg(record.id).then(() => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      })
    },
    modify(type, record) {
      this.formStatus = true
      if (type) {
        this.title = '编辑机构'
        this.recordId = record.id
        this.managerId = record.managerId
        this.formData = this.$tools.fillForm(formData, record)
      } else {
        this.title = '新增机构'
        this.formData = this.$tools.fillForm(formData, {})
      }
    },
    async submitForm(values) {
      values.organizationType = '1'
      // console.log(values)
      try {
        let res
        if (this.title === '编辑机构') {
          values.id = this.recordId
          values.managerId = this.managerId
          res = await this.updateOrg(values)
        } else {
          res = await this.addOrg(values)
        }
        if (res.message === 'SUCCESS' || res.message === '操作成功') {
          this.$message.success('操作成功')
          this.formStatus = false
          this.$tools.goNext(() => {
            this.showList()
            this.$refs.form.reset()
          })
        }
      } catch (err) {
        this.$refs.form.error()
      }
    },
    clickNum(record) {
      this.$router.push({
        query: {
          pcode: record.organizationCode
        },
        path: '/orgManage/orgDetail'
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
