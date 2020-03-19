<template>
  <div class="grade-tree">
    <a-tree @select="select" :loadData="onLoadData" :treeData="treeData"></a-tree>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'GradeTree',
  props: {
    gradeUrl: {
      type: String,
      default: ''
    },
    classUrl: {
      type: String,
      default: ''
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
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.initMenu()
  },
  methods: {
    ...mapActions('home', ['getGradeList', 'getClassList']),
    onExpand() {},
    // 点击节点
    select(obj, tree) {
      const gradeIds = []
      this.gradeList.forEach(el => {
        return gradeIds.push(el.gradeId)
      })
      if (gradeIds.indexOf(obj[0]) === -1) {
        this.classId = obj[0]
      } else {
        this.gradeId = obj[0]
        this.classId = ''
      }
      if (tree.selectedNodes.length === 0) return
      const selectObj = {
        gradeId: tree.selectedNodes[0].data.props.gradeId,
        key: this.classId,
        code: tree.selectedNodes[0].data.props.pCode,
        title: tree.selectedNodes[0].data.props.title,
        year: tree.selectedNodes[0].data.props.year
      }
      this.$emit('select', selectObj)
    },
    async initMenu() {
      const req = {
        schoolCode: this.userInfo.orgCode
      }
      const res = await this.getGradeList(req)
      const selectObj = {
        gradeId: res.result[0].gradeCode,
        key: res.result[0].gradeCode,
        code: res.result[0].gradeCode,
        title: res.result[0].gradeName
      }
      this.gradeList = res.result
      this.treeData = res.result.map(item => {
        return {
          title: item.gradeName,
          key: item.gradeCode,
          pCode: item.gradeCode,
          gradeId: item.gradeCode
        }
      })
      this.onLoadData({
        dataRef: {
          pCode: res.result[0].gradeCode,
          key: res.result[0].gradeCode
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
        this.gradeId = treeNode.dataRef.key
        const req = {
          schoolCode: this.userInfo.orgCode,
          gradeCode: this.gradeId
        }
        this.getClassList(req).then(res => {
          treeNode.dataRef.children = res.result.map(item => {
            return {
              title: item.className,
              key: item.classCode,
              gradeId: item.gradeCode,
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
