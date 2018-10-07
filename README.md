## 项目介绍

用 Vue + Koa2 + MongoDB 开发的移动端web商城。

整个项目采用前后端分离的开发模式，前端实现了首页商品楼层、商品分类展示、加入购物车、会员注册登录等基本功能，并进行了移动端屏幕适配、平台兼容；后端为前端提供数据接口和数据的查询存储功能。

服务器环境：Linux(CentOS 7) + Nginx + MongoDB + Node

项目线上地址：![http://mall.xksblog.top](http://mall.xksblog.top)

## 开发技术栈

* 前端技术：Vue2 + VueRouter + Axios
* 后端技术：Node + Koa2 + MongoDB + Mongoose
* 构建工具：Webpack
* CSS预编译器: Less
* ES6：采用ES6语法

## 安装运行

```shell
# 请先确保已安装Node及MongoDB数据库(db文件夹在C:/data/)

# 环境安装
npm install

# 启动数据库
mongod

# 启动后端服务并连接数据库，后端页面地址为localhost:3000
cd ./service/
node index.js

# 执行./service/appApi下的相关接口API获取数据

# 启动服务，前端页面地址为localhost:8080
npm run dev
```

## 部分截图

#### 商品展示页面

<img src="https://github.com/stay1100/MallDemo/blob/master/screenshots/home.gif" width="365" height="619"/>


#### 商品分类页面

<img src="https://github.com/stay1100/MallDemo/blob/master/screenshots/list.gif" width="365" height="619"/>


#### 购物车页面

<img src="https://github.com/stay1100/MallDemo/blob/master/screenshots/buy.gif" width="365" height="619"/>