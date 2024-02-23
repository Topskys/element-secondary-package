<template>
  <span :style="config?.style">{{ config.cb ? config.cb(data) : data[prop] }}</span>
</template>

<script>
export default {
  name: "e-text",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    prop: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>