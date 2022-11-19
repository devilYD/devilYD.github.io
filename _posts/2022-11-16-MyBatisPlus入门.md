---
layout:         post
title:          MyBatisPlus入门
subtitle:       Web相关
date:           2022-11-16
auther:         YD
header-img:     img/YD-Spring.jpg
catalog:            true
tags:
        - JAVA
        - Spring
        - 笔记

---

# MyBatisPlus入门

* MyBatisPlus (简称MP)是基于MyBatis基础框架上开发的增强型工具，旨在简化开发、提高效率

## 简单启动

1. 引入依赖项

创建项目勾选MySQL驱动依赖，并在pom文件中添加如下代码：

```XML
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.2</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.14</version>
        </dependency>
```

其中`mybatis-plus-boot-starter`和`druid`分别用作框架整合以及数据库连接池。

2. 添加数据库配置

创建application.yml文件，添加配置信息

```YAML
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
    url: jdbc:mysql://localhost:3306/数据库名?autoReconnect=true&useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8&useSSL=false
    username: 用户名
    password: 密码
```

3. 根据数据库编写实体类

4. 编写对应的Mapper文件

创建对应的接口，添加`@Mapper`注解，实现BaseMapper接口并把实体类作为泛型传进去即可。

## MyBatisPlus概述

* MyBatisPlus (简称MP) 是基于MyBatis基础框架上开发的增强型工具，旨在简化开发、提高效率
* <a href="https://baomidou.com/">官网</a>
* MP特性：
  * 无侵入：只做增强不做改变，不会对现有工程产生影响
  * 强大的CRUD操作：内置通用Mapper，少量配置即可实现单表CRUD操作
  * 支持Lambda：编写查询条件无需担心字段写错
  * 支持主键自动生成
  * 内置分页插件
  * ...

## 标准CRUD开发

标准数据层CRUD功能：
|功能|自定义接口|MP接口|
|----|---------|------|
|新增|`boolean save(T t)`|`int insert(T t)`|
|删除|`boolean delete(int id)`|`int deleteById(Serializable id)`|
|修改|`boolean update(T t)`|`int updateById(T t)`|
|根据id查询|`T getById(int id)`|`T selectById(Serializable id)`|
|查询全部|`List<T> getAll()`|`List<T> selectList()`|
|分页查询|`PageInfo<T> getAll(int page,int size)`|`IPage<T> selectPage(IPage<T> page)`|
|按条件查询|`List<T> getAll(Condition condition)`|`IPage<T> selectPage(Wrapper<T> queryWrapper)`|

另外可以通过`lombok`工具来简化实体类的开发

```xml
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        <!-- SpringBoot父项目中有指定对应的依赖版本故不需要指定版本 -->
        </dependency>
```

在实体类前添加`@Setter`就会在编译时自动生成setter方法，同理还有`@Getter`以及一次全部满足的`@Data`

### 标准分页功能制作

首先来讲解MP提供的分页查询接口本身：`IPage<T> selectPage(IPage<T> page)`

其中`IPage`是Mp本身提供的接口，它有一个实现类`Page`，`Page`的构造方法需要提供两个参数，分别是`current`码值和`size`每页的数据数量

Page中有提供如下get方法：

|方法|作用|
|---|---|
|`getCurrent()`|获取当前页码值|
|`getSize()`|获取每页显示输|
|`getPages()`|获取总页数|
|`getTotal()`|获取总数据数|
|`getRecords()`|获取数据|

为了让分页查询能够正常使用，需要配置分页查询的拦截器。

在config包下创建MyBatisPlus的配置类，在其中配置拦截器：

```JAVA
@Configuration
public class MyBatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mpInterceptor() {
//      1.定义mp拦截器
        MybatisPlusInterceptor mpInterceptor = new MybatisPlusInterceptor();
//      2.添加具体的拦截器
        mpInterceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return mpInterceptor;
    }
}
```

另外，可以在application.yml文件中开启日志查看预编译的sql语句

