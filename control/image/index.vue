<template>
  <el-image
    :src="config.cb ? config.cb(data) : data[prop]"
    :fit="config.fit"
    :style="[sizeStyle]"
    crossOrigin
  ></el-image>
</template>

<script>
export default {
  name: "e-image",
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
  computed: {
    sizeStyle() {
      const width = this.config?.image?.width || "50px";
      const height = this.config?.image?.height || "50px";
      const borderRadius = this.config?.borderRadius || "4px";
      return { width, height, borderRadius };
    },
  },
};
</script>

<style></style>
