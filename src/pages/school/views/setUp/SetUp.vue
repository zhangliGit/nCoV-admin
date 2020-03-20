<template>
  <div class="set-up page-layout qui-fx-ver">
    <a-form :form="form" @submit="handleSubmit" :style="{maxHeight:maxHeight}">
      <div style="height:170px;">
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">温度设置</span>
        </div>
        <a-row :gutter="24" v-for="(item,index) in tempList" :key="item.id">
          <a-col :span="11">
            <a-form-item :label="item.bodyPartsName" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
              <a-input
                v-decorator="[
                  `temp${item.id}`,
                  { initialValue: item.temperature, rules: [{ required: true, message: '请填写发热温度值' }]}
                ]"
              />
            </a-form-item>
          </a-col>
          <!--<a-col :span="13">（腋下、颈部等测温采用该值，同时未知的测温位置测温默认采用该值）</a-col>-->
        </a-row>
      </div>
      <div style="height:100px">
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">校医人员设置</span>
        </div>
        <a-form-item label="校医人员" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            readOnly
            v-decorator="[
              'teacher',
              {initialValue: appForm.teacher, rules: [{ required: true, message: '请选择校医人员' }]}
            ]"
            @click="chooseDoctor"
          />
        </a-form-item>
      </div>
      <div style="height:230px">
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">发热通知设置</span>
        </div>
        <a-form-item v-bind="formItemLayout" label="教职工发热通知" required>
          <a-checkbox-group
            v-decorator="['teacherCheck', {initialValue: ['A1']}]"
            :options="teacherOptions"
          ></a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="学生发热通知" required>
          <a-checkbox-group
            v-decorator="['studentCheck', {initialValue: ['A2', 'B2']}]"
            :options="studentOptions"
          ></a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="通知方式" required>
          <a-checkbox-group
            v-decorator="['infoCheck', {initialValue: ['A3']}]"
            :options="infoOptions"
          ></a-checkbox-group>
        </a-form-item>
      </div>
      <div style="height:30px;">
        <!--  <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">上报提醒</span>
        </div>
        <a-row :gutter="24">
          <a-col :span="11">
            <a-form-item
              label="开启上报提醒"
              :label-col="{ span: 18 }"
              :wrapper-col="{ span: 6 }"
              required
            >
              <a-switch
                v-decorator="['switch', { initialValue: appForm.switch,valuePropName: 'checked' }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="13">（开启后教职工和家长微信公众号将定时收到上报提醒消息）</a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="11">
            <a-form-item
              label="发送提醒时间"
              :label-col="{ span: 16 }"
              :wrapper-col="{ span: 8 }"
              required
            >
              <div
                class="qui-fx"
                style="margin-top:10px"
                v-for="(item,index) in timeList"
                :key="index"
              >
                <a-time-picker :defaultValue="moment('12:08', 'HH:mm')" format="HH:mm" />
                <a-button
                  size="small"
                  class="del-action-btn"
                  icon="delete"
                  style="margin-left:10px;"
                  @click="del(index)"
                ></a-button>
              </div>
              <a-button size="small" class="add-action-btn" icon="plus" @click="add"></a-button>
            </a-form-item>
          </a-col>
          <a-col :span="13">（截止时间为发送时间2小时后）</a-col>
        </a-row>-->
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'center',marginBottom:'10px'}">
            <a-button type="primary" html-type="submit">保存</a-button>
            <a-button :style="{ marginLeft: '20px' }">取消</a-button>
          </a-col>
        </a-row>
      </div>
    </a-form>
    <choose-doctor ref="chooseUser" v-model="userTag" @submit="choose" title="选择校医"></choose-doctor>
  </div>
</template>

<script>
import ChooseDoctor from './ChooseDoctor'
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SetUp',
  components: {
    ChooseDoctor
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      teacherOptions: [
        { label: '本人', value: 'A1', disabled: true },
        { label: '校医', value: 'B1' }
      ],
      studentOptions: [
        { label: '家长', value: 'A2', disabled: true },
        { label: '班主任', value: 'B2', disabled: true },
        { label: '校医', value: 'C2' }
      ],
      infoOptions: [
        { label: '公众号', value: 'A3', disabled: true },
        { label: '短信', value: 'B3' }
      ],
      maxHeight: 0,
      timeList: [1, 2],
      userTag: false,
      appForm: {
        armpit: '',
        mouth: '',
        head: '',
        teacher: '',
        switch: ''
      },
      tempList: {},
      userList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.tmpListGet()
    this.informGet()
    this.informUserGet()
    this.doctorList()
  },
  methods: {
    moment,
    ...mapActions('home', ['gettmpList', 'getInform', 'getInformUser', 'addDoctor', 'getInfoDoctor']),
    async tmpListGet() {
      const res = await this.gettmpList(`schoolCode=${this.userInfo.orgCode}`)
      console.log('tmpList', res)
      this.tempList = res.result
      console.log('this.tempList', this.tempList)
    },
    async informGet() {
      const res = await this.getInform(`schoolCode=${this.userInfo.orgCode}`)
      console.log('informGet', res)
    },
    async informUserGet() {
      const res = await this.getInformUser(`schoolCode=${this.userInfo.orgCode}`)
      console.log('informUserGet', res)
    },
    async doctorList() {
      const userData = await this.getInfoDoctor('schoolCode=CANPOINT')
      // const userData = await this.getInfoDoctor(`schoolCode=${this.userInfo.orgCode}`)
      this.userList = userData.result
      this.appForm.teacher = this.userList.map(el => el.userName).join(',')
    },
    chooseDoctor() {
      this.userTag = true
      this.$refs.chooseUser.showList()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('values', values)
        }
      })
    },
    async choose(item) {
      console.log('chooseUser', item)
      await this.addDoctor(item)
      this.userTag = false
      this.$refs.confirmLoading = false
      this.$message.success('操作成功')
      this.$tools.goNext(() => {
        this.$refs.chooseUser.reset()
      })
      this.appForm.teacher = item.map(el => el.name).join(',')
    }
    // add() {
    //   this.timeList.push(1)
    // },
    // del(index) {
    //   this.timeList.splice(index, 1)
    // },
  }
}
</script>
<style lang="less" scoped>
.set-up {
  background: #fff;
  padding: 10px 40px;
  overflow: auto;
  .title-box {
    height: 28px;
    border-bottom: 1px solid #ccc;
    position: relative;
    .title-icon {
      display: inline-block;
      height: 20px;
      width: 6px;
      background-color: #0086ff;
      position: absolute;
      top: 0%;
      left: 0;
    }
    .title-text {
      margin-left: 12px;
    }
  }
}
</style>