```YAML
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

### 查询

* MyBatisPlus将书写复杂的SQL查询条件进行了封装，使用编程的形式完成查询条件的组合
* 用于封装条件的对象为`Wrapper`抽象条件构造类，其继承关系如下

```
Wrapper  条件构造抽象类
    -- AbstractWrapper 查询条件封装，用于生成 sql 中的 where 语句。
        -- QueryWrapper Entity 对象封装操作类，用于查询。
        -- UpdateWrapper Update 条件封装操作类，用于更新。
        -- AbstractLambdaWrapper 使用 Lambda 表达式封装 wrapper
            -- LambdaQueryWrapper 使用 Lambda 语法封装条件，用于查询。
            -- LambdaUpdateWrapper 使用 Lambda 语法封装条件，用于更新。
```

* 此时由于我们要使用查询，故使用`QueryWarpper`即可，在其中调用方法设置条件，具体如下：

```JAVA
// 比较条件
eq(R column, Object val); // 等价于 =，例: eq("name", "老王") ---> name = '老王'
ne(R column, Object val); // 等价于 <>，例: ne("name", "老王") ---> name <> '老王'
gt(R column, Object val); // 等价于 >，例: gt("name", "老王") ---> name > '老王'
ge(R column, Object val); // 等价于 >=，例: ge("name", "老王") ---> name >= '老王'
lt(R column, Object val); // 等价于 <，例: lt("name", "老王") ---> name < '老王'
le(R column, Object val); // 等价于 <=，例: le("name", "老王") ---> name <= '老王'

// 范围查询
between(R column, Object val1, Object val2); // 等价于 between a and b, 例： between("age", 18, 30) ---> age between 18 and 30
notBetween(R column, Object val1, Object val2); // 等价于 not between a and b, 例： notBetween("age", 18, 30) ---> age not between 18 and 30
in(R column, Object... values); // 等价于 字段 IN (v0, v1, ...),例: in("age",{1,2,3}) ---> age in (1,2,3)
notIn(R column, Object... values); // 等价于 字段 NOT IN (v0, v1, ...), 例: notIn("age",{1,2,3}) ---> age not in (1,2,3)
inSql(R column, Object... values); // 等价于 字段 IN (sql 语句), 例: inSql("id", "select id from table where id < 3") ---> id in (select id from table where id < 3)
notInSql(R column, Object... values); // 等价于 字段 NOT IN (sql 语句)

// 模糊匹配
like(R column, Object val); // 等价于 LIKE '%值%'，例: like("name", "王") ---> name like '%王%'
notLike(R column, Object val); // 等价于 NOT LIKE '%值%'，例: notLike("name", "王") ---> name not like '%王%'
likeLeft(R column, Object val); // 等价于 LIKE '%值'，例: likeLeft("name", "王") ---> name like '%王'
likeRight(R column, Object val); // 等价于 LIKE '值%'，例: likeRight("name", "王") ---> name like '王%'

// 空值比较
isNull(R column); // 等价于 IS NULL，例: isNull("name") ---> name is null
isNotNull(R column); // 等价于 IS NOT NULL，例: isNotNull("name") ---> name is not null

//分组,排序
groupBy(R... columns); // 等价于 GROUP BY 字段, ...， 例: groupBy("id", "name") ---> group by id,name
orderByAsc(R... columns); // 等价于 ORDER BY 字段, ... ASC， 例: orderByAsc("id", "name") ---> order by id ASC,name ASC
orderByDesc(R... columns); // 等价于 ORDER BY 字段, ... DESC， 例: orderByDesc("id", "name") ---> order by id DESC,name DESC
having(String sqlHaving, Object... params); // 等价于 HAVING ( sql语句 )， 例: having("sum(age) > {0}", 11) ---> having sum(age) > 11

