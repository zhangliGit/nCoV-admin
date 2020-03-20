<template>
  <div class="page-layout qui-fx">
    <div class="calendar">
      <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <a-tabs defaultActiveKey="1" @change="tabChange" style="height:50px;" type="card">
        <a-tab-pane :tab="`未上报${noNum}人`" key="1"></a-tab-pane>
        <a-tab-pane :tab="`已上报${allNum}人`" key="2"></a-tab-pane>
        <a-tab-pane :tab="`异常人数${abnormalNum}人`" key="3"></a-tab-pane>
        <a-tab-pane :tab="`发热人数${feverNum}人`" key="4"></a-tab-pane>
      </a-tabs>
      <table-list
        :page-list="pageList"
        :columns="columns"
        :table-list="userList">
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
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '12%'
  },
  // {
  //   title: '性别',
  //   dataIndex: 'gender',
  //   width: '10%',
  //   customRender: (text) => {
  //     if (text === 1) {
  //       return '男'
  //     } else if (text === 2) {
  //       return '女'
  //     } else {
  //       return '未知'
  //     }
  //   }
  // },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '12%'
  },
  {
    title: '测温部位',
    dataIndex: 'bodyParts',
    width: '12%'
  },
  {
    title: '测温地点',
    dataIndex: 'site',
    width: '12%'
  },
  {
    title: '所属班级',
    dataIndex: 'class',
    width: '12%'
  },
  // {
  //   title: '联系方式',
  //   dataIndex: 'phone',
  //   width: '12%'
  // },
  {
    title: '照片',
    dataIndex: 'photoPic',
    width: '12%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  }
]
export default {
  name: 'DailyReport',
  components: {
    TableList,
    PageNum
  },
  data() {
    return {
      pageList: {
        page: 1,
        size: 20,
        reportState: '2', // 上报1，未上报2
        feverMark: '', // 1发烧2不发烧
        mark02: ''// 1异常
      },
      total: 0,
      columns,
      userList: [],
      noNum: 1,
      allNum: 1,
      abnormalNum: 1,
      feverNum: 1,
      tabActive: '1'
    }
  },
  mounted() {
    this.showList()
    // this.dailyGet()
  },
  methods: {
    ...mapActions('home', ['getUnReport', 'getDaily', 'getReport']),
    onPanelChange(value, mode) {
      console.log(value, mode)
    },
    async showList() {
      const res = await this.getReport(this.pageList)
      console.log('===', res)
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    async dailyGet() {
      const res = await this.getDaily(this.pageList)
      this.noNum = res.data.noNum
      this.allNum = res.data.allNum
      this.abnormalNum = res.data.abnormalNum
      this.feverNum = res.data.feverNum
    },
    tabChange(key) {
      this.tabActive = key
      console.log(this.tabActive)
      if (this.tabActive === '1') {
        this.pageList.reportState = '2'
        this.pageList.feverMark = ''
        this.pageList.mark02 = ''
      } else if (this.tabActive === '2') {
        this.pageList.reportState = '1'
        this.pageList.feverMark = ''
        this.pageList.mark02 = ''
      } else if (this.tabActive === '3') {
        this.pageList.reportState = ''
        this.pageList.feverMark = '1'
        this.pageList.mark02 = ''
      } else if (this.tabActive === '4') {
        this.pageList.reportState = ''
        this.pageList.feverMark = ''
        this.pageList.mark02 = '1'
      }
      this.showList()
    }
  }
}
</script>
<style lang="less" scoped>
.page-layout{
  .calendar{
    width: 300px;
    background-color: #fff;
    margin-right: 10px;
  }
}

</style>
