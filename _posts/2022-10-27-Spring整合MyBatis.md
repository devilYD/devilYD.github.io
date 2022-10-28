---
layout:         post
title:          Spring整合MyBatis
subtitle:       数据库框架
date:           2022-10-27
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# Spring整合MyBatis

## 步骤

* 引入依赖

```XML
    <!-- Spring框架 -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>

    <!-- MyBatis提供的用于对接Spring框架的jar包 -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>2.0.5</version>
    </dependency>

    <!-- druid连接池 -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.1.0</version>
    </dependency>

    <!-- MyBatis -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.6</version>
    </dependency>

    <!-- MySQL驱动 -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.17</version>
    </dependency>
```

* 配置Druid连接池

首先创建druid.properties文件，内容如下：

```
# 驱动配置，可根据url自动识别，可有可无
jdbc.driverClassName=com.mysql.cj.jdbc.Driver
# 连接数据库url
jdbc.url=jdbc:mysql://localhost:3306/${数据库名}?autoReconnect=true&useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8&useSSL=false
# 用户名
jdbc.username=
# 密码
jdbc.password=
# 初始化连接数量
jdbc.initialSize=5
# 最大连接数量
jdbc.maxActive=10
# 最长等待时间
jdbc.maxWait=3000
```

然后创建druid配置类config.DruidConfig.java

```JAVA
import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

public class DruidConfig {
    @Value("${jdbc.driverClassName}")
    private String driverClassName;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Value("${jdbc.initialSize}")
    private int initialsize;

    @Value("${jdbc.maxActive}")
    private int maxactive;

    @Value("${jdbc.maxWait}")
    private int maxwait;

    @Bean
    public DataSource dataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driverClassName);
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setInitialSize(initialsize);
        ds.setMaxActive(maxactive);
        ds.setMaxWait(maxwait);

        return ds;
    }
}
```

这样就配置好druid连接池了

* 配置MyBatis

创建config.MyBatisConfig.java

```JAVA
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

public class MyBatisConfig {

    @Bean
    public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource) {
        SqlSessionFactoryBean ssfb = new SqlSessionFactoryBean();
        ssfb.setDataSource(dataSource);
        ssfb.setTypeAliasesPackage("org.YD");

        return ssfb;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {//将mapper接口文件都自动注入到IoC容器中，实现类Bean的名称默认为接口类名的首字母小写
        MapperScannerConfigurer msc = new MapperScannerConfigurer();
        msc.setBasePackage("org.YD.mapper");

        return msc;
    }
}
```

* 配置Spring配置类

创建config.SpringConfig.java

```JAVA
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("org.YD")
@PropertySource("classpath:druid.properties")
@Import({DruidConfig.class,MyBatisConfig.class})
public class SpringConfig {
}
```

加载配置文件和配置类即可