// 拼接,嵌套SQL
or(); // 等价于 a or b， 例：eq("id",1).or().eq("name","老王") ---> id = 1 or name = '老王'
or(Consumer<Param> consumer); // 等价于 or(a or/and b)，or 嵌套。例: or(i -> i.eq("name", "李白").ne("status", "活着")) ---> or (name = '李白' and status <> '活着')
and(Consumer<Param> consumer); // 等价于 and(a or/and b)，and 嵌套。例: and(i -> i.eq("name", "李白").ne("status", "活着")) ---> and (name = '李白' and status <> '活着')
nested(Consumer<Param> consumer); // 等价于 (a or/and b)，普通嵌套。例: nested(i -> i.eq("name", "李白").ne("status", "活着")) ---> (name = '李白' and status <> '活着')
apply(String applySql, Object... params); // 拼接sql（若不使用 params 参数，可能存在 sql 注入），例: apply("date_format(dateColumn,'%Y-%m-%d') = {0}", "2008-08-08") ---> date_format(dateColumn,'%Y-%m-%d') = '2008-08-08'")
last(String lastSql); // 无视优化规则直接拼接到 sql 的最后，可能存在 sql 注入。
exists(String existsSql); // 拼接 exists 语句。例: exists("select id from table where age = 1") ---> exists (select id from table where age = 1)

// QueryWrapper 条件
select(String... sqlSelect); // 用于定义需要返回的字段。例： select("id", "name", "age") ---> select id, name, age
select(Predicate<TableFieldInfo> predicate); // Lambda 表达式，过滤需要的字段。
lambda(); // 返回一个 LambdaQueryWrapper
```

查询的三种格式:

1. 方式一:

```JAVA
QueryWrapper wp = new QueryWrapper();
wp.eq("username","admin");
wp.eq("password","123456");
System.out.println(userDao.selectList(wp));
```

直接初始化`QueryWrapper`对象并往里面添加条件

2. 方式二

```JAVA
QueryWrapper<User> wp = new QueryWrapper<>();
wp.lambda().eq(User::getUsername,"admin");
wp.lambda().eq(User::getPassword,"123456");
System.out.println(userDao.selectList(wp));
```

使用实体类作为泛型初始化`QueryWrapper`对象,并在添加条件时使用Lambda表达式来指代对应的属性名(列名)

3. 方式三

```JAVA
LambdaQueryWrapper<User> wp = new LambdaQueryWrapper<>();
wp.eq(User::getUsername,"admin");
wp.eq(User::getPassword,"123456");
System.out.println(userDao.selectList(wp));
```

直接使用`LambdaQueryWrapper`对象进行操作

另外,可以使用链式编程进行条件封装(我觉得看着好累,太过复杂的不推荐)

`wp.eq(User::getUsername,"admin").eq(User::getPassword,"123456")`

#### 条件查询-null值处理

* 方式一: 使用if条件判断语句进行处理
* 方式二: 使用条件控制参数进行控制

```JAVA
LambdaQueryWrapper<User> wp = new LambdaQueryWrapper<>();
String userName;

// 方式一
if (userName != null) {
  wp.eq(User::getUsername,userName);
}

// 方式二
wp.eq(userName != null,User::getUsername,userName);
```

#### 查询投影

使用`select()`方法进行设置:

```JAVA
LambdaQueryWrapper<User> wp = new LambdaQueryWrapper<>();
wp.select(User::getId);
System.out.println(userDao.selectList(wp));
```

这样设置后就会只返回id列的数据了

同时也可以使用SQL聚合函数进行查询,如下:

```JAVA
QueryWrapper<User> wp = new QueryWrapper<>();
wp.select("count(*) as count");
System.out.println(userDao.selectMaps(wp));
```

注意:使用聚合函数只能使用`QueryWrapper`对象格式进行查询,因为`LambdaQueryWrapper`对象不支持传参字符串

另外,关于`selectMaps()`方法,它的返回值是`List<Map<String,Object>>`的形式

### 字段映射与表名映射

* 名称: `@TableField`
* 类型: 属性注解
* 位置: 模型类属性定义上方
* 作用: 设置当前属性对应的数据库表中字段关系
* 相关属性:
  * `value`: 设置数据库表字段名称
  * `exist`: 设置属性在数据库表字段中是否存在,默认为`true`,此属性无法与`value`合并使用
  * `select`: 设置属性是否参与查询,此属性与`select()`映射配置不冲突
* 范例:

```JAVA
@Mapper
public class User {
  @TableField(value = "password",select = false)
  private String psw;
  @TableField(exist = false)
  private Boolean onLine;
}
```

* 名称: `@TableName`
* 类型: 类注解
* 位置: 模型类定义上方
* 作用: 设置当前类对应与数据库表关系
* 相关属性:
  * value:设置数据库表名称
* 范例:

```JAVA
@TableName(value = "t_user")
public class User {}
```

另外，可以在application.yml文件中配置统一的表名前缀：

```YAML
mybatis-plus:
  global-config:
    db-config:
      table_prefix: tb1_
