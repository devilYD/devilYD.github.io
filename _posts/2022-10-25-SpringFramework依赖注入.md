---
layout:         post
title:          SpringFramework依赖注入
subtitle:       DI相关内容
date:           2022-10-25
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# SpringFramework依赖注入

* 思考：向一个类中传递数据的方式有几种？
  * 普通方法(set方法)
  * 构造方法
* 思考：依赖注入描述了在容器中建立bean与bean之间依赖关系的过程，如果bean运行需要的时数字或字符串呢？
  * 引用类型
  * 简单类型(基本数据类型与String)
* 依赖注入方式
  * setter注入
    * 简单类型
    * 引用类型
  * 构造器注入
    * 简单类型
    * 引用类型

## setter注入

### 引用类型

* 在bean中定义引用类型属性并提供可访问的set方法
* 在配置中使用`property`标签的`ref`属性注入引用类型对象

### 简单类型

* 在配置中使用`property`标签的`value`属性注入简单类型对象

## 构造器注入

通过调用构造方法进行注入，与setter注入不同的地方在于，不用写set方法，而是定义含参构造函数，另外使用`constructor`标签定义参数即可，`constructor`标签和`property`标签的属性雷同。

由于，构造器注入与代码耦合度过高，可以通过不定义`name`属性而是定义`type`属性来指定形参名称，另外可以通过`index`属性来指定形参的位置(从0开始)。

## 依赖注入方式选择

1. 强制使用构造器进行，使用setter注入有概率不进行注入导致null对象出现
2. 可选依赖使用setter注入进行，灵活性强
3. Spring框架提倡使用构造器，第三方框架内部大多数采用构造器注入的形式进行数据初始化，相对严谨
4. 如果有必要可以两者同时使用，使用构造器注入完成强制依赖的注入，使用setter注入完成可选依赖的注入
5. 实际开发过程中还需要根据实际情况分析，如果受控对象没有提供setter方法就必须使用构造器注入
6. 自己开发的模块推荐使用setter注入

## 依赖自动装配

* IoC容器根据bean所依赖的资源在容器中自动查找并注入到bean中的过程叫自动装配
* 自动装配的方式：在`bean`标签中配置`autowire`属性，其值与含义如下：
  * `byType`：按类型(常用)，要求类型匹配的时候必须是唯一的
  * `byName`：按名称，按照set方法名调用set方法
  * `constructor`：按构造方法
  * `no`：不启用自动装配
* 自动装配特征：
  * 自动装配用于引用类型依赖注入，不能对简单类型进行操作
  * 使用按类型装配时(byType)必须保证容器中相同类型的bean唯一，推荐使用
  * 使用按名称装配时(byName)必须保障容器中具有指定的bean，因变量名与配置耦合，不推荐使用
  * 自动装配优先级低于setter注入与构造器注入，同时出现时自动装配配置失效

## 集合注入

* 数组

```XML
<property name="数组名">
  <array>
    <value>0</value>
    <value>1</value>
  </array>
</property>
```

* List

```XML
<property name="List名">
  <list>
    <value>0</value>
    <value>1</value>
  </list>
</property>
```

* set

```XML
<property name="set名">
  <set>
    <value>0</value>
    <value>1</value>
  </set>
</property>
```

* map

```XML
<property name="set名">
  <map>
    <entry key="0" value="0"/>
    <entry key="1" value="1"/>
  </map>
</property>
```

* properties

```XML
<property name="properties名">
  <props>
    <prop key="0">0</prop>
    <prop key="1">1</prop>
  </props>
</property>
```

注意：若要存引用类型使用ref即可。

## 第三方数据源对象的管理

想要创建第三方提供的类的实例化对象，需要去阅读其源码，来决定使用什么方式注入依赖。

* 有set方法使用setter注入，有构造方法使用构造器注入。

## 加载properties文件

* 开启context命名空间

```XML
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation=
               "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
             http://www.springframework.org/schema/contexthttp://www.springframework.org/schema/context/spring-context.xsd">
</beans>
```

* 使用指定命名空间加载properties文件

```XML
<context:property-placeholder location="文件名.properties" />
```

* 使用`${key}`的方式读取加载的属性值

另外，若要加载多个可以通过在`location`属性中以`,`为分隔写多个文件，或者直接用`*.properties`加载所有的properties文件。

实际上，最标准的格式是`classpath*:*.properties`表示从所有类读取所有properties文件。

同时，可以将`system-properties-mode`属性设置为`NEVER`来避免加载系统属性。

## 创建容器

1. 加载类路径下的配置文件
  `ApplicationContext ctxt = new ClassPathXmlApplicationContext("applicationContext.xml");`
2. 加载文件系统下的配置文件
  `ApplicationContext ctxt = new FileSystemXmlApplicationContext("绝对路径");`

## 获取bean

`getBean()`方法直接返回的对象是object类型，需要额外进行一次bean的类型强转，但是可以通过`getBean()`方法的重载，即添加第二个参数来指定返回的对象类型来避免类型强转的操作。

另外若是同种类型定义的bean只有一个，也可以通过数据类型来获取bean，只要将`getBean()`方法的参数替换成`类名.class`即可，这种方式获取的bean不需要进行强类型转换。