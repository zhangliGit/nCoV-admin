<template>
  <div id="app" class="home qui-fx-ver">
    <div class="header">云平台系统</div>
    <div class="qui-fx-f1">
      <div class="system-box">
        <div @click="goHtml(system.url)" v-for="system in systemList" :key="system.id" class="system-list">
          {{ system.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systemList: [
        {
          id: 1,
          name: '基础平台',
          url: 'admin.html'
        }
      ]
    }
  },
  methods: {
    goHtml(url) {
      window.location.href = `./${url}`
    }
  },
  mounted() {}
}
</script>
<style lang="less">
#app {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  .header {
    background-color: @main-color;
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
  margin-left: 2%;
  margin-bottom: 20px;
  border: 1px #ccc solid;
  text-align: center;
  line-height: 150px;
  width: 22.5%;
  height: 120px;
  color: #333;
  background-color: #999;
  &:hover {
    background-color: #666;
  }
}
[v-cloak] {
  display: none !important;
}
</style>
