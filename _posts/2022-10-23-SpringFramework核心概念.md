---
layout:         post
title:          SpringFramework核心概念
subtitle:       IoC/DI、IoC容器、Bean
date:           2022-10-23
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# SpringFramework核心概念

程序的编写永远最求更低的耦合。

Spring的解决方案：
* 使用对象时，在程序中不要组东使用new产生对象，转换由外部提供对象

## IoC(Inversion of Control)控制反转 & DI(Dependency Injection)依赖注入

* 使用对象时，由主动new产生对象变为由外部提供对象，此过程中对象的创建权由程序转移到外部，此思想称为控制反转
* Spring技术对IoC思想进行了实现
  * Spring提供了一个容器，称为IoC容器，用来充当Ioc思想中的外部
  * IoC容器负责对象的创建、初始化等一系列工作，被创建或者被管理的对象在IoC容器中统称为Bean
* DI(Dependency Injection)依赖注入
  * 在容器中建立bean与bean之间的依赖关系的整个过程，称为依赖注入

* 目标：充分解耦
  * 使用IoC容器管理bean(IoC)
  * 在IoC容器中将由依赖关系的bean进行关系绑定
* 最终效果
  * 使用对象时不仅可以直接从IoC容器中获取，并且获取到的bean已经绑定了所有的依赖关系

## bean

* 由IoC容器管理的Bean

## IoC入门

1. 管理什么？(service和dao)
2. 如何将被管理的对象告知IoC容器？(配置)
3. 被管理的对象交给IoC容器，如何获取到IoC容器？(接口)
4. IoC容器得到后，如何从容器中获取bean？(接口方法)
5. 使用Spring导入哪些坐标？

```XML
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
```

然后创建配置文件applicationContext.xml，内容如下：
```XML
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--  对象定义  <bean id="对象名" class="类全路径"/>-->

</beans>
```

在使用时，创建ApplicationContext接口实例，并从中取需要用的对象即可：
```JAVA
ApplicationContext ctxt = new ClassPathXmlApplicationContext("applicationContext.xml");
ctxt.getBean("定义时的id");
```

注意，bean定义时id属性在同一上下文中不能重复

## DI入门

1. 基于IoC管理bean
2. Service中使用new形式创建的Dao对象是否保留？(否)
3. service中需要的Dao对象如何进入到Service中？(提供方法)
4. Service与Dao间的关系？

于是，将`<bean/>`标签改为闭合标签，在其中加入子标签`<property/>`，在其中设定对应的属性名和值，或者使用`ref`属性指定其他对象作为参数。

## 关于bean配置

* bean基础配置

格式：
```XML
<beans>
  <bean/>
  <bean></bean>
</beans>
```

属性：
id：bean的id，使用容器可以通过id值获取对应的bean，在一个容器中id的值唯一
class：bean的类型，即配置的bean的全路径类名

范例：
```XML
<beans>
  <bean id="user" class="org.YD.pojo.User"/>
  <bean id="user2" class="org.YD.pojo.User"></bean>
</beans>
```

* bean别名配置

可以为bean增添name属性并且以空格分隔写多个名称作为bean的别名配置。

* bean作用范围配置

Spring默认的bean是单例的，即获取的都是同一个对象，但是可以通过添加scope属性为prototype，使每次获取时都为不同的对象。

bean默认为单例是为了减轻容器的压力，适合交给容器进行管理的bean如下：
1. 表现层对象
2. 业务层对象
3. 数据层对象
4. 工具对象

不适合交给容器进行管理的bean：
1. 封装实体的域对象

## bean的实例化

1. 通过构造函数

bean本质上就是对象，创建bean使用构造方法完成，且默认调用的是无参构造函数

若类中没有只有含参构造函数而无参构造函数，Spring会报错。

2. 通过静态工厂

可以通过调用静态工厂的方法获取对象，配置时，`class`属性填写静态工厂类名，额外添加`factory-method`属性配置获取对象的方法即可。

这种方式一般是为了兼容早期的遗留系统所使用的。

3. 通过实例工厂

由于实例工厂在使用前需要先实例化工厂对象，然后通过工厂对象的方法创造对象，故需要先在配置中创建实例化的工厂对象，然后在需要的对象bean中，不使用class而是factory-bean属性指定实例化的工厂对象，然后用factory-method指定创造对象的方法。

同时，Spring提供了统一的实例工厂接口`FactoryBean<>`，实现接口后就不需要创建工厂对象的实例化而是直接用class属性指定实现的接口，Spring会自动调用接口中统一的方法生成对象。

另外，使用工厂生产的对象默认是单例的，而接口中的isSingleton方法可以用来指定是否为单例，false为非单例，true为单例。

## bean的生命周期

* 生命周期：从创建到销毁的整体过程

在Spring中可通过`init-method`属性设置对象初始化的方法，通过`destory-method`属性设置对象销毁时执行的方法，另外可以在类中实现InitializingBean接口和DisposableBean接口来让Spring自动在初始化和销毁对象时调用相应的方法。

* 初始化容器
  1. 创建对象
  2. 执行构造方法
  3. 执行属性注入(set操作)
  4. 执行bean初始化方法
* 使用bean
  1. 执行业务操作
* 关闭/销毁容器
  1. 执行bean销毁方法

* 容器关闭前才会触发bean的销毁操作
* 关闭容器方式：
  * 手工关闭容器，使用`ConfigurableApplicationContext`接口的`close()`方法
  * 注册关闭钩子，使用`ConfigurableApplicationContext`接口的`registerShutdownHook()`方法