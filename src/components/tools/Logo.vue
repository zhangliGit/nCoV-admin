<template>
  <div class="logo" style="color: #fff; font-size: 24px; padding-left:14x;">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  components: {},
  props: {
    title: {
      type: String,
      default: '全品疫情防控平台',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
