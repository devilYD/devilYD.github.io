---
layout:         post
title:          Spring注解开发定义bean
subtitle:       简化开发的第一步
date:           2022-10-25
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# Spring注解开发定义bean

## 注解开发定义bean

可以通过在类定义的上一行添加`@Component`(组件)注解,在注解后的括号中添加对应的属性即可,另外需要在Spring配置文件中要添加`<context:component-scan base-package="包名"/>`

另外,Spring提供了`@Component`注解的三个衍生注解:
* `@Controller`:用于表现层bean定义
* `@Service`:用于业务层的bean定义
* `@Repository`:用于数据层的bean定义

## 纯注解开发模式

* Spring3.0升级了纯注解的开发模式,使用Java类代替配置文件,开启了Spring快速开发赛道
* 创建config包和SpringConfig类作为注解的载体
* `@Configuration`注解用于设定当前类为配置类
* `@ComponentScan`注解用于设定扫描路径,此注解只能添加一次,多个数据请用数组格式.

## 注解开发bean的作用范围&注解开发bean的生命周期

* 可以通过`@Scop`注解设置bean是单例还是非单例,以此来控制bean是全局还是局部,即作用范围
* 可以通过在类中的方法上添加`@PostConstruct`和`@PreDestroy`注解来指定对象的预处理和销毁方法,来控制bean的生命周期


## 注解开发的依赖注入

### 自动注入

* 注解开发只支持自动注入
* 只需要需要注入的成员上添加`@Autowired`即可,不需要依赖于set方法就能够完成自动注入
* 可以使用`@Qualifier`将指定名称的bean注入
* 注意:自动装配基于反射设计创建对象并暴力反射对应属性为私有属性初始化数据,因此无需提供setter方法
* 注意:自动装配建议使用无参构造方法创建对象(默认),如果不提供对应构造方法,请提供唯一的构造方法

### 引入properties文件

* 在配置类中添加注解`@PropertySource`,并在参数中注明文件名即可
* 需要时使用`${vakuename}`方式引用即可
* 注解方式引入properties文件不允许使用`*`通配符
* 多文件引入需使用数组格式

### 第三方bean管理

由于无法直接在第三方类上进行注解,故可在配置类中完成对第三方bean的管理

* 定义一个方法获得需要管理的对象,方法名为bean的名字即可,内容为加载配置生成一个需要的对象并返还即可
* 在方法前添加`@Bean`注解,可以通过参数起名

在Spring中,通常会为第三方配置定义专门的类进行书写,然后在主配置中添加`@import`注解,参数为类名数组

### 为第三方bean注入资源

#### 简单类型

* 在配置类中定义成员变量,使用`@Value`注解为其赋值,在方法中直接使用即可

#### 引用类型

直接在方法的形参列表中传入对应类型的bean即可,Spring会自动按类型注入对应的对象