<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :width="width + 'px'"
      :before-close="onCancel"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="container" :style="{height:height+'px'}">
        <slot name="content" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :type="options.buttons.cancelType" :size="options.buttons.size" @click="onCancel">{{ options.buttons.cancelText }}}</el-button>
        <el-button :type="options.buttons.confirmType" @click="onConfirm">{{ options.buttons.confirmText }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 769
    },
    height: {
      type: Number
    },
    options: {
      type: Object,
      default: () => ({
        buttons: {
          size: 'small',
          cancelText: '取 消',
          confirmText: '确 定',
          cancelType: 'default',
          confirmType: 'primary'
        }
      })
    }
  },
  data() {
    return {}
  },
  computed: {
    /**
     * js计算container高度
     * @returns {number}
     */
    containerHeight() {
      return window.innerHeight - 111
    }
  },
  methods: {
    /**
     * 取消按钮事件回调
     */
    onCancel() {
      this.$emit('onCancel')
    },
    /**
     * 确认按钮事件回调
     */
    onConfirm() {
      this.$emit('onConfirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  overflow-x: initial;
  overflow-y: auto;
}
.el-dialog__wrapper {
  ::v-deep .el-dialog {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    .head-operation {
      padding: 10px 0 20px;
      overflow: hidden;
    }

    .el-dialog__header {
      border-bottom: 1px solid #e8e8e8;
    }
    //.el-dialog__header {
    //  border-top-left-radius: 7px !important;
    //  border-top-right-radius: 7px !important;
    //  background-color: #1890ff;
    //  .el-dialog__title {
    //    color: #fff;
    //    font-size: 15px;
    //    font-weight: 700;
    //  }
    //  .el-dialog__close {
    //    color: #fff;
    //  }
    //}
    .el-dialog__body {
      padding: 10px 10px !important;
      max-height: calc(90vh - 111px)!important;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .el-dialog__footer {
      //border-top: 1px solid #e8eaec !important;
      padding: 10px !important;
    }
  }
}
</style>
