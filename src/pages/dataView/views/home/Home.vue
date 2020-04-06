<template>
  <div class="data-view qui-page qui-fx-ver">
    <div class="pos-box qui-fx-ver" style="padding: 0 30px 30px;">
      <div class="data-top"></div>
      <div class="data-menu qui-fx">
        <div class="data-tab qui-fx-f1" v-for="(menu, index) in menuList" :key="index">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ac-jc">
              <div class="qui-fx-jc">
                <img :src="menu.icon" class="icon" alt="" />
                <div class="title">{{ menu.title }}</div>
              </div>
              <div class="qui-fx">
                <dv-border-box-10
                  v-for="(text, ind) in menu.total.split('')"
                  :key="ind"
                  class="total-text"
                  :color="['#0f439b', '#0a7cb9']"
                  >{{ text }}</dv-border-box-10
                >
              </div>
            </div>
          </dv-border-box-10>
        </div>
      </div>
      <div class="data-bi qui-fx-f1 qui-fx">
        <div class="qui-fx-f1">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ver" style="padding: 0 20px 20px;">
              <div class="title-img">风险学校排名</div>
              <div class="qui-fx-f1 mar-t20">
                <div class="pos-box">
                  <dv-scroll-ranking-board :color="['red', 'green']" :config="sortConfig" />
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
        <div class="qui-fx-f2" style="margin: 0 20px;">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ver">
              <div class="title-img">体温异常态势</div>
              <div class="qui-fx-f1">
                <div class="pos-box">
                  <div class="pos-box box-padd" id="yichang"></div>
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
        <div class="qui-fx-f1">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ver">
              <div class="title-img">返校时间分布</div>
              <div class="qui-fx-f1 mar-t20">
                <div class="pos-box">
                  <div class="pos-box box-padd" id="backSchool"></div>
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
      </div>
      <div class="data-bi qui-fx-f1 qui-fx">
        <div class="qui-fx-f1">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ver">
              <div class="title-img">疫情档案分布</div>
              <div class="qui-fx-f1 mar-t20">
                <div class="pos-box box-padd" id="circle"></div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
        <div class="qui-fx-f2" style="margin: 0 20px;">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ver">
              <div class="title-img">疫情上报态势</div>
              <div class="qui-fx-f1">
                <div class="pos-box box-padd" id="unReport"></div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
        <div class="qui-fx-f1">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box qui-fx-ver">
              <div class="title-img">疫情返校分布</div>
              <div class="qui-fx-f1 mar-t20">
                <div class="pos-box box-padd" id="area"></div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
      </div>
    </div>
    <dv-border-box-11 :titleWidth="400" class="qui-fx-f1 qui-fx-ver" title="武汉全品疫情防控平台"></dv-border-box-11>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import HighchartsVariablepie from 'highcharts/modules/variable-pie'
import xx from '../../images/xx.png'
import xs from '../../images/xs.png'
import jzg from '../../images/jzg.png'
import zs from '../../images/zs.png'
import zfx from '../../images/zfx.png'
import yichang from './yichang'
import backSchool from './backSchool'
import unReport from './unReport'
import area from './area'
import pie from './pie'
import circle from './circle'
HighchartsVariablepie(Highcharts)
export default {
  name: 'Home',
  components: {},
  computed: {},
  data() {
    return {
      borderColor: ['#204486', '#00ffff'],
      menuList: [
        {
          icon: xx,
          title: '下属学校(所)',
          total: '20',
        },
        {
          icon: xs,
          title: '学生总数(人)',
          total: '23420',
        },
        {
          icon: jzg,
          title: '教职工总数(人)',
          total: '2234',
        },
        {
          icon: zfx,
          title: '中高风险总数(人)',
          total: '420',
        },
        {
          icon: zs,
          title: '今日上报总数(人)',
          total: '22020',
        },
      ],
      sortConfig: {
        data: [
          {
            name: '宜昌市外国语高中',
            value: 55,
          },
          {
            name: '重庆建筑工程职业学院',
            value: 120,
          },
          {
            name: '金太阳实验中学',
            value: 78,
          },
          {
            name: '长沙理工大学',
            value: 66,
          },
          {
            name: '	霍林郭勒市第一中学',
            value: 80,
          },
          {
            name: '	荆门市象山中学',
            value: 80,
          },
        ],
        unit: '人',
        waitTime: 2500,
      },
    }
  },
  mounted() {
    this.setBi()
  },
  methods: {
    setBi() {
      Highcharts.chart('yichang', yichang)
      Highcharts.chart('backSchool', backSchool)
      Highcharts.chart('unReport', unReport)
      Highcharts.chart('area', area)
      Highcharts.chart('circle', circle)
    },
  },
}
</script>

<style lang="less" scoped>
.title-img {
  margin: 0 auto;
  height: 40px;
  width: 368px;
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
  font-size: 16px;
  line-height: 40px;
  background: url('../../images/box-title1.png') no-repeat;
  background-size: 368px 100%;
}
.data-view {
  background-color: #041e49;
}
.mar-t20 {
  padding-top: 10px;
}
.data-top {
  height: 80px;
}
.data-menu {
  height: 160px;
  .data-tab {
    color: #fff;
    margin-left: 30px;
    &:first-child {
      margin-left: 0;
    }
    .icon {
      width: 32px;
      height: 32px;
      display: block;
      margin-right: 10px;
    }
    .title {
      color: #03f7fc;
      font-size: 18px;
      padding-top: 1px;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }
    .total-text {
      width: 3rem;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      font-size: 2rem;
      margin-left: 8px;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
.data-bi {
  margin-top: 20px;
  .box-padd {
    padding: 0px 5px 5px;
  }
}
</style>
