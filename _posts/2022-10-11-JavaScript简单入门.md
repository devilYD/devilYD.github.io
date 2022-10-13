---
layout:         post
title:          2022-10-11-JavaScript简单入门
subtitle:       如何使网页活过来
date:           2022-10-11
auther:         YD
header-img:     img/YD-rainingnight.jpg
catalog:            true
tags:
        - JAVA
        - 笔记

---

# JavaScript简单入门

## 什么是JavaScript

JavaScript 是 web 开发人员必须学习的 3 门语言中的一门：

* HTML定义了网页的内容
* CSS定义了网页的布局
* JavaScript控制网页的行为

## JavaScript的引入方式

1. 内部脚本

将js代码直接定义到HTML页面中，通过 script 标签。

```HTML
<script>
    alart("hello JS!");
</script>
```

* 在HTML文档中可以在任意地方放置任意数量的 scrpt 标签
* 一般把脚本置于 body 元素的底部，可以改善显示速度，因为脚本执行会拖慢显示。

2. 外部脚本

将js代码定义到外部js文件中，然后引入HTML页面中

```HTML
<script src="js文件路径"></script>
```

* 外部脚本不能包含 script 标签
* script 标签不能自闭合

## 基础语法

### 书写语法

* 区分大小写：JavaScript对大小写敏感
* 每行结尾的分号可有可无
* 注释：与java雷同
* 大括号表示代码块

### 输出语句

* 使用window.alert()写入警告框
* 使用document.write()写入HTML输出
* 使用console.log()写入浏览器控制台

```JavaScript
window.alert("hello js!");
document.write("hello js!");
console.log("hello js!");
```

### 变量

JavaScript是一门弱类型语言，变量的声明使用 var 关键字

```JavaScript
var test = 20;
test = "张三";
```

* 变量名需要遵守以下规则：
  * 组成字符可以是任何字母、数字、下划线或者美元符号
  * 数字不能开头
  * 建议使用驼峰命名
* ECMAScript 6 新增了 let 关键字来定义变量，它的用法类似 var ，但是所声明的变量只在 let 关键字所在的代码块内有效，且不能重复声明
* ECMAScript 6 新增了 const 关键字，用来声明一个只读的常量。一旦声明，常量的值就不能改变。

关于var关键字的细节：
* 作用域：全局变量，即使是在代码块内定义的变量也能在其他地方使用
* 变量可以被重复定义

而反之let在代码块中定义的变量在代码块外就不能使用，而且不能被重复定义。

JavaScript中数据类型被分为两类：原始类型和引用类型

5种原始类型如下：
* number：数字，包含整型、浮点型、以及NaN(Not a Number)
* string：字符、字符串、单引号双引号均可
* boolean：布尔类型，只有true和false
* null：空
* undefined：当变量未初始化时的默认类型

使用typeof运算符可以获取数据类型。

```JavaScript
alert(typeof age);
```

注意null类型使用typeof的返回值为object，这是因为null现在被视为object变量的占位符。

### 运算符

* 一元运算符：++、--
* 算数运算符：+、-、*、/、%
* 赋值运算符：=、+=、-=...
* 关系运算符：>、<、>=、<=、!=、==、===...
* 逻辑运算符：&&、||、!
* 三元运算符：条件表达式?true_value:false_value

注意：关系运算符在执行比较前会先进行一次类型转换，转换后再比较两者的值

```JavaScript
//比如这里的这个比较的返回值就为true
alert(20 == '20')
```

如不希望先进行类型转换则须使用全等于符号 ===

关于类型转换：
* 其他类型转number
  1. string：按照字符串的字面值转为数字，若不是数字则转为NaN(Not a Number)，为了将string转为number，可以使用parseInt方法。
  2. boolean:true转为1，false转为0
* 其他类型转boolean
  1. number：0和NaN转为false，其他值均转为true
  2. string：空字符转为false，不为空则转为false
  3. null：转为false
  4. undefined：转为false

### 流程控制语句

* if
* switch
* for
* while
* do...while

与java没什么区别。

在for循环中定义变量要使用局部变量 let。

关于函数：

函数(方法)是被设计为执行特定任务的代码块

定义：JavaScript函数通过function关键字进行定义，语法为：
```JavaScript
function functionName(参数列表) {
  代码块;
}
```

注意：
* 形式参数不需要类型。因为JavaScript是弱类型语言
* 返回值也不需要定义类型，可以在函数内部直接使用return返回

```JavaScript
function add(a,b) {
  return a+b;
}
```

调用：函数名称(实际参数列表);

```JavaScript
let result = add(1,2);
```

定义函数还有另一种方式：
```JavaScript
var functionName = function(参数列表) {
  代码块;
}

var add = function(a,b) {
  return a+b;
}
```

调用：JS中，函数调用可以传递任意个数参数，函数会依照参数列表按顺序读入参数，多余参数会被抛弃。
```JavaScript
let result = add(1,2,3);
```

## JavaScript对象

### Array对象

Array为数组对象，定义方式如下：
```JavaScript
var 变量名 = new Array(数组列表);//方式一
var 变量名 = [数组列表];//方式二
```

访问方式可使用数组下标访问，如 数组名[元素下标] 进行访问。

注意：JavaScript的数组和Java中集合相似，变长变类型。

可使用for循环遍历数组。

Array常用属性方法：
* length：属性，数组中元素的个数
* push：方法，添加元素，将参数添加到数组最后面
* splice：方法，删除元素，参数分别为：开始下标，删除元素个数

### String对象

String为字符串对象，定义方式为：
```JavaScript
var 变量名 = new String();//方式一
var 变量名 = “字符串类型”;//方式二
```

