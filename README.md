# 交易所后台管理系统 #
基于Vue.js 2.x系列 + Element UI 的后台管理系统。

## 安装步骤 ##

	git clone https://github.com/lin-xin/manage-system.git		// 把模板下载到本地
	cd manage-system											// 进入模板目录
	npm install													// 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 组件使用说明与演示 ##

### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)

### vue-datasource ###
一个用于动态创建表格的vue.js服务端组件。访问地址：[vue-datasource](https://github.com/coderdiaz/vue-datasource)


## 其他注意事项 ##
### 一、如果我不想用到上面的某些组件呢，那我怎么在模板中删除掉不影响到其他功能呢？ ###

举个栗子，我不想用 vue-datasource 这个组件，那我需要分四步走。

第一步：删除该组件的路由，在目录 src/router/index.js 中，找到引入改组件的路由，删除下面这段代码。

```JavaScript
{
    path: '/vuetable',
    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
},
```

第二步：删除引入该组件的文件。在目录 src/components/page/ 删除 VueTable.vue 文件。

第三步：删除该页面的入口。在目录 src/components/common/Sidebar.vue 中，找到该入口，删除下面这段代码。
	
```HTML
<el-menu-item index="vuetable">Vue表格组件</el-menu-item>
```

第四步：卸载该组件。执行以下命令：
	
	npm un vue-datasource -S

完成。

### 二、如何切换主题色呢？ ###

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 theme="dark" 去掉即可。