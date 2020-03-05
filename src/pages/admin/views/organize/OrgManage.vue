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
    <table-list :page-list="pageList" :columns="columns" :table-list="orgList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="详情">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="goDetail(action.record)"
          ></a-button>
        </a-tooltip>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '机构名称',
    max: 50,
    placeholder: '请输入机构名称'
  },
  {
    value: 'org',
    initValue: '',
    type: 'input',
    label: '机构编码',
    max: 50,
    placeholder: '请输入机构编码'
  }
]
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '机构名称',
    dataIndex: 'name',
    width: '20%'
  },
  {
    title: '机构编码',
    dataIndex: 'code',
    width: '15%'
  },
  {
    title: '管理员',
    dataIndex: 'admin',
    width: '15%'
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: '20%'
  },
  {
    title: '操作',
    width: '20%',
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
        size: 20
      },
      total: 100,
      columns,
      orgList: [
        {
          id: 1,
          name: '里斯',
          code: 'JSAD',
          admin: '张三',
          phone: '13340909011'
        }
      ],
      title: '新增机构',
      formStatus: false,
      formData
    }
  },
  mounted() {},
  methods: {
    ...mapActions('home', ['']),
    goDetail(record) {
      this.$router.push({
        query: {
          id: record.id
        },
        path: '/orgManage/orgDetail'
      })
    },
    showList() {},
    del(record) {
      console.log(record)
    },
    modify(type, record) {
      this.formStatus = true
      if (type) {
        this.title = '编辑机构'
      } else {
        this.title = '新增机构'
      }
    },
    submitForm(values) {
      console.log(values)
      this.$refs.form.reset() // 成功调用
      // this.$refs.form.error() // 失败调用
    }
  }
}
</script>
<style lang="less" scoped></style>
