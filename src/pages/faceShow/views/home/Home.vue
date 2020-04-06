<template>
  <div class="data-view qui-page qui-fx-ver">
    <div class="pos-box qui-fx" style="padding: 0 30px 30px;">
      <div class="data-left qui-fx-f1 qui-fx-ver">
        <div class="data-video qui-fx-f1">
          <dv-border-box-9></dv-border-box-9>
        </div>
        <div class="data-record">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ac box-scroll" style="width: 99%; margin-right: 1%;">
              <div v-scale="face.id" class="record-box" v-for="face in faceList" :key="face.id">
                <img :src="face.url" alt="" />
                <div class="face-name">{{ face.name }}</div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
      </div>
      <div class="data-face">
        <dv-border-box-10 :color="borderColor">
          <div class="pos-box box-scroll" style="height: 97%; margin-top: 3%;">
            <div class="face-box qui-fx-ac qui-fx-jsb" v-for="face in faceList" :key="face.id">
              <div class="face-img">
                <img :src="face.url" alt="" />
                <div class="face-name">{{ face.name }}</div>
              </div>
              <div class="face-number">
                <dv-decoration-9 style="width: 90px; height: 90px; color: #fff; font-size: 20px;">66%</dv-decoration-9>
              </div>
              <div class="face-img">
                <img :src="face.url" alt="" />
                <div class="face-name">{{ face.name }}</div>
              </div>
            </div>
          </div>
        </dv-border-box-10>
      </div>
    </div>
    <dv-border-box-11 :titleWidth="400" class="qui-fx-f1 qui-fx-ver" title="武汉全品人脸识别系统"></dv-border-box-11>
  </div>
</template>

<script>
import face1 from '../../images/face1.jpg'
import face2 from '../../images/face2.jpg'
import face3 from '../../images/face3.jpg'
import face4 from '../../images/face4.jpg'
import face5 from '../../images/face5.jpg'
import face6 from '../../images/face6.jpg'
import face7 from '../../images/face7.jpg'
import face8 from '../../images/face8.jpg'
import face9 from '../../images/face9.jpg'
export default {
  name: 'Home',
  components: {},
  computed: {},
  data() {
    return {
      imgList: [
        {
          id: 1,
          url: face1,
          name: '李传亮',
        },
        {
          id: 2,
          url: face2,
          name: '朱本福',
        },
        {
          id: 3,
          url: face3,
          name: '宋祥',
        },
        {
          id: 4,
          url: face4,
          name: '张文键',
        },
        {
          id: 5,
          url: face5,
          name: '张坤',
        },
        {
          id: 6,
          url: face6,
          name: '张立',
        },
        {
          id: 7,
          url: face7,
          name: '高鸿志',
        },
        {
          id: 8,
          url: face8,
          name: '王选章',
        },
        {
          id: 9,
          url: face9,
          name: '朱旭',
        },
      ],
      borderColor: ['#204486', '#00ffff'],
      faceList: [],
    }
  },
  directives: {
    scale: {
      inserted: function (el) {},
    },
  },
  mounted() {
    this.faceList = JSON.parse(JSON.stringify(this.imgList))
    setInterval(() => {
      const random = Math.floor(Math.random() * 9)
      const obj = {
        ...this.imgList[random],
        id: Math.floor(Math.random() * 10000000),
      }
      if (this.faceList.length > 50) {
        this.faceList.splice(50)
      }
      this.faceList.unshift(obj)
    }, 600)
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.data-view {
  background-color: #041e49;
}
.box-scroll {
  overflow: hidden;
}
@keyframes moveLeft {
  0% {
    width: 0px;
  }
  100% {
    width: 150px;
  }
}
@keyframes moveDown {
  0% {
    height: 0px;
  }
  100% {
    height: 140px;
  }
}
.data-left {
  .data-video {
    margin: 80px 0 20px 0;
  }
  .data-record {
    height: 24vh;
  }
  .record-box {
    position: relative;
    margin-left: 12px;
    animation: moveLeft linear 0.2s;
    width: 150px;
    height: 18vh;
    border: 8px #204486 solid;
    border-radius: 2px;
    position: relative;
    img {
      width: 124px;
      height: 100%;
      display: block;
    }
  }
}
.face-name {
  overflow: hidden;
  position: absolute;
  z-index: 99;
  height: 30px;
  width: 100%;
  line-height: 30px;
  text-align: center;
  color: #f5f5f5;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}
.data-face {
  margin: 80px 0 0px 20px;
  width: 450px;
  .face-box {
    margin: 0px 15px 15px;
    height: 140px;
    animation: moveDown linear 0.3s;
    .face-img {
      width: 132px;
      height: 140px;
      border: 4px #204486 solid;
      border-radius: 2px;
      position: relative;
      img {
        width: 124px;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
