<template>
  <div class="page-layout qui-fx-ver">
    <div style="height:130px;background:#fff;">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="基本信息" key="1">
         
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
    title: '姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '5%',
    customRender: (text) => {
      if (text === 1) {
        return '男'
      } else if (text === 2) {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '10%',
  },
  {
    title: '测量位置',
    dataIndex: 'position',
    width: '10%'
  },
  {
    title: '发热状态',
    dataIndex: 'feverstatus',
    width: '10%',
     customRender: (text) => {
      if (text === 1) {
        return '未发热'
      } else if (text === 2) {
        return '轻微'
      } else {
        return '高烧'
      }
    }
  },
  {
    title: '附带症状',
    dataIndex: 'Incidentalsymptoms',
    width: '10%',
  },
  {
    title: '是否接触疫情人员',
    dataIndex: 'isno',
    width: '10%',
     customRender: (text) => {
      if (text === 1) {
        return '有'
      } else if (text === 2) {
        return '没有'
      } else {
        return '未知'
      }
    }
  },    {
    title: '上报人',
    dataIndex: 'ReportPerson',
    width: '10%'
  },  {
    title: '上报时间',
    dataIndex: 'ReportTime',
    width: '10%'
  }, 
]
export default {
  name: 'ReportManageStuDetail',
  components: {
    TableList,
    PageNum
  },
  data () {
    return {
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      detailList: [],
    }
  },
  async mounted () {
    this.showList()
  },
  methods: {
   ...mapActions('home', [
      'getreportList'
    ]),
    async showList () {
      const res = await this.getreportList(this.pageList)
      this.detailList = res.data
      this.total = res.total
    },
  }
}
</script>
<style lang="less" scoped>
</style>