```

如上就是配置共有前缀`tb1_`

### 增加

#### id生成策略

* 不同的表应用不同发id生成策略
  * 日志：自增(1,2,3,4,...)
  * 购物订单：特殊规则(FQ23948AK3843)
  * 外卖单：关联地区日期等信息(10 04 20200314 34 91)
  * 关系表：可省略id

* 名称：`@TableId`
* 类型：属性注解
* 位置：模型中用于主键属性定义上方
* 作用：设置当前类中主键属性的生成策略
* 相关属性：
  * value：设置数据库主键名称
  * type：设置主键属性的生成策略，值参照IdType枚举值
* 范例：

```JAVA
public class User {
  @TableId(type = IdType.AUTO)
  private long id;
}
```

另外可以在application.yml中配置全局id生成策略：

```YAML
mybatis-plus:
  global-config:
    db-config:
      id-type: auto
```

以下为id生成器策略名以及其规则：

|策略名称|规则|
|-------|-------|
|AUTO(0)|使用数据库id自增策略控制id生成|
|NONE(1)|不设置id生成策略|
|INPUT(2)|用户手工输入id(可兼容数值型与字符串类型)|
|ASSIGN_ID(3)|雪花算法生成id(可兼容数值型与字符串类型)|
|ASSIGN_UUID(4)|以UUID生成算法作为id生成策略|

其中，雪花算法的概念为：雪花算法是一种生成分布式全局唯一ID的算法，它根据时间戳、机器码、序列号生成一个64位的二进制码。

最高位表示符号位，其中0代表整数，1代表负数，而id一般都是正数，所以最高位为0。

41位存储毫秒级时间戳，这个时间截不是存储当前时间的时间截，而是存储时间截的差值（当前时间截 - 开始时间截) * 得到的值），这里的的开始时间截，一般是我们的ID生成器开始使用的时间，一般为项目创建时间，生成器根据时间戳插值进行初次尝试创建ID。

10位存储机器码，最多支持1024台机器，当并发量非常高，同时有多个请求在同一毫秒到达，可以根据机器码进行第二次生成。机器码可以根据实际需求进行二次划分，比如两个机房操作可以一个机房分配5位机器码。

12位存储序列号，当同一毫秒有多个请求访问到了同一台机器后，此时序列号就派上了用场，为这些请求进行第三次创建，最多每毫秒每台机器产生2的12次方也就是4096个id，满足了大部分场景的需求。

* 总的来说雪花算法有以下几个优点：
  * 能满足高并发分布式系统环境下ID不重复
  * 基于时间戳，可以保证基本有序递增
  * 不依赖第三方的库或者中间件
  * 生成效率极高

### 删除

#### 多记录操作

* 按照主键删除多条记录

```JAVA
List<Long> ids = Arrays.asList(new Long[]{2,3});
userDao.deleteBatchIds(ids);
```

* 根据主键查询多条记录

```JAVA
List<Long> ids = Arrays.asList(new Long[]{2,3});
List<User> userList = userDao.selectBatchIds(ids);
```

#### 逻辑删除

* 删除操作业务问题：业务数据从数据库中丢弃
* 逻辑删除：为数据设置是否可用状态字段，删除时设置状态字段为不可用状态，数据保留在数据库中

如何操作：
1. 在数据库表中添加列`deleted`，类型int，长度1，设置默认值为0
2. 在实体类中添加`deleted`属性，添加`@TableLogic`注解，设置属性`value`为`"0"`，`delval`为`"1"`
3. 直接执行删除操作即可

另外可以在通用配置中配置统一的设置以避免不同表中标志位的定义不同，即将`@TableLogic`注解改为在application.yml中的代码：

```YAML
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
```

### 修改操作以及乐观锁

* 业务并发现象带来的问题：多方同时对同一个资源进行修改操作
* 乐观锁：乐观锁在操作数据时非常乐观，认为别人不会同时修改数据。. 因此乐观锁不会上锁，只是在执行更新的时候判断一下在此期间别人是否修改了数据：如果别人修改了数据则放弃操作，否则执行操作

设置乐观锁的方法：
1. 在数据库表中添加列`version`，类型int，长度11，设置默认值为1
2. 在实体类中添加属性`version`，添加`@Version`注解
3. 设置拦截器
4. 修改前需要先查询对应数据的`version`值，然后在修改时将这个`version`传入即可。

```JAVA
@Configuration
public class MyBatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mpInterceptor() {
//      1.定义mp拦截器
        MybatisPlusInterceptor mpInterceptor = new MybatisPlusInterceptor();
//      2.添加乐观锁拦截器
        mpInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mpInterceptor;
    }
}
```

## 快速开发-代码生成器

* 模板：MyBatisPlus提供
* 数据库相关配置：读取数据库获取信息
* 开发者自定义配置：手工配置

使用方法：
1. 导入依赖：

```XML
        <!-- MP代码生成器 -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.4.1</version>
        </dependency>

        <!-- 模板引擎 -->
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.3</version>
        </dependency>
