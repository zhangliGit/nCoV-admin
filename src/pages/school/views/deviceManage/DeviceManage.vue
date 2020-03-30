<template>
  <div class="page-layout qui-fx-ver">
    <search-form isReset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="plus" class="add-btn" @click="editDevice(false, {})">添加设备</a-button>
      </div>
    </search-form>
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="deviceList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑" @click="editDevice(true, action.record)">
          <a-button size="small" class="edit-action-btn" icon="form"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="delDevice(action.record)">
          <template slot="title">
            您确定删除吗?
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import hostEnv from '@/config/host-env'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import SubmitForm from '@c/SubmitForm'
import $ajax from '@u/ajax-serve'
const searchLabel = [
  {
    value: 'deviceName',
    type: 'input',
    label: '设备名称',
    placeholder: '请输入设备名称'
  }
]
const columns = [
  {
    title: '序号',
    width: '11%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: '11%'
  },
  {
    title: '设备SN码',
    dataIndex: 'deviceSn',
    width: '11%'
  },
  {
    title: '设备IP',
    dataIndex: 'deviceIp',
    width: '11%'
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    width: '11%',
    customRender: (text) => {
      if (parseInt(text) === 1) {
        return '面板机'
      } else if (parseInt(text) === 2) {
        return '摄像头'
      }
    }
  },
  {
    title: '绑定人员类型',
    dataIndex: 'bindType',
    width: '11%',
    customRender: (text) => {
      if (parseInt(text) === 1) {
        return '教职工'
      } else if (parseInt(text) === 2) {
        return '学生'
      } else if (parseInt(text) === 3) {
        return '教职工学生'
      } else if (parseInt(text) === 4) {
        return '访客'
      }
    }
  },
  {
    title: '设备状态',
    dataIndex: 'deviceState',
    width: '11%',
    customRender: (text) => {
      if (parseInt(text) === 1) {
        return '在线'
      } else if (parseInt(text) === 2) {
        return '离线'
      }
    }
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const formData = [
  {
    value: 'deviceName',
    initValue: '',
    type: 'input',
    label: '设备名称',
    placeholder: '请输入设备名称'
  },
  {
    value: 'deviceSn',
    initValue: '',
    type: 'input',
    label: 'SN码',
    placeholder: '请输入SN码'
  },
  {
    value: 'deviceIp',
    initValue: '',
    type: 'input',
    label: 'IP地址',
    regular: 'ip',
    placeholder: '请输入正确的IP地址'
  },
  {
    value: 'bindType',
    initValue: [],
    list: [
      {
        key: '1',
        val: '教职工'
      },
      {
        key: '2',
        val: '学生'
      }, {
        key: '3',
        val: '教职工学生'
      }, {
        key: '4',
        val: '访客'
      }
    ],
    type: 'select',
    label: '绑定类型',
    placeholder: '请选择绑定类型'
  },
  {
    value: 'deviceType',
    initValue: [],
    list: [
      {
        key: '1',
        val: '面板机'
      },
      {
        key: '2',
        val: '摄像头'
      }
    ],
    type: 'radio',
    label: '设备类型',
    placeholder: '请选择设备类型'
  }
]
export default {
  name: 'DeviceManage',
  components: {
    TableList,
    SubmitForm,
    PageNum,
    SearchForm
  },
  data() {
    return {
      columns,
      searchLabel,
      pageList: {
        page: 1,
        size: 20
      },
      title: '',
      formStatus: false,
      formData,
      total: 0,
      deviceList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getDeviceList', 'addDevice', 'updateDevice']),
    async showList(searchObj = {}) {
      const req = {
        ...this.pageList,
        ...searchObj,
        schoolCode: this.userInfo.orgCode
      }
      const res = await this.getDeviceList(req)
      this.deviceList = res.result.list
      this.total = res.result.totalCount
    },
    editDevice(type, form) {
      this.isEdit = type
      if (type) {
        this.title = '编辑设备'
        this.deviceState = form.deviceState
        this.funName = 'updateDevice'
        this.id = form.id
        this.formData = this.$tools.fillForm(formData, form)
      } else {
        this.formData = formData
        this.funName = 'addDevice'
        this.title = '新增设备'
        this.deviceState = 1
      }
      this.formStatus = true
    },
    async delDevice(record) {
      try {
        await $ajax.del({
          url: `${hostEnv.wangxuanzhang}/school/deviceInfo/delete?id=${record.id}`
        })
      } catch (e) {
      }
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    searchForm(values) {
      this.pageList.page = 1
      this.showList(values)
    },
    async submitForm (values) {
      console.log(values)
      if (this.isEdit) {
        values.id = this.id
      }
      values.deviceState = this.deviceState
      values.schoolCode = this.userInfo.orgCode
      try {
        await this[this.funName](values)
      } catch (e) {
        this.$refs.form.error()
      }
      this.$refs.form.reset()
      this.$message.success('操作成功')
      this.$tools.goNext(() => {
        this.showList()
      })
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
      try {
        await this.addRisk(req)
      } catch (e) {
        this.$refs.chooseUser.error()
      }
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
