/**
 * @description 注册全局组件
 */
import {
  Popconfirm,
  Tooltip,
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
  upload,
  Switch,
  TimePicker,
  Calendar
} from 'ant-design-vue'
const ComList = [
  Popconfirm,
  Tooltip,
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
  upload,
  Switch,
  TimePicker,
  Calendar
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
