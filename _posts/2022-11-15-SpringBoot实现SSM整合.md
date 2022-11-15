---
layout:         post
title:          SpringBoot实现SSM整合
subtitle:       Web相关
date:           2022-11-15
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# SpringBoot实现SSM整合

## SpringBoot整合Junit

SpringBoot本身就包含Junit，故可直接使用，方法如下：

* 创建测试类
* 添加类注解`@SpringBootTest`
* 在类中写测试方法和自动注入对象即可

## SpringBoot实现SSM整合

* 由于SpringBoot本身就包含Spring所以不存在SpringBoot整合Spring
* 在创建项目时勾选Speing Web即可使项目包含SpringMVC
* 故重点在于整合MyBatis

### SpringBoot整合MyBatias

* 在创建项目时勾选Spring Web、MyBatis Framework、MySQL Driver
* 在pom文件中添加Druid依赖
* 创建yml配置文件，添加配置
* 在Mapper代理接口前添加`@Mapper`注解

```XML
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.14</version>
        </dependency>
```

```JAVA-PROPERTIES
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/数据库名称?autoReconnect=true&useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8&useSSL=false
    username: 账号
    password: 密码
    type: com.alibaba.druid.pool.DruidDataSource
```

这样就完成了。