<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="wangEditor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor v-model="text" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" @onChange="onChange"
      class="editor"  />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Message } from 'element-ui'

export default {
  props: {
    options: {
      type: Object,
      default: () => ({
        value: "",
        server: "/upload"
      }),
    },
  },
  components: {
    Editor,
    Toolbar,
  },
  data() {

    return {
      wangEditor: null,
      text: "",
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        excludeKeys: [
          /* 隐藏哪些菜单 */
          "fullScreen",
          "group-video",
        ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            server: this.options?.server || `${process.env.VUE_APP_BASE_API}/upload`, // 这里填上传图片的接口
            fieldName: "file",
            /**
             * 自定义插入图片
             * @param {*} res 上传结果
             * @param {*} insertFn 插入图片回调函数
             */
            customInsert(res, insertFn) {
              const data = res?.data
              if (data) {
                const [url, alt, href] = [data, '', data]
                insertFn(url, alt, href)
              } else {
                Message.error('上传图片失败')
              }
            },
            /**
             * 单个文件上传失败
             * @param {*} file 文件
             * @param {*} res 结果
             */
            onFailed(file, res) {
              console.log(`${file.name} 上传失败`, res)
              Message.error('上传图片失败')
            },

            /**
             * 上传错误，或者触发 timeout 超时
             * @param {*} file 文件
             * @param {*} err 错误消息
             * @param {*} res 结果
             */
            onError(file, err, res) {
              console.log(`${file.name} 上传出错`, err, res)
              Message.error('上传图片错误')
            },
          }
        }
      },
      mode: "default", // or 'simple'
      minHeight: '350px',
    };
  },
  methods: {
    onCreated(editor) {
      // 一定要用 Object.seal() ，否则会报错
      this.wangEditor = Object.seal(editor);
    },
    onChange(editor) {
      // onChange 时获取编辑器最新内容
      this.$emit("update:value", editor.getHtml());
    },
    resizeHandler() {
      this.minHeight = `max(300px,calc(${window.innerHeight}px - 5%))`
    }
  },
  mounted() {
    // window.addEventListener('resize', this.resizeHandler)
  },
  watch: {
    "options.value": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.text = newVal;
        }
      },
      immediate: true,
    },
    // text: {
    //   handler(newVal, oldVal) {
    //     this.$emit("update:value", newVal);
    //   },
    // },
  },
  beforeDestroy() {
    const editor = this.wangEditor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
    // window.removeEventListener("resize", this.resizeHandler);
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>


<style lang="scss" scoped>
.editor {
  min-height: 350px;
  max-height: calc(100vh - 365px);
  overflow: auto;
}
</style>