```

2. 创建代码生成器

```JAVA
// 演示例子，执行 main 方法控制台输入模块表名回车自动生成对应项目目录中
public class CodeGenerator {

    /**
     * <p>
     * 读取控制台内容
     * </p>
     */
    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入" + tip + "：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotBlank(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }

    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("jobob");
        gc.setOpen(false);
        // gc.setSwagger2(true); 实体属性 Swagger2 注解
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
        // dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("密码");
        mpg.setDataSource(dsc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("模块名"));
        pc.setParent("com.baomidou.ant");
        mpg.setPackageInfo(pc);

        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };

        // 如果模板引擎是 freemarker
        String templatePath = "/templates/mapper.xml.ftl";
        // 如果模板引擎是 velocity
        // String templatePath = "/templates/mapper.xml.vm";

        // 自定义输出配置
        List<FileOutConfig> focList = new ArrayList<>();
        // 自定义配置会被优先输出
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        /*
        cfg.setFileCreate(new IFileCreate() {
            @Override
            public boolean isCreate(ConfigBuilder configBuilder, FileType fileType, String filePath) {
                // 判断自定义文件夹是否需要创建
                checkDir("调用默认方法创建的目录，自定义目录用");
                if (fileType == FileType.MAPPER) {
                    // 已经生成 mapper 文件判断存在，不想重新生成返回 false
                    return !new File(filePath).exists();
                }
                // 允许生成模板文件
                return true;
            }
        });
        */
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // 配置模板
        TemplateConfig templateConfig = new TemplateConfig();

        // 配置自定义输出模板
        //指定自定义模板路径，注意不要带上.ftl/.vm, 会根据使用的模板引擎自动识别
        // templateConfig.setEntity("templates/entity2.java");
        // templateConfig.setService();
        // templateConfig.setController();

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("你自己的父类实体,没有就不用设置!");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // 公共父类
        strategy.setSuperControllerClass("你自己的父类控制器,没有就不用设置!");
        // 写于父类中的公共字段
        strategy.setSuperEntityColumns("id");
        strategy.setInclude(scanner("表名，多个英文逗号分割").split(","));
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}
```

配置好运行即可。