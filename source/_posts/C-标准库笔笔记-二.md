---
title: C++标准库笔笔记_二
date: 2022-03-02 21:39:36
tags:
        - 编程相关
        - C++
        - C++标准库
---

<center>

# C++标准库笔记(二)

</center>

## 标准库类型string

标准库类型string表示可变长的字符序列，使用string类型必须首先包含string头文件。作为标准库的一部分，string定义在命名空间std中，接下来的所有示例都默认包含以下代码：

```c++
#include <string>
using std::string;
```

## 关于如何定义和初始化string对象

定义的方式与其他变量的定义没有不同，初始化则有许多方式，如下：

```c++
string s1;              //默认初始化，s1是一个空串
string s2(s1);          //s2是s1的副本
string s3 = s1;         //等价于s3(s1)，s3是s1的副本
string s4("value");     //s4是字面值"value"的副本，除了字面值最后的那个空字符外
string s5 = "value";    //等价于s5("value"),s5是字面值"value"的副本
string s6(n,"c");       //把s4初始化为由连续n个字符c组成的串
```

尽管如此，在c++11后，建议使用统一的方式进行变量的初始化，即在变量名后的大括号内写上变量的初始内容，比如：

```c++
string s1{"value"};     //s1是字面值"value"的副本，除了字面值最后的那个空字符外
string s2{s1};          //s2是s1的副本
```

## string对象上的操作

如下所示为基本的string对象操作：

```c++
os << s;                        //将s写入到输出流os中
is >> s;                        //将输入流is中的数据写入到s中，到第一个空格为止
getline( is , s );              //将is中读取整行数据写入s中，包括空格
s.empty();                      //判断对象s是否e为空，为空则返回true,不为空则返回false
s.size();                       //返回s中字符的个数
s[n];                           //返回s中第n个字符的引用，n从0开始记起
s1 + s2;                        //将s1与s2首尾相连，s1在前，s2在后
s1 = s2;                        //用s2的副本代替s1中原来的字符
s1 == s2;                       //若s1与s2中字符完全一样，则返回true，否则返回false，对大小写敏感
s1 != s2;                       //若s1与s2中字符不完全一样，则返回true，否则返回false，对大小写敏感
<,<=,>,>=;                      //利用字符在字典中顺序进行比较，且对字符的大小写敏感
```

关于读写string对象，一般用标准库中的iostearm来读写，具体如下：

```c++
int main(void)
{
        string s;
        cin >> s;
        cout << s <<endl;
        return 0;
}
```

上述代码在运行时会从运行窗口读取用户输入的第一个字符串(从开始输入第一个字符到第一个空格的内容)到s中，注意string对象会忽略开头的空白(即空格符、换行符、制表符等)。

和内置类型的输入输出一样，string对象的此类操作也是返回运算符左边的对象作为操作结果。因此，多个输入或输出可以连写在一起：

```c++
string s1 , s2 , s3;
cin >> s1 >> s2 >> s3;
cout << s1 << s2 << s3 << endl;
```

使用getline函数可以读取一整行的字符，getline函数需要两个参数，分别为一个输入流对象和一个string对象，使用时会将输入流对象中的一整行字符读入string对象中(u不包括换行符)。

string对象的empty和size方法正如先前介绍的一般，需要注意的是size方法返回的数值的类型并不是int而是一个string::size_type类型的值，本质上来说它是一个无符号整形的值且能够放下任何string类的size返回值的变量，所以请勿直接使用它参与运算。

string对象可以直接与字面值进行相加运算。

关于string对象中单个字符的处理，在cctype头文件里定义一组标准库函数处理这部分操作，如下为其中的主要函数名以及其含义：

```c++
isalnum(c);             //当c为字母或数字时为真
isalpha(c);             //当c为字母i时为真
iscntrl(c);             //当c为控制字时为真
isdigit(c);             //当c数字时为真
isgraph(c);             //当c不是空格但是可打印时为真
islower(c);             //当c是小写字母时为真
isprint(c);             //当c是可打印字符时为真
ispunch(c);             //当c为标点符号时为真(即c是除控制字、数字、字母、可打印空白以外的字符)
isspace(c);             //当c为空白时为真(即c是除空格、横向制表符、纵向制表符、回车、换行、进纸符以外的字符)
isupper(c);             //当c为大写字符时为真
isxdigit(c);            //当c为十六进制数字时为真
toupper(c);             //如果c是小写字符，返回对应的大写字母，否则原样返回c
tolower(c);             //如果c是大写字符，返回对应的小写字母，否则原样返回c
```

若要处理每个字符，则可以使用基于范围的for语句，C++11标准提供了一种范围for语句可适用于此情况，其语法形式为：
```c++
for ( declaration : expression )
        statement;
```

其中expression为一个对象，用于表示一个序列。而declaration部分负责定义一个变量用于访问序列中的基础元素。每次迭代declaration部分的变量会被初始化为expression部分的下一个元素值。

值得注意的是这条语句迭代时实际上是将下一个元素的值拷贝给declaration部分的变量，使用这个语句对string对象进行任何操作不会对string对象本身造成修改。

如要修改string对象本身则可将declaration部分定义为一个引用，例如：

```c++
for ( auto &c : s )
{
        c = toupper(c);                //每一次会将s的下一个值的引用初始化给c
}
```

若要访问string对象的部分字符则可以使用下标访问，使用方法与数组相同，但为了防止出现不可预测的结果，使用下标访问前因先确定string对象不为空：

```c++
if ( !s.empty() 
{
        s[0] = toupper(s[0]);
})
```
