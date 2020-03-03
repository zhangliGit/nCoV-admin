<template>
  <div class="page-layout qui-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <!-- <detail-show :detail-info="detailInfo" :title="title"></detail-show> -->
    <div style="height:100px;background:#fff;">
      <a-tabs>
        <a-tab-pane tab="基本信息">
          <a-row style="padding-left:10px;">
            <a-col v-for="(item,index) in detailInfo" :key="index" :span="12">
              {{ item.key }} : {{ item.val }}
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="qui-fx-f1" style="background:#fff;">
      <a-tabs>
        <a-tab-pane tab="管理员" >
          <table-list :columns="columns" :table-list="userList">
            <template v-slot:actions="action">
              <a-tooltip placement="topLeft" title="编辑">
                <a-button size="small" class="edit-action-btn" icon="form" @click="modify(1,action.record)"></a-button>
              </a-tooltip>
            </template>
          </table-list>
        </a-tab-pane>
        <a-tooltip
          placement="topLeft"
          title="添加管理员"
          slot="tabBarExtraContent"
          v-if=" userList.length === 0"
          @click="modify(0)">
          <a-button size="small" class="add-action-btn" icon="plus"></a-button>
        </a-tooltip>
      </a-tabs>
    </div>
  </div>
</template>

<script>
// import DetailShow from '@c/DetailShow'
import SubmitForm from '@c/SubmitForm'
import TableList from '@c/TableList'
const columns = [
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
  name: 'SchoolDetail',
  components: {
    // DetailShow
    TableList,
    SubmitForm
  },
  data() {
    return {
      formStatus: false,
      formData,
      tabActive: '1',
      columns,
      detailInfo: [
        {
          key: '学校名称',
          val: '摄像头'
        },
        {
          key: '学校编码',
          val: '启用'
        }
      ],
      userList: [
        {
          id: '1',
          name: '管理员',
          phone: '13209320193'
        }
      ],
      title: '新增管理员'
    }
  },
  methods: {
    showList() {

    },
    modify(type, record) {
      if (type) {
        this.title = '更改管理员'
      } else {
        this.title = '新增管理员'
      }
      console.log(this.tabActive)
      this.formStatus = true
    },
    submitForm (values) {
      console.log(values)
      setTimeout(() => {
        this.$refs.form.reset() // 成功调用
        // this.$refs.form.error() // 失败调用
      }, 2000)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
