/**
 * @description 注册全局组件
 */
import {
  Tooltip,
  Popconfirm,
  Pagination,
  Row,
  Tree,
  Col,
  Icon,
  Tag,
  Select,
  Table,
  Checkbox,
  Radio,
  DatePicker,
  Tabs,
  Button,
  Layout,
  Modal,
  Dropdown,
  Form,
  Input,
  Menu,
  LocaleProvider,
  message,
  upload
} from 'ant-design-vue'
const ComList = [
  Tooltip,
  Popconfirm,
  Pagination,
  Select,
  Checkbox,
  Radio,
  Table,
  Row,
  Col,
  Tree,
  Icon,
  Tag,
  Tabs,
  Button,
  Layout,
  Dropdown,
  DatePicker,
  Modal,
  Form,
  Input,
  Menu,
  LocaleProvider,
  message,
  upload
]
const install = Vue => {
  ComList.forEach(item => {
    Vue.use(item)
  })
  Vue.prototype.$message = message
}

export default {
  install
}
