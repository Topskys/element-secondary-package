<template>
  <el-switch
    v-model="val"
    :disabled="config.disabled"
    :active-value="true"
    :inactive-value="false"
    @change="onChange"
  ></el-switch>
</template>

<script>
export default {
  name: "e-switch",
  props: {
    value: {
      type: [Boolean],
      default: false,
    },
    data: {
      type: [Object],
      default: ()=>({}),
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
  data() {
    return {
      val: false,
    };
  },
  watch: {
    // value: {
    //   handler(newVal) {
    //     console.log("swi------------------------", newVal);
    //     this.val = newVal;
    //   },
    //   immediate: true,
    // },
    "data.status": {
      handler(newVal) {
        console.log("swi------------------------", newVal);
        this.val = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    onChange() {
      console.log("onChange", this.prop);
      this.$emit("update:value", this.val);
      // TODO...
      // this.cb? this.cb(this.val):this.fetchSwitch(this.val);
    },
    fetchSwitch(data){}
  },
};
</script>

<style>
</style>