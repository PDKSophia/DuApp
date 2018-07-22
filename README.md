嘟嘟WebApp 
===============
## 目标功能
- [ ] 热门电影排行
- [ ] 音乐播放
- [ ] 查询天气
- [ ] 打卡签到，获得积分
- [ ] 博客文章
- [ ] 脑筋急转弯答题
- [ ] 动态分享

## 嘟嘟WebApp项目环境
> Node版本v8.0以上
> PHP5.6

## 目录结构
初始的目录结构如下：
~~~
WebApp
├─restful (暂未开源)            
│   ├─application
│   │    ├─auth                          豆瓣API / QQ音乐API
│   │    ├─index                         
│   │    │   ├─controller                控制器目录
│   │    │   ├─model                     模型目录
│   │    └─ ...
│   │ 
│   ├─config                            应用配置目录
│   │  ├─database.php                   数据库配置 
│   │  └─...
│   │
│   │ 
│   │
│   │  
├─vue  
│   ├─src
│   │    ├─assets                        图标 / 图片等
│   │    ├─components                    组件页面                         
│   │    │   ├─common                    通用组件目录
│   │    │   ├─pages                     页面目录
│   │    │   ├─pages                     页面目录
│   │    │   │  ├─cricle                 朋友圈动态目录
│   │    │   │  ├─found                  发现目录
│   │    │   │  ├─home                   主页面目录
│   │    │   │  ├─movie                  电影 / 音乐 目录
│   │    │   │  ├─personnal              个人目录
│   │    │   │  └─ ...
│   │    │   │  

~~~

## V2 版本移步
https://github.com/PDKSophia/duo-mi

## 再多说几句
```base
    此项目是博主在刚学vue 以及初次使用vuex开发到项目，经过不断的学习以及实习期间学到的技术，才发现自己到这个项目代码写到很菜，所以打算进行一次重构，将api抽离，并且对vuex进行模块化管理。新版本到代码可能在大佬们眼中也同样菜，但是有进步终归是好事嘛～
```

## 新版本说明
```javascript
    1 : 采用 vue-cli 3.0 初始化项目
    
    2 : 采用css扩展语言scss

    3 : 抛弃v1版本采用ydui的框架，v2版本采用Vant UI框架

    4 : 抽离api接口，对vue模块化管理，

```

## 使用
 1 ：git clone 

 2 ：进入到vue 下，npm install （默认安装了node）

 3 ：npm run dev

 （端口是1004，可以在vue/config/index.js 修改）
 
## 其他信息

API接口是在github上找的，包括QQ音乐的API也是在github上找的

免费开源使用。


版权所有Copyright © 2018 by PDK (http://www.pengdaokuan.cn/DuApp)

All rights reserved。

