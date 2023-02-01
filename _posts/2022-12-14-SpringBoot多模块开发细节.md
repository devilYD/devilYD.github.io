---
layout:         post
title:          SpringBoot多模块开发细节
subtitle:       实践总结
date:           2022-12-14
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - 笔记

---

# SpringBoot多模块开发细节

## 基础流程

1. 使用Spring Initializr创建一个父项目
2. 在父项目下创建子模块
3. 修改父模块的pom文件，具体如下：
   1. 修改父模块的打包方式为pom `<packaging>pom</packaging>`
   2. 在`<modules>`标签下使用其子标签`<module>`添加子模块到父项目
   3. 在`<properties>`标签下通过将版本号定义为变量进行依赖版本的统一管理
   4. 在`<dependencies>`中添加子项目中需要用到的依赖
   5. 删去`<build>`标签以及该标签下内容
4. 修改子模块的pom文件，具体如下：
   1. 将`<parent>`标签下的springboot父项目替换为自己创建的父项目
   2. 添加此模块需要的其他依赖，包括对其他子模块的依赖
   3. 若此模块为控制层模块，则保留`<build>`标签下内容并配置打包细节
   4. 若此模块不是控制层模块，则删去`<build>`标签以及该标签下内容
5. 将除控制层子模块以外的其他子模块的主入口类全部删除

* 关于pom文件的修改细节，如下是一个简单的示例：
  创建一个父项目parent和两个子项目core和controller

* 父项目parent的pom文件修改如下
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.1</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>org.yd</groupId>
    <artifactId>parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>parent</name>
    <description>Demo project for Spring Boot</description>
    <!--修改父项目的打包方式为pom-->
    <packaging>pom</packaging>
    <!--添加子模块到父项目-->
    <modules>
        <module>controller</module>
        <module>core</module>
    </modules>
    <!--依赖版本统一管理-->
    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <!--父项目这里的依赖可以用到子项目的 通用的-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

* 子模块core的pom文件修改如下
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <artifactId>core</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>core</name>
    <description>Demo project for Spring Boot</description>
    <!--引入父项目 替换掉之前的springboot父项目（spring-boot-starter-parent）-->
    <parent>
        <artifactId>parent</artifactId>
        <groupId>org.yd</groupId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <!-- <parent>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-parent</artifactId>
         <version>2.4.1</version>
         <relativePath/> &lt;!&ndash; lookup parent from repository &ndash;&gt;
     </parent>-->

    <dependencies>
        <!--引入该模块需要的依赖-->
    </dependencies>

</project>
```

* 子模块controller的pom文件修改如下
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <artifactId>controller</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>controller</name>
    <description>Demo project for Spring Boot</description>
    <!--引入父项目 替换掉之前的springboot父项目（spring-boot-starter-parent）-->
    <parent>
        <artifactId>parent</artifactId>
        <groupId>org.yd</groupId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
   <!-- <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.1</version>
        <relativePath/> &lt;!&ndash; lookup parent from repository &ndash;&gt;
    </parent>-->

    <dependencies>
        <!--引入core模块-->
        <dependency>
            <groupId>org.yd</groupId>
            <artifactId>core</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>org.yd.controller.ControllerApplication</mainClass>
                    <layout>JAR</layout>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

## 关于配置文件

* SpringBoot多模块项目在运行时通常会出现模块之间的配置文件相互覆盖(模块本身的配置文件不为空则会将自己前一个依赖项的同名配置文件覆盖掉)，故通常可将所有的配置全部写在控制层模块里
* SpringBoot多模块开发时若需要各个模块分别进行配置(只配置本模块的内容)，则有如下三种解决方案,其中第一种局限性过强，第二种则会导致多环境配置时可读性降低，故更推荐第三种解决方案：

### 在本模块中直接引用

* 使用`@PropertySource`注解可以直接在代码中引用本模块配置文件内容，配置文件需使用自定义命名，且不与SpringBoot默认配置文件命名冲突，此方法使用配置文件默认只支持`.properties`格式的文件，若要使用`.yml`格式则需要自定义`@PropertySource`注解所使用的`PropertySourceFactory`资源工厂属性，可使用第三方提供的yml解析，也可自己实现

第三方提供的工具如下：

```XML
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
    <version>1.23</version>
</dependency>
```

将工具中的`YamlPropertiesFactoryBean`封装成`@PropertySource`注解可调用的接口实现：

```JAVA
/**
 * @author YD
 * @decription 自定义Yaml解析工厂
 */

