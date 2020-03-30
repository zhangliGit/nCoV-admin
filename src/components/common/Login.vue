<template>
  <div class="login">
    <div class="login-dialog qui-fx-je qui-fx-ac">
      <div class="login-input">
        <div class="login-text">全品疫情防控平台</div>
        <a-tabs v-model="autoKey">
          <a-tab-pane tab="账号登录" key="2">
            <div style="margin: 5px 0 20px">
              <a-input style="height:40px;" placeholder="请输入手机号" v-model="loginForm.phone">
                <a-icon style="font-size: 20px; color: #666" slot="prefix" type="mobile" />
              </a-input>
            </div>
            <div style="margin: 20px 0" class="qui-fx qui-fx-ac">
              <a-input type="password" style="height:40px;" placeholder="请输入密码" v-model="loginForm.passCode">
                <a-icon style="font-size: 20px;" slot="prefix" type="lock" />
              </a-input>
            </div>
            <div class="login-btn" @click="login">登录</div>
          </a-tab-pane>
          <a-tab-pane tab="验证码登录" key="1">
            <div style="margin: 5px 0 20px">
              <a-input style="height:40px;" placeholder="请输入手机号" v-model="loginForm.phone">
                <a-icon style="font-size: 20px; color: #666" slot="prefix" type="mobile" />
              </a-input>
            </div>
            <div style="margin: 20px 0" class="qui-fx qui-fx-ac">
              <div class="qui-fx-f1">
                <a-input style="height:40px;" placeholder="请输入验证码" v-model="loginForm.passCode">
                  <a-icon style="font-size: 20px;" slot="prefix" type="lock" />
                </a-input>
              </div>
              <div :class="['btn-yzm', { act: total !== 60 }]" @click="getYzm">{{ yzmTip }}</div>
            </div>
            <div class="login-btn" @click="login">登录</div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import hostEnv from '@/config/host-env'
import $ajax from '@u/ajax-serve'
import { mapMutations } from 'vuex'
export default {
  components: {},
  props: {
    type: {
      type: String,
      default: 'admin'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.total = 60
    clearInterval(this.timer)
    next()
  },
  data() {
    return {
      loginUrl: `${hostEnv.wangxuanzhang}/operate/managerinfo/login`,
      yzUrl: `${hostEnv.zhuxu}/user/auth/code`,
      autoKey: '2',
      total: 60,
      yzmTip: '获取验证码',
      loginForm: {
        phone: '',
        passCode: ''
      }
    }
  },
  methods: {
    ...mapMutations('home', ['updateState']),
    async getYzm() {
      if (this.total !== 60) return
      // if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.loginForm.phone) || this.loginForm.phone === '') {
      //   this.$message.warning('请输入正确的手机号')
      //   return
      // }
      if (this.loginForm.phone === '') {
        this.$message.warning('请输入正确的手机号')
        return
      }
      await $ajax.get({
        url: this.yzUrl,
        params: {
          phone: this.loginForm.phone,
          type: 1
        }
      })
      this.$message.warning('验证码已发送')
      this.timer = setInterval(() => {
        this.total--
        this.yzmTip = `${this.total} s`
        if (this.total === 0) {
          this.total = 60
          this.yzmTip = '获取验证码'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    async login() {
      if (this.loginForm.phone === '') {
        this.$message.warning('请输入正确的手机号')
        return
      }
      if (this.loginForm.passWord === '') {
        const msg = this.autoKey === '2' ? '请输入账号' : '请输入验证码'
        this.$message.warning(msg)
        return
      }
      if (this.type === 'admin') {
        this.updateState({
          key: 'userInfo',
          data: {
            manageName: '超级管理员'
          }
        })
        this.$router.push('/orgManage')
      } else {
        const res = await $ajax.get({
          url: this.loginUrl,
          params: {
            ...this.loginForm,
            loginType: this.autoKey
          }
        })
        const data = res.result
        const info = {
          phone: data.phone,
          manageName: data.manageName,
          orgType: data.orgList[0].orgType,
          orgName: data.orgList[0].orgName,
          orgCode: data.orgList[0].orgCode,
          pCode: data.orgList[0].pCode,
          eduCode: data.orgList[0].eduCode,
          token: data.token
        }
        this.updateState({
          key: 'systemName',
          data: data.orgList[0].orgName
        })
        this.updateState({
          key: 'userInfo',
          data: info
        })
        this.$router.replace('/home')
      }
    }
  }
}
</script>

<style lang="less">
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 40px;
}
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: url('../../assets/img/login_bg2.png') no-repeat;
  background-size: 100% 100%;
  .login-dialog {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -350px;
    margin-top: -250px;
    width: 700px;
    padding: 20px 0;
    height: 380px;
    box-shadow: 0 0 40px #666;
    background: url('../../assets/img/login_bg3.png') no-repeat 0 90px;
    background-size: 380px auto;
    background-color: #fff;
    border-radius: 16px;
    .login-input {
      text-align: center;
      width: 290px;
      margin-right: 40px;
    }
    .login-text {
      text-shadow: 0 0 4px #ccc;
      color: #333;
      font-size: 30px;
      letter-spacing: 4px;
    }
    .btn-yzm {
      width: 100px;
      background-color: @main-color;
      border-radius: @radius;
      height: 38px;
      line-height: 38px;
      text-align: center;
      margin-left: 10px;
      color: #fff;
      cursor: pointer;
      opacity: 0.8;
    }
    .act {
      opacity: 0.5;
    }
    input:focus {
      border: 2px solid #3498db;
      box-shadow: none;
    }
    .login-btn {
      cursor: pointer;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 3px;
      background-color: #3498db;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
