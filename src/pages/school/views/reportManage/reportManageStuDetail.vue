<template>
  <div class="page-layout qui-fx-ver">
    <div style="height:130px;background:#fff;">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="基本信息" key="1">
          <a-row class="padd-l10">
            <a-col v-for="(item,index) in baseList" :key="index" :span="8" class="mar-b10">
              {{ item.key }} : {{ item.value }}
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <table-list
        is-zoom
        :page-list="pageList"
        :columns="columns"
        :table-list="detailList">
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: '15%'
  },
  {
    title: '打卡时间',
    dataIndex: 'dealTime',
    width: '30%'
  },
  {
    title: '底照',
    dataIndex: 'photoPic',
    width: '15%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '抓拍照',
    dataIndex: 'snapPic',
    width: '30%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  }
]
export default {
  name: 'ReportManageStuDetail',
  components: {
    TableList,
    PageNum
  },
  data () {
    return {
      baseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      detailList: [],
      detailId: '',
      detailInfo: {}
    }
  },
  async mounted () {
    this.detailId = this.$route.query.id
    this.infoGet()
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getStudentDetail', 'getStudentInfo'
    ]),
    async infoGet() {
      const res = await this.getStudentInfo({ id: this.detailId })
      this.detailInfo = res.data
      this.baseList = [
        {
          key: '姓名',
          value: res.data.name
        },
        {
          key: '学号',
          value: res.data.num
        },
        {
          key: '年级',
          value: res.data.grade
        },
        {
          key: '班级',
          value: res.data.class
        },
        {
          key: '考勤次数',
          value: res.data.account
        }
      ]
    },
    async showList () {
      const res = await this.getStudentDetail(this.pageList)
      this.detailList = res.data
      this.total = res.total
    },
    callback (key) {
      console.log(key)
      setTimeout(() => {
        this.showList()
      }, 300)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
