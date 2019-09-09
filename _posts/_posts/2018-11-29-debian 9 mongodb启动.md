---
title: mongodb在debian9的启动
layout: post
categories: linux
tags: 数据库
---
1. 在home当前用户目录下 ：mkdir -p mongodb/data/db/
2. 开一个终端,进入mongodb目录，执行：mongod  -dbpath /data/db/
3. 在另一个终端执行：mongo，就可以愉快的玩耍啦