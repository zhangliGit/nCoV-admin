<template>
  <div class="page-layout qui-fx-ver">
    <div>
      <a-button icon="plus" class="add-btn" @click="modify">新增</a-button>
    </div>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="schoolList">
      <template v-slot:actions="action">
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">
            您确定解绑该学校吗?
          </template>
          <a-tooltip placement="topLeft" title="解绑">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <choose-school ref="chooseSchool" v-model="userTag" @submit="chooseSchool" title="选择学校">
    </choose-school>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import chooseSchool from './ChooseSchool'
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '学校名称',
    dataIndex: 'organizationName',
    width: '15%'
  },
  {
    title: '学校编码',
    dataIndex: 'organizationCode',
    width: '15%'
  }, {
    title: '账号',
    dataIndex: 'manageName',
    width: '15%'
  }, {
    title: '密码',
    dataIndex: 'password',
    width: '15%'
  },
  // {
  //   title: '管理员',
  //   dataIndex: 'admin',
  //   width: '20%'
  // },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: '17%'
  },
  {
    title: '操作',
    width: '15%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'OrgDetail',
  components: {
    TableList,
    PageNum,
    chooseSchool
  },
  data() {
    return {
      columns,
      schoolList: [],
      title: '添加管理员',
      pageList: {
        page: 1,
        size: 20,
        type: '2',
        pcode: ''
      },
      total: 100,
      userTag: false,
      params: {
        orgCode: '',
        schoolCodeList: []
      }
    }
  },
  mounted() {
    this.pageList.pcode = this.$route.query.pcode
    this.params.orgCode = this.$route.query.pcode
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getOrgList', 'unBindSchool', 'bindSchool']),
    async showList() {
      const res = await this.getOrgList(this.pageList)
      this.schoolList = res.result.list
      this.total = res.result.totalCount
    },
    del(record) {
      this.unBindSchool({ schoolCode: record.organizationCode }).then(() => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      })
    },
    modify() {
      this.userTag = true
      this.$refs.chooseSchool.schoolGet()
    },
    chooseSchool (item) {
      this.params.schoolCodeList = item.map((item) => {
        return item.organizationCode
      })
      this.bindSchool(this.params).then(() => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.$refs.chooseSchool.reset()
          this.$refs.chooseSchool.totalList = []
          this.$refs.chooseSchool.chooseList = []
          this.showList()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
