<template>
  <div class="home page-layout qui-fx-ver">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn" @click="formStatus = true">新增类型</a-button>
    </div>
    <table-list :columns="columns" :table-list="yqList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" class="edit-action-btn" icon="form" @click="formStatus = true"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del">
          <template slot="title">您确定删除吗?</template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
  </div>
</template>

<script>
import TableList from '@c/TableList'
import SubmitForm from '@c/SubmitForm'
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '风险类型',
    max: 50,
    placeholder: '请输入风险类型'
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
    title: '疫情类型',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    width: '30%'
  },
  {
    title: '操作',
    width: '30%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'Type',
  components: { TableList, SubmitForm },
  data() {
    return {
      title: '新增类型',
      formStatus: false,
      formData,
      columns,
      yqList: [
        {
          id: 1,
          name: '确诊',
          time: '2010-03-05'
        },
        {
          id: 2,
          name: '疑似',
          time: '2010-03-05'
        },
        {
          id: 3,
          name: '隔离',
          time: '2010-03-05'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    submitForm() {
      this.formStatus = false
    }
  }
}
</script>
<style lang="less" scoped></style>
