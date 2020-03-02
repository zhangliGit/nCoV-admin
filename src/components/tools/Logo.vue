<template>
  <div class="logo" style="color: #fff; font-size: 25px; padding-left:15px;">
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
      default: '全品云平台',
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
