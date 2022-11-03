---
layout:         post
title:          SpringMVC中的响应
subtitle:       Web相关
date:           2022-11-2
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# SpringMVC中的响应

* 页面跳转
  * 只需要以字符串类型返回页面名称即可。

* 返回纯文本数据
  * 在方法前添加`@ResponseBody`，然后以字符串类型返回文本数据即可。

* 响应JSON数据
  * 返回POJO对象，在方法前添加`@ResponseBody`，直接以对应的对象类型返回对象。

* 名称：`@ResponseBody`
* 类型：方法注解
* 位置：方法前
* 作用：SpringMVC控制器返回值作为响应体

注意：`@ResponseBody`可以写在类前表示整个类的所有方法均以SpringMVC控制器返回值作为响应体。