<template>
  <div :id="id" :option="option"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
export default {
  name: 'ChartComponent',
  components: {},
  data() {
    return {
      chart: null
    }
  },
  props: {
      id: {
        type: String
      },
      option: {
        type: Object
      }
    },
  mounted() {
    Highcharts.chart(this.id, this.option)  
  },
  methods: {
  
  }
}
</script>
<style lang="less" scoped>

</style>
