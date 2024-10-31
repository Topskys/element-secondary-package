# element-secondary-packaging
ElementSecondaryPackaging是一个基于Element UI二次封装的配置式组件库。

[项目地址](https://github.com/Topskys/element-secondary-packaging.git)

## 使用

1. 下载仓库，放到项目./src/components目录下。
```bash
# 跳转到目标目录
cd ./src/components
# 克隆
git clone https://github.com/Topskys/element-secondary-packaging.git
```
2. 注册

** 局部注册 **

在Vue2组件中导入注册且使用
```js
// ./App.vue
<template>
 <div>
  <e-table ... ></e-table>
<div>
</template>

<script>
import ETable from './components/table/index.vue';

export default{
  components:{
    'e-table': ETable,
    // ...
  }
}
</script>
```

** 全局注册 **

```js
// ./main.js
import EForm from './components/form/index.vue';
// ...
app.components('e-form', EForm)
```

## 提示
该二次封装组件库尚未完善。
