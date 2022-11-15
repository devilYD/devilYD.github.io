---
layout:         post
title:          SpringBoot简介
subtitle:       Web相关
date:           2022-11-14
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# SpringBoot简介

* SpringBoot是由Pivotal团队提供的全新框架，其设计目的是用来简化Spring应用的初识搭建以及开发过程

## 原生开发SpringMVC程序过程

* 首先注入相关依赖

* 其次编写配置类

* 编写controller类

## SpringBoot简单入门

* 在IDEA中使用Spring Initializr创建SpringBoot项目，在其中勾选SpringWeb组件
* 编写controller
* 运行Application类

这样一个简单的SpringBoot程序就完成并且运行了。

* 最简单的SpringBoot程序所包含的基础文件：
  * pom.xml文件
  * Application文件

* Spring程序与SpringBoot程序对比
|类/配置文件|Spring|SpringBoot|
|----------|------|----------|
|pom文件中的坐标|手工添加|勾选添加|
|web3.0配置类|手工制作|无|
|Spring/SpringMVC配置类|手工制作|无|
|控制器|手工制作|手工制作|

* 基于idea开发SpringBoot程序需要确保联网且能够加载到程序框架结构

当然也可以从Spring官网进行项目构建。

## SpringBoot项目的快速启动

* SpringBoot项目可以直接打包成jar文件，需要时直接使用`java -jar 文件名`直接运行
* 打包可以使用Maven的`package`指令进行打包。

## SpringBoot概述

* SpringBoot是由Pivotal团队提供的全新框架，其设计目的是用来简化Speing应用的初识搭建以及开发过程
* Spring程序缺点
  * 配置繁琐
  * 依赖设置繁琐
* SpringBoot程序优点
  * 自动配置
  * 起步依赖(简化依赖配置)
  * 辅助功能(内置服务器，...)

## SpringBoot起步依赖

* Starter
  * SpringBoot中常见项目名称，定义了当前项目使用的所有项目坐标，以达到减少依赖配置的目的
* paremt
  * 所有SpringBoot项目要继承的项目，定义了若干个坐标版本(依赖管理，而非依赖)，以达到减少依赖冲突的目的
  * spring-boot-starter-parent(2.5.0)与spring-boot-starter-parent(2.4.6)共计57处坐标版本不同
* 实际开发
  * 使用任意坐标是，仅书写GAV中的G和A，V由SpringBoot提供
  * 如果发生坐标错误，再指定version(要小心版本冲突)

## SpringBoot辅助功能

* 比如内置Tomcat服务器等

## SpringBoot程序启动

* 启动方式：`Springboot01QuickstartApplication`类
* SpringBoot项目在创建时采用jar的打包方式
* SpringBoot的引导类是项目的入口，运行main方法就可以启动项目