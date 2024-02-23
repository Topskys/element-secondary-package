<template>
  <div class="e-table">
    <!-- 表格 -->
    <el-table ref="table" v-loading="config.loading || false" :data="config.tableData" :check-list="check_list"
      :border="config.border" :stripe="config.stripe" :element-loading-text="config.loadingText || '加载中...'" row-key="id"
      :default-expand-all="config.expandAll || true" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :height="tableHeight" @selection-change="selectionChange" @sort-change="sortChange">
      <el-table-column v-if="config.checkbox" type="selection" width="50" align="center" />
      <el-table-column v-if="config.index" type="index" label="序号" align="center" width="100" show-overflow-tooltip />

      <template v-for="col in config.columns">
        <el-table-column :key="col.prop + Math.random() * 999 + 1" :prop="col.prop" :label="col.label" :width="col.width"
          :min-width="col.minWidth" :align="col.align || 'center'" :sortable="col.sortable || false"
          :sort-by="col.sort_by" :render-header="col.renderHeader" :show-overflow-tooltip="JSON.stringify(col?.show_tooltip) === undefined
            ? true
            : col.show_tooltip
            " :fixed="col.fixed || false">
          <template slot-scope="scope">
            <slot v-if="col.type === 'slot'" :name="col.slot_name" :data="scope.row" :index="scope.$index" />
            <component :is="
                !col.type
                  ? 'e-text'
                  : col.type === 'text'
                  ? 'e-text'
                  : `e-${col.type}`
              " v-else :data="scope.row" :config="col" :prop="col.prop" :value.sync="config.columns[col.prop]" />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination v-if="config.pagination?.show"
      :layout="config.pagination.layout || 'total, sizes, prev, pager, next, jumper'"
      :current-page.sync="config.pagination.page" :page-sizes="[5, 10, 15, 20, 25, 30]"
      :page-size="config.pagination.pageSize || 10" :total="config.pagination.total || 0"
      :align="config.pagination?.align || 'right'" :background="config.pagination?.background || false"
      style="margin-top: 20px" @current-change="currentChange" @size-change="sizeChange" />
  </div>
</template>

<script>
import axios from "axios";

/**
 * require.context(dir,sub,extension)
 * @description: 自动化装配组件
 * @param {String} directory 读取目录
 * @param {Boolean} subdirectories 是否读取目录下的子文件
 * @param {String} extension 读取的文件，可选正则表达
 * @param {String} alias 读取文件别名
 */
const files = require.context(
  "@/components/common/control",
  true,
  /\index.vue$/
);
const [path, modules, alias] = [require("path"), {}, "e-"];

files
  .keys()
  .forEach(
    (key) => (modules[`${alias}${key.split("/")[1]}`] = files(key).default)
  );

export default {
  name: "ETable",
  components: modules,
  props: {
    config: {
      type: Object,
      default: {
        tableData: {
          type: Array,
          default: () => [],
        },
        columns: {
          type: Array,
          default: () => [],
        },
        offsetTopHeight: {
          type: Number,
          default: 0,
        }, // 表格高度（需要减掉的高度）
        onLoad: Boolean, // 数据回调
        index: Boolean, // 序号
        checkbox: Boolean, // 复选框
        format: Function, // 数据格式化
        stripe: Boolean, // 斑马条纹
        // 请求参数
        req: {
          type: Object,
          default: () => { },
        },
        // 分页
        pagination: {
          show: false,
          total: 0,
          layout: "total, sizes, prev, pager, next, jumper", // 'total,prev,pager,next,sizes'
        },
      },
    },
    check_list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    tableHeight: function () {
      const height = this.config?.offsetTopHeight;
      return height ? `calc(100vh - ${height}px)` : "auto"; // (window.innerHeight - height) + "px"
    },
  },
  beforeMounted() {
    // this.getTableList();
  },
  methods: {
    // 请求列表数据
    getTableList() {
      // 如果请求参数为空，则停止获取数据
      if (JSON.stringify(this.config.req) === "{}") return;

      axios(this.config.req).then((res) => {
        let req = res.data.data;
        // 数据格式化
        if (this.config.format && typeof this.config.format === "function") {
          req = this.config.format(res.data.data);
        }
        this.config.tableData = res.data.data;
        // 回调数据
        this.config.onLoad && this.$emit("onLoad", res.data.data);
      });
    },
    // 复选框
    selectionChange(val) {
      // 数据同步 or 子传父
      this.$emit("update:checkList", val); // .sync数据同步
      //   this.$emit("getCheckList", val); // 子传父
    },
    // 远程排序
    sortChange({ column, prop, order }) {
      // console.log("e-table远程排序-", column, prop, order);
    },
    // 页码变化
    currentChange(e) {
      this.$emit("currentChange", e);
    },
    // 条数变化
    sizeChange(e) {
      this.$emit("sizeChange", e);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.el-table thead,
::v-deep .el-table th {
  color: #262626;
  font-weight: 400;
  background: #f7fbff;
}
</style>
