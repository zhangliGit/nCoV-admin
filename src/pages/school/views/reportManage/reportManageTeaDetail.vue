<template>
  <div class="leave-detail page-layout qui-fx-ver">
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">
        {{ title }}
      </a-menu-item>
    </a-menu>
         <div class="pic qui-fx-wp">
      <p>
        <span>图片</span>
        <span>:</span>
        <span></span>
      </p>
    </div>
    <div class="info qui-fx-wp">
      <p v-for="item in detailInfo" :key="item.key">
        <span>{{ item.key }}</span>
        <span>:</span>
        <span>{{ item.val }}</span>
      </p>
    </div>
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">体验数据</a-menu-item>
    </a-menu>
    <div class="title">
      <p>审批人</p>
    </div>
    <div class="process qui-fx-jsb qui-fx-ac">
      <div class="qui-fx-jsa qui-fx-ac">
        <img :src="approveImg" alt="">
        <div class="qui-fx-ver">
          <span>{{ approveName }}</span>
          <span>{{ approveState }}</span>
        </div>
      </div>
      <span>{{ approveTime }}</span>
    </div>
   <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">体温走势</a-menu-item>
    </a-menu>
  <div>曲线图</div>
  <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">疫情上报记录</a-menu-item>
    </a-menu>
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
    dataIndex: 'date',
    width: '7%'
  },
  {
    title: '性别',
    dataIndex: 'dealTime',
    width: '7%'
  },
  {
    title: '部门',
    dataIndex: 'photoPic',
    width: '7%',
  },
  {
    title: '工号',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '温度',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '测量位置',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '发热状态',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '附带症状',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '是否接触疫情人员',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '其他说明',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '健康状态',
    dataIndex: 'snapPic',
    width: '7%',
  },
  {
    title: '上报人',
    dataIndex: 'snapPic',
    width: '7%',
  },{
    title: '上报时间',
    dataIndex: 'snapPic',
    width: '7%',
  }
]
export default {
  name: 'TeacherLeaveDetail',
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
      current: 'title',
      detailInfo: [
        {
          key: '姓名',
          val: '张三'
        },
        {
          key: '组织机构',
          val: '教务处'
        },
        {
          key: '请假事由',
          val: '事假'
        },
        {
          key: '是否出校',
          val: '是'
        },
        {
          key: '审批单号',
          val: '20191210113331957'
        },
        {
          key: '请假时间',
          val: '2019-12-10 11:31:00 ~ 2019-12-11 11:31:00'
        },
        {
          key: '请假时长',
          val: '24小时'
        },
        {
          key: '审批状态',
          val: '审批通过'
        }
      ],
      title: '基本信息',
      leaveData: [],
      approveName: '',
      approveState: 0,
      approveTime: '',
      approveImg: ''
    }
  },
  async mounted () {
    this.showData()
  },
  methods: {
    ...mapActions('home', [
      'teachersLeaveProcess'
    ]),
    async showData () {
      const res = await this.teachersLeaveProcess()
      this.leaveData = res.data
      console.log(this.leaveData)
      this.approveName = this.leaveData[0].name
      this.approveTime = this.leaveData[0].dealTime
      this.approveImg = this.leaveData[0].photoPic
      this.approveState = this.leaveData[0].status === 1 ? '待审批' : this.leaveData[0].status === 2 ? '审批通过' : '审批不通过'
    }
  }
}
</script>
<style lang="less" scoped>
.leave-detail{
  background: #fff;
  .info,.pic{
    margin-top:20px;
    padding: 0 20px;
    p{
      margin-right: 50px;
      span{
        margin:0 5px;
      }
    }
  }
  .pic{
    margin-top:0;
  }
  .title{
    margin:10px;
    p{
      margin:0;
      font-weight: bold;
    }
  }
  .process{
    width: 400px;
    margin:10px;
    img{
      width: 60px;
      height: 60px;
      background: #ddd;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
}
</style>