public class YAMLPropertySourceFactory implements PropertySourceFactory {
    @Override
    public org.springframework.core.env.PropertySource<?> createPropertySource(String name, EncodedResource encodedResource) throws IOException {
        //创建一个YAML解析工厂。
        YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
        //设置资源。
        factory.setResources(encodedResource.getResource());

        //获取解析后的Properties对象
        Properties properties = factory.getObject();
        //返回。此时不能像默认工厂那样返回ResourcePropertySource对象 ，要返回他的父类PropertiesPropertySource对象。
        return name != null ? new PropertiesPropertySource(name, properties) :
                new PropertiesPropertySource(encodedResource.getResource().getFilename(),properties);
    }
}
```

也可以完全自己实现：

```JAVA
/**
 * @author YD
 * @decription 自定义Yaml解析工厂
 */

public class YmlConfigFactory implements PropertySourceFactory {
    @Override
    public PropertySource<?> createPropertySource(@Nullable String name, EncodedResource encodedResource) throws IOException {
        String resourceName = Optional.ofNullable(name).orElse(encodedResource.getResource().getFilename());
        if (resourceName.endsWith(".yml") || resourceName.endsWith(".yaml")) {//yaml资源文件
            List<PropertySource<?>> yamlSources = new YamlPropertySourceLoader().load(resourceName, encodedResource.getResource());
            return yamlSources.get(0);
        } else {//返回空的Properties
            return new PropertiesPropertySource(resourceName, new Properties());
        }
    }
}
```

* 然后在配置类中使用`@PropertySource`注解指定自定义解析工厂类以及配置文件，并通过SPEL表达式注入属性即可

```JAVA
@Configuration
@PropertySource(value = "classpath:JDBCconfig.yaml",factory = YmlPropertySourceFactory.class)
public class SpringConfig {

    @Value("${druid.driverClassName}")
    private String driverClassName;

}
```

### 通过将其他模块的配置文件视为另一个环境引入

* SpringBoot支持多环境开发，只需要将配置文件命名为`application-{%环境名}`即可视为另一个配置环境，使用时只需要在主配置文件中使用`spring.profiles.active`属性指定需要启用的环境即可
* 同理，在多模块开发时可以将其他模块的配置文件视为另一个环境配置文件，在主模块中将这些环境配置文件设置为启用即可

### 实现EnvironmentPostProcessor接口来将环境配置在Spring启动前注入

* 根据SpringBoot文档描述，可以实现`EnvironmentPostProcessor`接口来将环境配置在Spring启动前注入

文档中示例代码如下：

```JAVA
public class MyEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private final YamlPropertySourceLoader loader = new YamlPropertySourceLoader();

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Resource path = new ClassPathResource("com/example/myapp/config.yml");
        PropertySource<?> propertySource = loadYaml(path);
        environment.getPropertySources().addLast(propertySource);
    }

    private PropertySource<?> loadYaml(Resource path) {
        Assert.isTrue(path.exists(), () -> "Resource " + path + " does not exist");
        try {
            return this.loader.load("custom-resource", path).get(0);
        }
        catch (IOException ex) {
            throw new IllegalStateException("Failed to load yaml configuration from " + path, ex);
        }
    }
}
```

* 根据文档和实例代码，可以实现自己的子模块配置文件载入
* 预定载入规则
  * 配置文件放置于resources/config目录下，文件格式为.yml，文件数量不限
  * 可以使用application-xxx.yml格式，这样IDEA可以对Spring相关配置项进行提示，其中xxx不要起可能出现在spring.profiles.active中的名字
* 下面的代码按照`classpath*:config/*.yml`读取所有符合条件的资源文件，使用`yaml loader`将其解析为`PropertySource`，调用`environment.getPropertySources().addLast()`注入

```JAVA
public class CommonConfigEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private static final Logger log = LoggerFactory.getLogger(CommonConfigEnvironmentPostProcessor.class);

    private final YamlPropertySourceLoader loader = new YamlPropertySourceLoader();

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {

        try {
            Resource[] resources = new PathMatchingResourcePatternResolver()
                    .getResources(ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + "config/*.yml");
            for (Resource resource : resources) {
                List<PropertySource<?>> configs = loader.load(resource.getFilename(), resource);
                if (configs != null && !configs.isEmpty()) {
                    environment.getPropertySources().addLast(configs.get(0));
                }
            }
        } catch (IOException e) {
            log.error("Load module config fail", e);
            throw new RuntimeException(e);
        }
    }
}
```

* 另外，在`resources/META-INF/spring.factories`文件中，添加如下语句:

```
org.springframework.boot.env.EnvironmentPostProcessor=\
    {%你自定义实现的EnvironmentPostProcessor接口的完整类路径}
```

* 这样，引用了这个jar包的SpringBoot应用会自动按前面定义的规则加载配置文件

