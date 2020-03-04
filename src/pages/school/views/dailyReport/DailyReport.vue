<template>
  <div class="page-layout qui-fx">
    <div class="calendar">
      <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <a-tabs defaultActiveKey="1" @change="callback" style="height:50px;" type="card">
        <a-tab-pane :tab="`未上报${noNum}人`" key="1"></a-tab-pane>
        <a-tab-pane :tab="`已上报${allNum}人`" key="2"></a-tab-pane>
        <a-tab-pane :tab="`异常人数${abnormalNum}人`" key="3"></a-tab-pane>
        <a-tab-pane :tab="`发热人数${feverNum}人`" key="4"></a-tab-pane>
      </a-tabs>
      <table-list
        :page-list="pageList"
        :columns="columns"
        :table-list="detailList">
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '头像',
    dataIndex: 'photoPic',
    width: '30%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '30%'
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
        size: 20
      },
      total: 0,
      columns,
      detailList: [],
      noNum: 1,
      allNum: 1,
      abnormalNum: 1,
      feverNum: 1
    }
  },
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode)
    },
    showList() {

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