String常用的属性方法：
* length：属性，字符串长度。
* trim：方法，用来去除前后两端的空白字符。
* charAt：方法，返回指定位置的字符

### 自定义对象

格式：
```JavaScript
var 对象名称 = {
  属性名称1:属性值1,
  属性名称2:属性值2,
  属性名称3:属性值3,
  ...
  函数名称:function(形参列表) {}
  ...
};
```

### BOM对象

* Browser Object Model 浏览器对象模型
* JavaScript将浏览器的各个组成部分封装为对象
* 组成：
  * Window：浏览器窗口对象
  * Navigator：浏览器对象
  * Screen：屏幕对象
  * History：历史记录对象
  * Location：地址栏对象

#### Window对象

获取：直接使用window，其中 window. 可以省略：
```JavaScript
window.alert("abc");
```

属性：获取其它BOM对象
* history：对History对象的只读引用。
* Navigator：对Navigator对象的只读引用。
* Screen：对Screen对象的只读引用。
* location：用于窗口或框架的Location对象。

方法：
* alert()：显示带有一段消息和一个确认按钮的警告框。
* confirm()：显示带有一段消息以及确认按钮和取消按钮的对话框，点击确认返回true，点击取消返回false
* setInterval()：按照指定的周期(以毫秒为单位)来调用函数或者计算表达式
* setTimeout()：在指定的毫秒数后调用函数或者计算表达式

#### History对象

历史记录对象。

获取：使用window.history获取，其中window.可以省略
```JavaScript
window.history.方法();
history.方法();
```

方法：
* back()：加载history列表中的前一个URL
* forward()：加载history列表中的下一个URL

#### Location对象

获取：通过window.location获取，其中window.可以省略
```JavaScript
window.location.方法();
location.方法();
```

属性：
* href：设置或者更改URL

### DOM对象

* Document Object Model 文档对象模型
* 将标记语言的各个组成部分封装为对象
  * Document：整个文本对象
  * Element：元素对象
  * Attribute：属性对象
  * Text：文本对象
  * Comment：注释对象

#### 关于DOM

* DOM是W3C(万维网联盟)的标准
* DOM定义了访问HTML和XML文档的标准
* W3C DOM标准被分为三个不同的部分：
  1. 核心DOM：针对任何结构化文档的标准模型
    * Document：整个文档对象
    * Element：元素对象
    * Attribute：属性对象
    * Test：文本对象
    * Comment：注释对象
  2. XML DOM：针对XML文档的标准模型
  3. HTML DOM：针对HTML文档的标准模型
    * Image：<img>
    * Button：<input type="button">

#### 获取Element对象

* Element：元素对象
* 获取：使用Document对象的方法来获取
  1. getElementById：根据id属性获取，返回一个Element对象
  2. getElementsByTagName：根据标签名获取，返回Element对象数组
  3. getElementsByName：根据name属性值获取，返回Element对象数组
  4. getElementsByClassName：根据class属性值获取，发明会Element对象数组

注：相当于把HTML文件的每一个标签封装成了一个对象供js脚本使用

#### 常见HTML Element对象的使用

在开发过程中，根据自己的需求选择相应的标签，并通过查询文档进行相应的使用。

另外有些对象没有自己的独有属性，可以查询Element对象的方法直接使用，因为所有的HTML Element对象均继承自Element对象。

### 事件监听

事件：HTML事件是指发生在HTML元素上的事情，比如：
* 按钮被点击
* 鼠标移动到元素之上
* 按下键盘按键

事件监听：JavaScript可以在事件被侦测到时执行代码

#### 事件绑定

事件绑定有两种方式

方式一：通过HTML标签中的事件属性进行绑定
```HTML
<input type="button" onclick='on()'>
<script>
function on() {
  alert("我被点击了");
}
</script>
```

方式二：通过DOM元素属性绑定
```HTML
<input type="button" id="btn">
<script>
document.getElementById("btn").onclick = function () {
  alert("我被点击了");
}
</script>
```

#### 常见事件

详情可见<a href="https://www.w3school.com.cn/jsref/dom_obj_event.asp">文档</a>

## 案例：表单验证

需求：
1. 当输入框失去焦点时，验证输入内容是否符合要求
2. 当点击注册按钮时，判断所有输入框内容是否都符合要求，如果不符合则阻止表单的提交

```JavaScript
//需求一
var usernameInput = document.getElementById("username");
usernameInput.onblur = function () {
  vae username = usernameInput.value.trim();
  if(username.length >= 6 && username.length <= 12) {
    //隐藏提示信息
  } else {
    //显示提示信息
  }
}
```

```JavaScript
//需求二
var regForm = dovument.getElementById("reg-form");
regForm.onsubmit = function() {
  //判断每个表单项均符合要求，若有一个不符合则返回false
  //均符合则返回false
}
```

## 正则表达式

* 概念：正则表达式定义了字符串组成的规则
* 定义：
  * 直接量：注意不要加引号 `var reg = /^\w{6,12)$/;`
  * 创建RegExp对象 `var reg == new RegExp(""^\W{6,12}$)`
* 方法：`test(str)`：判定指定字符串是否符合规则，返回true或者false

语法：
* `^` 表示开始
* `$` 表示结束
* `[]` 表示摸个范围内的单个字符，比如`[0-9]`单个数字字符
* `.` 表示单个字符，除了换行和行结束符
* `\w` 代表单词字符：字母、数字、下划线、相当于`[A-Za-z0-9]`
* `\d` 代表数字字符：相当于`[0-9]`
* 量词：
  * `+` 至少一个，`var reg = /^\w+$/`至少一个单词字符
  * `*` 零个或多个
  * `?` 零个或一个
  * `{x}` x个
  * `{m,}` 至少m个
  * `{m,n}` 至少m个，至多n个