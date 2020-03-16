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
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
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
    label: '账号',
    max: 50,
    placeholder: '请输入账号'
  }, {
    value: 'password',
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
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  }, {
    title: '机构名称',
    dataIndex: 'organizationName',
    width: '14%'
  }, {
    title: '机构编码',
    dataIndex: 'organizationCode',
    width: '12%'
  }, {
    title: '账号',
    dataIndex: 'manageName',
    width: '14%'
  }, {
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
    title: '手机号码',
    dataIndex: 'phone',
    width: '14%'
  }, {
    title: '关联学校数',
    // dataIndex: 'num',
    width: '10%',
    scopedSlots: {
      customRender: 'num'
    }
  }, {
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
      total: 100,
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
    del(record) {
      console.log(record)
      this.delOrg(record.id).then(() => {
        this.$message.success('操作成功')
        this.showList()
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
      }
    },
    async submitForm (values) {
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
          const msg = this.type ? '编辑成功' : '添加成功'
          this.$message.success(msg)
          this.formStatus = false
          setTimeout(() => {
            this.showList()
            this.$refs.form.reset()
          }, 1000)
        }
      } catch (err) {
        this.$refs.form.error()
      }
    },
    clickNum(record) {
      console.log(record)
      this.$router.push({
        query: {
          id: record.id
        },
        path: '/orgManage/orgDetail'
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
