<template>
  <div class="page-layout qui-fx-ver">
    <search-form isReset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left" class="top-btn-group">
        <a-button icon="plus" class="add-btn" @click="add()">添加</a-button>
      </div>
    </search-form>
    <choose-person
      ref="chooseUser"
      v-if="userTag"
      v-model="userTag"
      @submit="chooseUser"
      title="选择风险人员"
    ></choose-person>
    <table-list :page-list="pageList" :columns="columns" :table-list="userList">
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import ChoosePerson from '../component/ChoosePerson'
const columns = [
  {
    title: '序号',
    width: '11%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '11%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '11%',
    customRender: text => {
      if (text === '1') {
        return '男'
      } else if (text === '2') {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '身份',
    dataIndex: 'userType',
    width: '11%',
    customRender: text => {
      if (text === '1') {
        return '教职工'
      } else if (text === '2') {
        return '学生'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '年级',
    dataIndex: 'gradeName',
    width: '11%',
    customRender: text => {
      if (text) {
        return text
      } else {
        return '无'
      }
    }
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: '11%',
    customRender: text => {
      if (text) {
        return text
      } else {
        return '无'
      }
    }
  },
  {
    title: '工号/学号',
    dataIndex: 'workNo',
    width: '11%'
  },
  {
    title: '风险类型',
    dataIndex: 'healthyState',
    width: '11%',
    customRender: text => {
      if (text === '1') {
        return '疑似'
      } else if (text === '2') {
        return '确诊'
      } else {
        return '健康'
      }
    }
  },
  {
    title: '加入时间',
    dataIndex: 'riskTime',
    width: '11%'
  }
]
const searchLabel = [
  {
    value: 'userName',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    list: [
      {
        key: '1',
        val: '疑似'
      },
      {
        key: '2',
        val: '确诊'
      },
      {
        key: '3',
        val: '健康'
      }
    ],
    value: 'healthyState',
    type: 'select',
    label: '风险类型'
  }
]
export default {
  name: 'RiskList',
  components: {
    TableList,
    SearchForm,
    ChoosePerson,
    PageNum
  },
  data() {
    return {
      columns,
      searchLabel,
      userTag: false,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      userList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getRiskList', 'addRisk']),
    async showList(searchObj = {}) {
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.orgCode,
        ...searchObj
      }
      const res = await this.getRiskList(req)
      this.userList = res.result.list
      this.total = res.result.total
    },
    add() {
      this.userTag = true
    },
    del(record) {
      console.log(record)
    },
    searchForm(values) {
      console.log(values)
      const searchObj = {
        userName: values.userName,
        healthyState: values.healthyState
      }
      this.showList(searchObj)
    },
    async chooseUser(item, riskType) {
      console.log(item, riskType)
      const userCodes = []
      item.forEach(ele => {
        userCodes.push(ele.userCode)
      })
      console.log(userCodes)
      const req = {
        schoolCode: this.userInfo.orgCode,
        riskType,
        userCodes
      }
      const res = await this.addRisk(req)
      console.log(res.result)
      this.$message.success('添加成功')
      setTimeout(() => {
        this.$refs.chooseUser.reset()
        this.showList()
      }, 2000)
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 10px;
}
</style>
