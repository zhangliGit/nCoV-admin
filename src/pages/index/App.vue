<template>
  <div id="app" class="home qui-fx-ver">
    <div class="header">云平台系统</div>
    <div class="qui-fx-f1">
      <div class="system-box">
        <div @click="goHtml(system.url)" v-for="system in systemList" :key="system.id" class="system-list qui-fx-ac-jc">
          <img :src="system.icon" alt />
          <p>{{ system.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jyj from '@a/img/jyj.png'
import xx from '@a/img/xx.png'
import yw from '@a/img/yw.png'

export default {
  data() {
    return {
      systemList: [
        // {
        //   id: 0,
        //   name: '登录',
        //   url: 'login.html',
        //   icon: yw
        // },
        {
          id: 1,
          name: '运维端',
          url: 'admin.html',
          icon: yw,
        },
        {
          id: 2,
          name: '教育局',
          url: 'organize.html',
          icon: jyj,
        },
        {
          id: 3,
          name: '学校端',
          url: 'school.html',
          icon: xx,
        },
        {
          id: 3,
          name: '局端大屏',
          url: 'dataView.html',
          icon: xx,
        },
        {
          id: 4,
          name: '人脸识别',
          url: 'faceShow.html',
          icon: xx,
        },
      ],
    }
  },
  methods: {
    goHtml(url) {
      window.location.href = `./${url}`
    },
  },
  mounted() {},
}
</script>
<style lang="less">
#app {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  .header {
    background-color: #002140;
    height: 50px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: 600;
  }
}
.system-box {
  width: 600px;
  margin: 20px auto;
}
.system-list {
  cursor: pointer;
  border-radius: @radius;
  float: left;
  overflow: hidden;
  margin-left: 2%;
  margin-bottom: 20px;
  border: 1px #ccc solid;
  text-align: center;
  width: 22.5%;
  height: 120px;
  color: #333;
  background-color: #fff;
  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    display: block;
  }
  &:hover {
    background-color: #999;
  }
}
[v-cloak] {
  display: none !important;
}
</style>
