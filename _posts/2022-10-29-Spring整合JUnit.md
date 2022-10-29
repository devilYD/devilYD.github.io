---
layout:         post
title:          Spring整合JUnit
subtitle:       测试
date:           2022-10-29
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# Spring整合JUnit

* 导入依赖

```XML
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>5.3.18</version>
    </dependency>
```

* 使用

在测试类上加上注解`@RunWith(SpringJUnit4ClassRunner.class)`和`@ContextConfiguration(classes = SpringConfig.class)`来标明所使用Spring配置，然后将需要测试的bean作为类的属性引入并标记自动装配，最后直接在测试方法下进行测试即可。