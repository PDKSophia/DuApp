嘟嘟WebApp 
===============
功能 ： 
 + 热门电影排行
 + 音乐播放
 + 查询天气
 + 打卡签到，获得积分
 + 五子棋小游戏，赢机器人获得积分
 + 脑筋急转弯答题
 + 博客文章
 + 动态分享
 + ...
 + ...


> WebApp的运行环境要求PHP5.6 + Node.js


## 目录结构

初始的目录结构如下：

~~~
WebApp
├─restful              
│   ├─application
│   │    ├─auth                          豆瓣API / QQ音乐API
│   │    ├─index                         
│   │    │   ├─controller                控制器目录
│   │    │   ├─model                     模型目录
│   │    └─ ...
│   │ 
│   ├─config                            应用配置目录
│   │  ├─database.php                   数据库配置 (需修改数据库登录名和密码)
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

> duapp.sql 需要在你的数据库中先创建一个duapp数据库，然后导入即可

## 使用
 1 ：git clone 

 2 ：进入到restful下，composer install (默认安装了composer)

 3 ：进入到vue 下，npm install （默认安装了node）

 4 ：进入到vue 下，npm run dev

 （端口是1004，可以在vue/config/index.js 修改）
 
## 其他信息

API接口是在github上找的，包括QQ音乐的API也是在github上找的

免费开源使用。

版权所有Copyright © 2018 by PDK (http://www.pengdaokuan.cn/DuApp)

All rights reserved。

