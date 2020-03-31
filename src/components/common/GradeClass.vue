<template>
  <div class="grade-class">
    <a-tree
      v-if="treeData.length > 0"
      :defaultSelectedKeys="defaultSelectedKeys"
      @select="select"
      :loadData="onLoadData"
      :treeData="treeData"
    ></a-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import hostEnv from '@/config/host-env'
import $ajax from '@u/ajax-serve'
export default {
  name: 'GradeClass',
  props: {
    isGrade: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      treeData: [],
      gradeId: '',
      classId: '',
      gradeList: [],
      defaultSelectedKeys: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.initMenu()
  },
  methods: {
    onExpand() {},
    // 点击节点
    select(obj, tree) {
      const gradeIds = []
      this.gradeList.forEach(el => {
        return gradeIds.push(el.gradeCode)
      })
      if (gradeIds.indexOf(obj[0]) === -1) {
        this.classCode = obj[0]
      } else {
        this.gradeCode = obj[0]
        this.classCode = ''
      }
      if (tree.selectedNodes.length === 0) return
      const selectObj = {
        gradeCode: this.gradeCode,
        classCode: this.classCode,
        name: tree.selectedNodes[0].data.props.title
      }
      this.$emit('select', selectObj)
    },
    async initMenu() {
      const res = await $ajax.get({
        url: `${hostEnv.wangxuanzhang}/operate/gradeinfo/getGradelist?schoolCode=${this.userInfo.orgCode}`
      })
      const selectObj = {
        gradeCode: res.result[0].gradeCode,
        classCode: '',
        name: res.result[0].gradeName
      }
      this.gradeList = res.result
      this.defaultSelectedKeys = [res.result[0].gradeCode]
      this.treeData = res.result.map(item => {
        return {
          title: item.gradeName,
          key: item.gradeCode,
          pCode: item.gradeCode
        }
      })
      this.onLoadData({
        dataRef: {
          pCode: res.result[0].gradeCode,
          key: res.result[0].gradeCode,
          isLeaf: true
        }
      })
      this.$emit('select', selectObj)
    },
    async onLoadData(treeNode) {
      if (this.isGrade) return
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.gradeCode = treeNode.dataRef.key
        $ajax
          .post({
            url: `${hostEnv.wangxuanzhang}/school/classInfo/getClassInfoByGradeCode?schoolCode=${this.userInfo.orgCode}&gradeCode=${this.gradeCode}`
          })
          .then(res => {
            treeNode.dataRef.children = res.result.map(item => {
              return {
                title: item.className,
                key: item.classCode,
                isLeaf: true
              }
            })
            this.treeData = [...this.treeData]
            resolve()
          })
      })
    }
  }
}
</script>

<style lang="less" scoed>
.grade-class {
  background: #fff;
  width: 200px;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
