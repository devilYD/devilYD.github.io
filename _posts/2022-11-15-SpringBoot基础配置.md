---
layout:         post
title:          SpringBoot基础配置
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

# SpringBoot基础配置

## 配置格式

这三种方式都使用时，以方式一为第一加载，方式二为第二加载，方式三为第三加载

### 方式一：在properties文件中修改

* 修改服务器端口
  * 直接在SpringBoot项目的resources目录下的application.properties文件中添加`server.port=80`即可

### 方式二：在yml文件中修改

* 修改服务器端口
  * 在SpringBoot项目的resources目录下创建application.yml文件，添加内容如下

```YAML
server:
    port: 80
```

.yml的书写格式如上，注意值的前面必须要用一个空格与冒号隔开

### 方式三：在yaml文件中修改

* 修改服务器端口
  * 与方式二相同，只是文件后缀不同

## yaml格式

* YAML (YAML Ain't Markup Language)，一种数据序列化格式
* 优点：
  * 容易阅读
  * 容易与脚本语言交互
  * 以数据为核心，重数据轻格式
* YAML文件扩展名
  * .yml (主流)
  * .yaml
* yaml语法规则
  * 大小写敏感
  * 属性层级关系使用多行描述，每行结尾使用冒号结束
  * 使用缩进表示层级关系，同层级左侧对其，只允许使用空格(不允许使用Tab键)
  * 属性值前添加空格(属性名与属性值之间使用冒号+空格作为分隔)
  * `# `表示注释
  * 数组数据在数据书写位置的下方使用减号`-`作为数据开始符号，每行书写一个数据，减号与数据间空格分隔

```YAML
enterprise:
    name: YD
    age: 22
    hobby:
        - reading
        - learn
```

类似如上。

## yaml数据读取方式

其中方式三若发生警告时，可在pom文件中添加如下依赖解除警告。

```XML
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
```

### 方式一

* 使用`@Value`读取单个数据，属性名引用方式为：`${一级属性名.二级属性名...}`
* 读取数组时在属性名后反大括号之前使用下标方式访问即可

### 方式二

* 封装全部数据到Environment对象然后使用自动装填访问
  * 直接在类中定义Environment类型对象添加`@Autowired`
  * 使用Environment对象的`getProperty()`方法取用数据即可

### 方式三

* 使用自定义对象封装指定数据
  * 自定义类添加同名属性
  * 添加注解`@Component`将其设置为bean
  * 添加注解`@ConfigurationProperties`，将属性`prefix`设置为需要封装的一级属性名
  * 在需要使用的地方使用自动装填取用数据即可

## 多环境开发配置

### yml文件配置方式

* 使用`---`将两个不同的环境配置隔开
* 在每个环境配置中使用`spring.profiles`定义环境名称
* 在最前方使用`spring.profiles.active`指定启用的环境

```YAML
# 指定启用的环境
spring:
  profiles:
    active: dev

---
# 开发环境
spring:
  profiles: dev
server:
  port: 80

---
# 生产环境
spring:
  profiles: pro
server:
  port: 81

---
# 测试环境
spring:
  profiles: test
server:
  port: 82
```

如上所示。

公用配置写在最上面的公用环境里即可。

上面这个配置方式为旧版配置方式，新版更加繁琐，如下：

```YAML
spring:
  config:
    activate:
      on-profile: dev
```

两种均可使用。

### 在properties文件中配置

* 在application.properties文件中指定启用的环境

```JAVA-PROPERTIES
spring.profiles.active=环境名
```

* 创建新的文件命名为application-环境名.properties
* 在新的文件中添加对应的环境配置即可

## 多环境命令行启动参数

`java -jar 包名.jar --spring.profiles.active=环境名称`

如上指令在包名所在目录下运行即可

另外后面的参数可以有多个，例如

`java -jar 包名.jar --spring.profiles.active=环境名称 --server.port=88`

另外命令行参数的优先级要高于内部参数，故可以直接覆盖配置

## 多环境开发控制

* Maven与SpringBoot多环境兼容问题
  1. Maven中设置多环境属性
  2. 在SpringBoot中引用Maven属性

## 配置文件分类

* SpringBoot中4级配置文件
  * 1级：file：config/application.yml [最高]
  * 2级：file：application.yml
  * 3级：classpath：config/application.yml
  * 4级：classpath：application.yml [最低]
* 作用：
  * 1级与2级留作系统打包后设置通用属性
  * 3级与4级用于系统开发阶段设置通用属性

注意，其中`classpath`代表类路径，也就是项目开发时在项目中的路径，而`file`表示文件系统下路径，也就是在运行jar包时与jar包同目录下的相对路径。