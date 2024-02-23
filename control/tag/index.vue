<template>
  <div class="e-tag">
    <el-tag :type="config.cb && config.cb(data)||'info'" :size="config.size">{{ data[prop] }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'ETag',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.e-tag{
  display: inline-block;
}
</style>
