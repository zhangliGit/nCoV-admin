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
      <a-form-item v-bind="formItemLayout" label="学校名称">
        <a-input
          placeholder="请输入学校名称"
          v-decorator="[
            'organizationName',
            { initialValue: appForm.organizationName, rules: [ {required: true, message: '请输入学校名称' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="学校编码">
        <a-input
          placeholder="请输入学校编码"
          v-decorator="[
            'organizationCode',
            { initialValue: appForm.organizationCode, rules: [ { required: true, message: '请输入学校编码' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="管理员姓名">
        <a-input
          placeholder="管理员姓名"
          v-decorator="[
            'manageName',
            { initialValue: appForm.manageName, rules: [ { required: true, message: '管理员姓名' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="手机号">
        <a-input
          placeholder="请输入手机号"
          v-decorator="[
            'phone',
            { initialValue: appForm.phone, rules: [
              { required: true, message: '请输入正确的手机号' ,pattern: rules.phone}
            ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码">
        <a-input
          placeholder="请输入密码"
          v-decorator="[
            'password',
            { initialValue: appForm.password, rules: [ { required: true, message: '请输入6-16密码' }, { pattern: /^[a-zA-Z0-9_]+$/, message: '请输入密码, 密码只允许字母、数字、下划线'} ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="学段" required>
        <a-checkbox-group
          v-decorator="['checkedList',
                        { initialValue: appForm.checkedList, rules: [ { required: true, message: '请选择学制' } ]}]"
        >
          <div class="qui-fx" style="margin-bottom:10px">
            <a-checkbox :value="primary">小学</a-checkbox>
            <!-- <div style="width:80px">
              <a-checkbox :value="primary"> 小学 </a-checkbox>
            </div>
            <div style="width:300px">
              <a-select v-model="primaryStatus" allowClear>
                <a-select-option v-for="item in primaryList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>-->
          </div>
          <div class="qui-fx" style="margin-bottom:10px">
            <a-checkbox :value="middle">初中</a-checkbox>
            <!-- <div style="width:80px">
              <a-checkbox :value="middle"> 初中 </a-checkbox>
            </div>
            <div style="width:300px">
              <a-select v-model="middleStatus" allowClear >
                <a-select-option v-for="item in middleList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>-->
          </div>
          <div class="qui-fx">
            <a-checkbox :value="high">高中</a-checkbox>
            <!-- <div style="width:80px">
              <a-checkbox :value="high"> 高中 </a-checkbox>
            </div>
            <div style="width:300px">
              <a-select v-model="highStatus" allowClear>
                <a-select-option v-for="item in middleList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>-->
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
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      confirmLoading: false,
      visible: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      appForm: {},
      primaryStatus: '6',
      middleStatus: '3',
      highStatus: '3',
      primaryList: [
        {
          key: '6',
          value: '六年制'
        },
        {
          key: '5',
          value: '五年制'
        }
      ],
      middleList: [
        {
          key: '3',
          value: '三年制'
        },
        {
          key: '4',
          value: '四年制'
        }
      ],
      primary: 'k12_01',
      middle: 'k12_02',
      high: 'k12_03',
      recordId: '',
      managerId: '',
      rules: {
        phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      }
    }
  },
  methods: {
    ...mapActions('home', ['addOrg', 'updateOrg']),
    submitOk(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          values.organizationType = '2'
          values.managerId = this.managerId
          values.educCode = values.checkedList.join(',')
          console.log(values)
          if (this.title === '编辑学校') {
            values.id = this.recordId
            this.updateOrg(values)
              .then(() => {
                this.$message.success('操作成功')
                this.confirmLoading = false
                this.visible = false
                this.$tools.goNext(() => {
                  this.$emit('update')
                })
              })
              .catch(() => {
                this.confirmLoading = false
              })
          } else {
            this.addOrg(values)
              .then(() => {
                this.$message.success('操作成功')
                this.confirmLoading = false
                this.visible = false
                this.$tools.goNext(() => {
                  this.$emit('update')
                })
              })
              .catch(() => {
                this.confirmLoading = false
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
