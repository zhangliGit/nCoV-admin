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
      <a-button icon="plus" class="add-btn" @click="modify(0)">新增类型</a-button>
    </div>
    <table-list :columns="columns" :table-list="yqList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" class="edit-action-btn" icon="form" @click="modify(1, action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
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
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SubmitForm from '@c/SubmitForm'
const formData = [
  {
    value: 'riskName',
    initValue: '',
    type: 'input',
    label: '风险类型',
    max: 50,
    placeholder: '请输入风险类型'
  }, {
    value: 'remarks',
    initValue: '',
    type: 'input',
    label: '备注',
    max: 50,
    required: false,
    placeholder: '请输入备注'
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
    dataIndex: 'riskName',
    width: '15%'
  },
  {
    title: '疫情编码',
    dataIndex: 'riskCode',
    width: '20%'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: '20%',
    customRender: (text) => {
      return new Date(text).getFullYear() + '-' +
            ((new Date(text).getMonth() + 1) > 9 ? new Date(text).getMonth() + 1 : '0' +
            (new Date(text).getMonth() + 1)) + '-' + (new Date(text).getDate() > 9 ? new Date(text).getDate() : '0' +
            new Date(text).getDate()) + ' ' + (new Date(text).getHours() > 9 ? new Date(text).getHours() : '0' +
            new Date(text).getHours()) + ':' + (new Date(text).getMinutes() > 9 ? new Date(text).getMinutes() : '0' +
            new Date(text).getMinutes()) + ':' + (new Date(text).getSeconds() > 9 ? new Date(text).getSeconds() : '0' + new Date(text).getSeconds())
    }
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: '15%'
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
  name: 'Type',
  components: { TableList, SubmitForm },
  data() {
    return {
      title: '新增类型',
      formStatus: false,
      formData,
      columns,
      yqList: [],
      recordId: ''
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getRiskList', 'addRisk', 'updateRisk', 'delRisk']),
    async showList() {
      const res = await this.getRiskList()
      this.yqList = res.result
    },
    modify(type, record) {
      this.formStatus = true
      if (type) {
        this.title = '编辑类型'
        this.recordId = record.id
        this.formData = this.$tools.fillForm(formData, record)
      } else {
        this.title = '新增类型'
        this.formData = this.$tools.fillForm(formData, {})
      }
    },
    async submitForm (values) {
      console.log(values)
      try {
        let res
        if (this.title === '编辑类型') {
          values.id = this.recordId
          res = await this.updateRisk(values)
        } else {
          res = await this.addRisk(values)
        }
        if (res.message === 'SUCCESS' || res.message === '操作成功') {
          const msg = this.type ? '编辑成功' : '添加成功'
          this.$message.success(msg)
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
    del(record) {
      this.delRisk(record.id).then(() => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
