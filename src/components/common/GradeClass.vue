<template>
  <div class="grade-tree">
    <a-tree @select="select" :loadData="onLoadData" :treeData="treeData"></a-tree>
  </div>
</template>

<script>
import $ajax from '@u/ajax-serve'
export default {
  name: 'GradeClass',
  props: {
    gradeUrl: {
      type: String,
      default: 'http://192.168.2.247:3000/mock/40/getGrade'
    },
    classUrl: {
      type: String,
      default: 'http://192.168.2.247:3000/mock/40/getClass'
    }
  },
  data() {
    return {
      treeData: [],
      gradeId: '',
      classId: '',
      gradeList: []
    }
  },
  computed: {},
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
      const res = await $ajax.get({ url: '/admin/operate/gradeinfo/getGradelist?schoolCode=QPZX' })
      const selectObj = {
        gradeId: res.result[0].gradeCode,
        key: '',
        code: '',
        title: res.result[0].gradeName,
        year: ''
      }
      this.gradeList = res.result
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
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.gradeCode = treeNode.dataRef.key
        $ajax
          .post({
            url: '/admin/school/classInfo/getClassInfoByGradeCode?schoolCode=QPZX&gradeCode=' + this.gradeCode
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
.grade-tree {
  width: 200px;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
