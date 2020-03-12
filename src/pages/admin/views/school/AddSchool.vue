<template>
  <a-modal
    width="650px"
    :title="title"
    v-model="visible"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    okText="提交"
    :confirmLoading="confirmLoading"
  >
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="学校名称" >
        <a-input
          placeholder="请输入学校名称"
          v-decorator="[
            'name',
            { initialValue: appForm.name, rules: [ {required: true, message: '请输入学校名称' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="学校编码" >
        <a-input
          placeholder="请输入学校编码"
          v-decorator="[
            'code',
            { initialValue: appForm.code, rules: [ { required: true, message: '请输入学校编码' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="账号" >
        <a-input
          placeholder="请输入账号"
          v-decorator="[
            'account',
            { initialValue: appForm.account, rules: [ { required: true, message: '请输入账号' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码" >
        <a-input
          placeholder="请输入密码"
          v-decorator="[
            'psdWord',
            { initialValue: appForm.psdWord, rules: [ { required: true, message: '请输入密码' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="手机号" >
        <a-input
          placeholder="请输入手机号"
          v-decorator="[
            'phone',
            { initialValue: appForm.phone, rules: [ { required: true, message: '请输入手机号' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="学段" required>
        <a-checkbox-group
          v-decorator="['checkedList',
                        { initialValue: appForm.checkedList, rules: [ { required: true, message: '请选择学制' } ]}]">
          <div class="qui-fx" style="margin-bottom:10px">
            <div style="width:80px">
              <a-checkbox :value="primary"> 小学 </a-checkbox>
            </div>
            <div style="width:300px">
              <a-select v-model="primaryStatus" allowClear>
                <a-select-option v-for="item in primaryList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="qui-fx" style="margin-bottom:10px">
            <div style="width:80px">
              <a-checkbox :value="middle"> 初中 </a-checkbox>
            </div>
            <div style="width:300px">
              <a-select v-model="middleStatus" allowClear >
                <a-select-option v-for="item in middleList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="qui-fx">
            <div style="width:80px">
              <a-checkbox :value="high"> 高中 </a-checkbox>
            </div>
            <div style="width:300px">
              <a-select v-model="highStatus" allowClear>
                <a-select-option v-for="item in middleList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>
          </div>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddSchool',
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      confirmLoading: false,
      visible: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      appForm: {
        checkedList: ['01', '02', '03']
      },
      primaryStatus: '6',
      middleStatus: '3',
      highStatus: '3',
      primaryList: [{
        key: '6',
        value: '六年制'
      }, {
        key: '5',
        value: '五年制'
      }],
      middleList: [{
        key: '3',
        value: '三年制'
      }, {
        key: '4',
        value: '四年制'
      }],
      primary: '01',
      middle: '02',
      high: '03',
      checkedList: [],
      recordId: ''
    }
  },
  methods: {
    ...mapActions('home', ['addSchool', 'updateSchool']),
    submitOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          if (this.title === '编辑学校') {
            values.id = this.recordId
            this.updateSchool(values).then(() => {
              this.$message.success('操作成功')
              setTimeout(() => {
                this.showList()
                this.visible = true
              }, 1000)
            })
          } else {
            this.addSchool(values).then(() => {
              this.$message.success('操作成功')
              setTimeout(() => {
                this.showList()
                this.visible = true
              }, 1000)
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
