---
layout:         post
title:          SpringMVC
subtitle:       基本使用
date:           2022-10-31
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# SpringMVC

* SpringMVC技术与Servlet技术功能相同，均属于web层开发技术

## 简介

* SpringMVC是一种基于Java实现MVC模型的轻量型Web框架
* 优点：
  * 使用简单，开发便捷(相比于Servlet)
  * 灵活性强

## 简单入门

* 使用SpringMVC技术需要先导入SpringMVC依赖与Servlet依赖
```XML
        <!--SpringMVC相关-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.3.18</version>
        </dependency>

        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <scope>provided</scope>
            <version>2.5</version>
        </dependency>
```

* 创建SpringMVC配置类,将controller包加入容器管理的范围

* 创建SpringMVC控制器类(等同于Servlet功能)，在类前添加`@Controller`注解使其可被Spring容器管理

* 创建方法，添加`@RequestMapping`注解，在属性中指定其访问坐标，并添加`@ResponseBody`注解，意为将返回值对象转换为JSON格式并写入响应数据的响应体中。

* 编写代码使Tomcat加载SpringMVC配置

```JAVA
//定义一个Servlet容器初始化设置类，在里面加载Spring配置
public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
    //加载SpringMVC容器配置
    @Override
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(SpringMVCConfig.class);
        return ctx;
    }

    //设置哪些请求归求SpringMVC配置
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    //设置Spring容器
    @Override
    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }
}
```

* 安装Tomcat的maven插件，运行即可访问

```XML
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.2</version>
        <configuration>
          <!--端口控制-->
          <port>80</port>
          <!--项目路径控制意味着http://localhost/-->
          <path>/</path>
          <!--编码-->
          <uriEncoding>UTF-8</uriEncoding>
        </configuration>
      </plugin>
```

## 简单入门中的注解详解

* 名称：`@Controller`
  * 类型：类注解
  * 位置：SpringMVC控制器类定义上方
  * 作用：设定SpringMVC的核心控制器bean
* 名称：`@RequestMapping`
  * 类型：方法注解
  * 位置：SpringMVC控制器方法定义上方
  * 作用：设置当前控制器方法请求访问路径
* 名称：`@ResponseBody`
  * 类型：方法注解
  * 位置：SpringMVC控制器方法定义上方
  * 作用：设置当前控制器方法响应内容为当前返回值，无需解析

## 简单入门的工作流程

* 启动服务器初始化过程
  1. 服务器启动，执行`ServletContainersInitCongig`类，初始化web容器
  2. 执行`createServletApplicationContext()`方法，创建`WebApplicationContext`对象
  3. 加载`SpringConfig`
  4. 执行`@ComponentScan`对应的bean
  5. 加载`UserController`，每个`RequestMapping`的名称对应一个具体的方法
  6. 执行`getServletMappings`方法，定义所有的请求都通过SpringMVC

* 单次请求过程
  1. 发送请求localhost/test
  2. web容器发现所有请求都经过SpringMVC，将请求交给SpringMVC处理
  3. 解析请求路径/test
  4. 由/test匹配执行对应的方法
  5. 执行
  6. 检测到有`@ResponsBody`直接将方法的返回值作为响应体返回给请求方

## Controller加载控制与业务bean加载控制

* SpringMVC只加载表现层bean
* Spring控制的bean
  * 业务bean(Service)
  * 功能bean(DataSource等)
* 解决方案为：
  1. 加载Spring控制的bean时排除掉SpringMVC控制的bean
  2. Spring加载的bean设定扫描范围为精准范围
  
关于加载Spring控制的bean时排除掉SpringMVC控制的bean的代码如下：
```JAVA
@ComponentScan(value = "org.YD",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ANNOTATION,
                classes = Controller.class
        )
)
```

而精准范围则使用数组即可。

另外在配置Tomcat加载SpringMVC配置时还可以通过继承`AbstractDispatcherServletInitializer`类的子类`AbstractAnnotationConfigDispatcherServletInitializer`来进行配置，具体如下：
```JAVA
public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMVCConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

会更加方便。

## PostMan简介

* PostMan是一款功能强大的网页调试与发送网页HTTP请求的Chrome插件
* 作用：常用于接口测试
* 特征：
  * 简单
  * 实用
  * 美观
  * 大方

<a href="https://github.com/hlmd/Postman-cn">关于postman安装与汉化可以参照这个文档</a>

进入软件，注册后，创建工作空间，创建请求，即可。