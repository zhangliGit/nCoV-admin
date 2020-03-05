<template>
  <div class="set-up page-layout qui-fx-ver">
    <a-form :form="form" @submit="handleSubmit" :style="{maxHeight:maxHeight}">
      <div style="height:230px;">
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">温度设置</span>
        </div>
        <a-row :gutter="24">
          <a-col :span="11" >
            <a-form-item
              label="腋下、颈部发热温度值"
              :label-col="{ span: 10 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-input
                v-decorator="[
                  'note',
                  {rules: [{ required: true, message: 'Please input your note!' }]}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="13" >
            （腋下、颈部等测温采用该值，同时未知的测温位置测温默认采用该值）
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="11" >
            <a-form-item
              label="口腔发热温度值"
              :label-col="{ span: 10 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-input
                v-decorator="[
                  'note',
                  {rules: [{ required: true, message: 'Please input your note!' }]}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="13" >
            （口腔测温采用该值）
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="11" >
            <a-form-item
              label="额头、面部发热温度值"
              :label-col="{ span: 10 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-input
                v-decorator="[
                  'note',
                  {rules: [{ required: true, message: 'Please input your note!' }]}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="13" >
            （额头测温枪、人脸测温面板机测温等采用该值）
          </a-col>
        </a-row>
      </div>
      <div style="height:90px">
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">校医人员设置</span>
        </div>
        <a-form-item
          label="校医人员"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            readonly
            v-decorator="[
              'note',
              {rules: [{ required: true, message: 'Please input your note!' }]}
            ]"
            @click="userTag=true"
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
          >
          </a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="学生发热通知" required>
          <a-checkbox-group
            v-decorator="['studentCheck', {initialValue: ['A2', 'B2']}]"
            :options="studentOptions"
          >
          </a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="通知方式" required>
          <a-checkbox-group
            v-decorator="['infoCheck', {initialValue: ['A3']}]"
            :options="infoOptions"
          >
          </a-checkbox-group>
        </a-form-item>
      </div>
      <div style="height:230px">
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">上报提醒</span>
        </div>
        <a-row :gutter="24">
          <a-col :span="11" >
            <a-form-item
              label="开启上报提醒"
              :label-col="{ span: 18 }"
              :wrapper-col="{ span: 6 }"
              required
            >
              <a-switch v-decorator="['switch', { valuePropName: 'checked' }]" />
            </a-form-item>
          </a-col>
          <a-col :span="13" >
            （开启后教职工和家长微信公众号将定时收到上报提醒消息）
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="11" >
            <a-form-item
              label="发送提醒时间"
              :label-col="{ span: 16 }"
              :wrapper-col="{ span: 8 }"
              required
            >
              <div class="qui-fx" style="margin-top:10px" v-for="(item,index) in timeList" :key="index" >
                <a-time-picker :defaultValue="moment('12:08', 'HH:mm')" format="HH:mm" />
                <a-button
                  size="small"
                  class="del-action-btn"
                  icon="delete"
                  style="margin-left:10px;"
                  @click="del(index)"></a-button>
              </div>
              <a-button size="small" class="add-action-btn" icon="plus" @click="add"></a-button>
            </a-form-item>
          </a-col>
          <a-col :span="13" >
            （截止时间为发送时间2小时后）
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'center' }" >
            <a-button type="primary" html-type="submit" >
              保存
            </a-button>
            <a-button :style="{ marginLeft: '20px' }">
              取消
            </a-button>
          </a-col>
        </a-row>
      </div>
    </a-form>
    <choose-user ref="chooseUser" v-model="userTag" @submit="chooseUser" title="选择教职工">
    </choose-user>
  </div>
</template>

<script>
import chooseUser from '@c/ChooseUser'
import moment from 'moment'
export default {
  name: 'SetUp',
  components: {
    chooseUser
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
      userTag: false
    }
  },
  created () {
    this.maxHeight = (window.screen.height - 780) + 'px'
  },
  methods: {
    moment,
    handleSubmit() {

    },
    add() {
      this.timeList.push(1)
    },
    del(index) {
      this.timeList.splice(index, 1)
    },
    chooseUser (item) {
      console.log(item)
      setTimeout(() => {
        this.$refs.chooseUser.reset()
      }, 2000)
    }
  }
}
</script>
<style lang="less" scoped>
.set-up{
  background:#fff;
  padding:10px 40px;
  overflow: auto;
  .title-box{
    height: 28px;
    border-bottom: 1px solid #ccc;
    position: relative;
    .title-icon{
      display: inline-block;
      height: 20px;
      width: 6px;
      background-color: #0086ff;
      position: absolute;
      top:0%;
      left:0;
    }
    .title-text{
      margin-left: 12px;
    }
  }
}
</style>
