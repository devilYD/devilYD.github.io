---
layout:         post
title:          SpringMVC中的请求
subtitle:       Web相关
date:           2022-11-1
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# SpringMVC中的请求

## 请求映射路径

`@RequestMapping`注释可以在controller类前使用来标识这个类中方法的公用路径前缀，这样可以避免各个controller中同名方法出现冲突。

## Get与Post请求发送普通参数

### Get请求

* Get请求的参数传递只需要在方法中添加同名key的形参即可

### Post请求

* Post请求的参数是存在请求体中的，以表单的形式发送则可以直接和Get请求使用相同的方式获取。
* Post请求会出现中文乱码，可以通过在Servlet容器初始化设置类中添加过滤器配置来解决。

代码如下：
```JAVA
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        return new Filter[]{};
    }
```

## 请求参数

* 参数种类
  * 普通参数
  * POJO类型参数
  * 嵌套POJO类型参数
  * 数组类型参数
  * 集合类型参数

### 普通参数

* 普通参数：url地址传参，地址参数名与形参变量名相同，定义形参即可接收参数
* 可以通过在形参前添加`@RequestParam("变量名")`来指定传参

### POJO类型参数

* 如果发送参数的属性名和实体类的属性名相同，则可直接在形参中使用实体类接收参数

### 嵌套POJO类型参数

* 如果实体类中有其他实体类的引用，则在传参数将key设置为`属性名.属性名`即可

### 数组类型参数

* 传参时将key设置为相同即存进一个数组

### 集合类型参数

* 在形参前添加`@RequestParam`注解，然后用和数组相同的操作即可

## 传递json数据

首先要在项目中引入Jackson依赖

```XML
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.9</version>
        </dependency>
```

其次数据要在请求体中以JSON的形式发送，在postman中将Body中的数据指定为raw的JSON格式即可。

然后需要在Spring的配置类中添加`@EnableWebMVC`注解，开启Spring将JSON数据转换成对象的功能。

最后需要在形参中添加`@RequestBody`注解，表示数据从请求体中获取。

* 名称：`@RequestBody`
* 类型：形参注解
* 位置：SpringMVC控制器方法形参定义前
* 作用：将请求体中所包含的数据传递给请求参数，此注解一个处理器方法只能使用一次。

## 日期类型参数传递

* 日期类型数据基于系统不同格式也不尽相同
  * 2088-08-18
  * 2088/08/18
  * 08/18/2088

可以在形参中直接使用`Data`类型的对象接收日期类型参数，但默认格式为`年/月/日`，若想使用其他格式需要使用`@DateTimeFormat`注解，在`pattern`属性中指定格式，指定方式为类似`yyyy-MM-dd`的形式

## 类型转换器

* 通过Converter接口
* Converter接口数量众多的实现类，以支持各种数据类型之间的数据转换
* `@EnableWebMvc`的功能之一就是开启根据类型匹配的类型转换器