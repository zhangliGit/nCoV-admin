/**
 * @description 注册全局组件
 */
import {
  Drawer,
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
  InputNumber,
  Menu,
  LocaleProvider,
  message,
  upload,
  Switch,
  TimePicker,
  Calendar
} from 'ant-design-vue'
const ComList = [
  Drawer,
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
  InputNumber,
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
