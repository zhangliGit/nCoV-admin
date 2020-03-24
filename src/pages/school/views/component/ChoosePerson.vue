<template>
  <a-modal
    width="900px"
    :title="title"
    v-model="status"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
  >
    <a-row type="flex" justify="space-between" style="margin-bottom: 15px;">
      <a-col>
        <span>姓名：</span>
        <a-input style="width: 120px;margin-right: 10px" placeholder="请输入姓名" />
        <a-button type="primary">查询</a-button>
      </a-col>
      <a-col>
        <span style="color: red">*</span>
        <span>风险类型：</span>
        <span>
          <a-select v-model="riskType" defaultValue="0" style="width: 120px">
            <a-select-option value="0">请选择</a-select-option>
            <a-select-option value="1">疑似</a-select-option>
            <a-select-option value="2">确诊</a-select-option>
            <a-select-option value="3">健康</a-select-option>
          </a-select>
        </span>
      </a-col>
    </a-row>
    <div class="choose-user qui-fx">
      <div class="qui-fx-ver qui-fx-f1">
        <table-list
          is-check
          :scroll-h="100"
          v-model="chooseList"
          :columns="columns"
          @clickRow="clickRow"
          @selectAll="selectAll"
          :table-list="userList"
        ></table-list>
      </div>
      <div class="user-box qui-fx-ver">
        <div class="title qui-fx-jsb">
          <span>已选择</span>
          <span>{{ totalList.length }}人</span>
        </div>
        <div class="qui-fx-f1" style="overflow: auto">
          <ul>
            <li v-for="(item, index) in totalList" :key="item.id" class="qui-fx-jsb">
              <span>{{ item.name }}</span>
              <a-tag @click="delUser(item.id, index)" color="#f50">删除</a-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
const columns = [
  {
    title: '序号',
    width: '16.6%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '16.6%'
  },
  {
    title: '身份',
    dataIndex: 'userType',
    width: '16.6%',
    customRender: text => {
      if (text === 1) {
        return '教职工'
      } else if (text === 2) {
        return '学生'
      }
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '16.6%',
    customRender: text => {
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
    title: '电话',
    dataIndex: 'phone',
    width: '16.6%'
  },
  {
    title: '工号/学号',
    dataIndex: 'workNo',
    width: '16.6%'
  }
]
export default {
  name: 'ChoosePerson',
  components: {
    TableList
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('home', ['userInfo']),
    status: {
      get() {
        return this.value
      },
      set() {
        this.$emit('input', false)
      }
    }
  },
  async mounted() {
    this.showList()
  },
  data() {
    return {
      confirmLoading: false,
      chooseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      userList: [],
      totalList: [],
      riskType: '0'
    }
  },
  methods: {
    ...mapActions('home', ['getRiskList', 'getUserList']),
    async showList() {
      const req = {
        schoolCode: this.userInfo.orgCode
      }
      const res = await this.getUserList(req)
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    reset() {
      this.confirmLoading = false
      this.$emit('input', false)
    },
    error() {
      this.confirmLoading = false
    },
    delUser(id, index) {
      this.totalList.splice(index, 1)
      this.chooseList.splice(this.chooseList.indexOf(id), 1)
    },
    selectAll(item, type) {
      if (type) {
        this.totalList = this.totalList.concat(item)
      } else {
        item.forEach(item => {
          const index = this.totalList.findIndex(list => {
            return list.id === item.id
          })
          this.totalList.splice(index, 1)
        })
      }
      console.log(this.totalList)
    },
    // 监听选中或取消
    clickRow(item, type) {
      if (type) {
        this.totalList.push(item)
      } else {
        const index = this.totalList.findIndex(list => list.id === item.id)
        this.totalList.splice(index, 1)
      }
    },
    submitOk() {
      if (this.totalList.length === 0 || this.riskType === '0') {
        this.$message.warning('请选择人员和风险类型')
        return
      }
      this.confirmLoading = true
      this.$emit('submit', this.totalList, this.riskType)
    }
  }
}
</script>

<style lang="less" scoped>
.choose-user {
  height: 600px;
  .org-box {
    width: 200px;
  }
  .user-box {
    border: 1px #f5f5f5 solid;
    margin-left: 15px;
    width: 200px;
    .title {
      padding: 0 10px;
      background-color: #f5f5f5;
      height: 41px;
      line-height: 41px;
      border-bottom: 1px #f5f5f5 solid;
    }
    li {
      border-bottom: 1px #f5f5f5 solid;
      padding: 6px 0px 6px 8px;
    }
  }
}
</style>
