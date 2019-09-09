---
title: debian 和vbox遇到的坑
layout: post
categories: linux
tags: debian
---
#####　一：正常步骤在debain上装好vbox虚拟机，有两种方式，
            1.通过源安装
            2.在官网下载Deb包安装
#####　二： 在debain上安装vbox增强包Oracle_VM_VirtualBox_Extension_Pack
            1. sudo vboxmanage  extpack install Oracle_VM_VirtualBox_Extension_Pack 
            2. 通过vbox设置全局设置的扩展，选中vbox扩展包安装 
#####　三：将当前用户添加到vboxsers组
             sudo usermod -aG vboxusers <useers>
             重启电脑  
          这时候，如果虚拟机系统不认U盘，可以在虚拟机里面装驱动精灵，装缺少的驱动就可以正常识别U盘