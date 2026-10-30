---
title: 'java作业2'
published: 2026-10-30
description: '三道 Java 面向对象基础作业的完整代码与解析：三角形面积和周长、圆环属性封装与计算，以及学生对象数组的年龄修改和人数统计。'
image: ''
tags: [Java, 作业]
category: 'Java'
draft: false
lang: ''
---

整理三道 Java 基础作业：三角形类、圆环类、学生类与对象数组。前半部分先列出三题的完整代码，后半部分再集中讲解思路、关键语句和示例结果。代码面向初学者，使用 Java 8 及以上版本支持的基础语法；输出沿用题图中的 `println`，需要保留两位小数时使用 `String.format()`，不额外引入 `Locale`。

## 一、Triangle.java 完整代码（30 分）

```java title="Triangle.java"
import java.util.Scanner;

public class Triangle {
    private double a;
    private double b;
    private double c;

    public Triangle(double a, double b, double c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public double getArea() {
        double s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    public double getPerimeter() {
        return a + b + c;
    }

    public String toString() {
        return "三角形（" + a + "，" + b + "，" + c + "）";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double a = sc.nextDouble();
        double b = sc.nextDouble();
        double c = sc.nextDouble();
        Triangle t = new Triangle(a, b, c);
        System.out.println(t + "的面积为：" + String.format("%.2f", t.getArea()));
        System.out.println(t + "的周长为：" + String.format("%.2f", t.getPerimeter()));
    }
}
```

## 二、Ring.java 完整代码（30 分）

```java title="Ring.java"
import java.util.Scanner;

public class Ring {
    private double innerRadius;
    private double outerRadius;
    private String color;

    public Ring(double innerRadius, double outerRadius, String color) {
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.color = color;
    }

    public double getInnerRadius() {
        return innerRadius;
    }

    public void setInnerRadius(double innerRadius) {
        this.innerRadius = innerRadius;
    }

    public double getOuterRadius() {
        return outerRadius;
    }

    public void setOuterRadius(double outerRadius) {
        this.outerRadius = outerRadius;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getArea() {
        return Math.PI * (outerRadius * outerRadius - innerRadius * innerRadius);
    }

    public double getOuterPerimeter() {
        return 2 * Math.PI * outerRadius;
    }

    public double getInnerPerimeter() {
        return 2 * Math.PI * innerRadius;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double innerRadius = sc.nextDouble();
        double outerRadius = sc.nextDouble();
        String color = sc.next();
        Ring ring = new Ring(innerRadius, outerRadius, color);
        System.out.println("圆环的内半径: " + ring.getInnerRadius());
        System.out.println("圆环的外半径: " + ring.getOuterRadius());
        System.out.println("圆环的颜色: " + ring.getColor());
        System.out.println("圆环的面积: " + String.format("%.2f", ring.getArea()));
        System.out.println("圆环的外圆周长: " + String.format("%.2f", ring.getOuterPerimeter()));
        System.out.println("圆环的内圆周长: " + String.format("%.2f", ring.getInnerPerimeter()));
    }
}
```

## 三、Student.java 完整代码（30 分）

保留题目给定的主程序和输出方法，在三个 `begin ... end` 代码块中分别补充类的实现、年龄修改和人数统计。

```java title="Student.java"
public class Student {
    // 自行设计类的实现
    /************ begin ***************/
    private int id;
    private String name;
    private int age;

    public Student(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

    public String toString() {
        return "学号：" + id + "，姓名：" + name + "，年龄：" + age;
    }
    /************ end ***************/

    public static void main(String args[]) {
        // 定义变量 n，n 从键盘输入
        int n = (new java.util.Scanner(System.in)).nextInt();
        Student s1 = new Student(1, 18, "小明");
        Student s2 = new Student(2, 20, "小张");
        Student s3 = new Student(3, 19, "小李");
        Student s4 = new Student(4, 18, "小王");
        Student s5 = new Student(5, 20, "小赵");

        Student s[] = {s1, s2, s3, s4, s5}; // 给对象数组赋值
        System.out.println("班级学生名单如下：");
        output(s); // 第1次调用output方法输出数组
        // 将所有学生年龄加 n
        /************ begin ***************/
        for (int i = 0; i < s.length; i++) {
            s[i].age += n;
        }
        /************ end ***************/
        System.out.printf("所有学生年龄加 %d 后...\n", n);
        output(s); // 第2次调用output方法输出数组

        /* 统计大于20岁的学生个数 */
        int count = 0;
        /************ begin ***************/
        for (int i = 0; i < s.length; i++) {
            if (s[i].age > 20) {
                count++;
            }
        }
        /************ end ***************/
        System.out.println("大于 20 岁人数是：" + count);
    }

    /* 以下方法输出学生数组的所有元素 */
    private static void output(Student s[]) {
        for (int i = 0; i < s.length; i++) {
            System.out.println(s[i]);
        }
    }
}
```

## 四、第一题解析：三角形的面积和周长

题目要求用一个类表示三角形，三条边 `a`、`b`、`c` 都是 `double` 类型，并提供计算面积和周长的方法。题目已经保证三条边能够组成三角形，因此不额外编写合法性判断。

### 1. 属性、构造方法和对象

```java
private double a;
private double b;
private double c;
```

这三个成员变量保存一个三角形的三条边。`private` 表示它们只能在当前类内部直接访问。

构造方法的名字必须与类名一致，而且没有返回值类型，连 `void` 也不写：

```java
public Triangle(double a, double b, double c) {
    this.a = a;
    this.b = b;
    this.c = c;
}
```

`this.a` 表示当前对象的属性，右边的 `a` 表示传入的参数。例如：

```java
Triangle t = new Triangle(3, 4, 5);
```

这条语句创建一个三角形对象，并通过构造方法把它的三条边设置为 3、4、5。完整代码中的三条边来自键盘输入，每次运行处理一组三角形数据。

### 2. 用海伦公式计算面积

先求半周长：

$$
s = \frac{a + b + c}{2}
$$

再求面积：

$$
S = \sqrt{s(s-a)(s-b)(s-c)}
$$

对应代码为：

```java
double s = (a + b + c) / 2;
return Math.sqrt(s * (s - a) * (s - b) * (s - c));
```

`Math.sqrt()` 用来求平方根，不需要额外导入包。这里 `a`、`b`、`c` 都是 `double`，所以除以整数 `2` 时也会进行浮点数计算，不会丢掉小数部分。

以 3、4、5 为例，半周长为 6，面积为：

$$
\sqrt{6 \times 3 \times 2 \times 1} = 6
$$

周长直接把三条边相加即可：

```java
return a + b + c;
```

### 3. 为什么要写 toString()？

题图中的输出语句使用了 `t + "的面积为："`。这里的 `t` 是一个对象，不是已经拼好的文字。

```java
public String toString() {
    return "三角形（" + a + "，" + b + "，" + c + "）";
}
```

当对象和字符串进行拼接时，Java 会调用对象的 `toString()` 方法。自己写好这个方法后，`t` 就会按指定形式显示为 `三角形（3.0，4.0，5.0）`。

没有重写这个方法时，默认结果通常类似 `Triangle@...`，不会自动输出三条边。

### 4. println 如何保留两位小数？

`println()` 本身没有设置小数位数的参数，可以先用 `String.format()` 得到格式化后的字符串，再交给它输出：

```java
System.out.println(t + "的面积为：" + String.format("%.2f", t.getArea()));
```

分开看就是：

```java
String area = String.format("%.2f", t.getArea());
System.out.println(t + "的面积为：" + area);
```

- `String.format()` 返回一个字符串，不会自己输出。
- `%.2f` 表示把浮点数格式化为小数点后两位，会进行舍入。
- `println()` 输出拼接完成的内容，并在末尾换行。

因此 6 显示为 `6.00`，约 26.8328 显示为 `26.83`。这只改变显示形式，不会修改方法返回的原始数值。

`String` 属于 Java 自动导入的 `java.lang` 包，不需要为它添加 `import`。这里使用系统默认地区格式；以下示例按常见的点号小数格式展示。

### 5. 两组输入与输出

输入用例 1：

```text
3 4 5
```

预期输出：

```text
三角形（3.0，4.0，5.0）的面积为：6.00
三角形（3.0，4.0，5.0）的周长为：12.00
```

输入用例 2：

```text
7 8 9
```

预期输出：

```text
三角形（7.0，8.0，9.0）的面积为：26.83
三角形（7.0，8.0，9.0）的周长为：24.00
```

## 五、第二题解析：圆环属性封装与计算

圆环是外圆去掉内圆后剩下的部分。题目要求保存内半径 `innerRadius`、外半径 `outerRadius` 和颜色 `color`，通过构造方法初始化，并为三个属性提供 `get`、`set` 方法。

### 1. 三个属性与构造方法

内、外半径可能有小数，所以使用 `double`；颜色是文字，所以使用 `String`：

```java
private double innerRadius;
private double outerRadius;
private String color;
```

输入时使用：

```java
double innerRadius = sc.nextDouble();
double outerRadius = sc.nextDouble();
String color = sc.next();
```

`nextDouble()` 读取浮点数，`next()` 读取一段不含空白的文字。例如输入 `5 8 red` 后，这三个变量分别保存 `5.0`、`8.0` 和 `"red"`。

随后创建对象：

```java
Ring ring = new Ring(innerRadius, outerRadius, color);
```

虽然半径和颜色由键盘读入，但最终仍然是通过构造方法传给对象，符合题目要求。每次运行输入一组数据，测试第二组时重新运行即可。

### 2. get 和 set 分别做什么？

以获取和修改内半径为例：

```java
public double getInnerRadius() {
    return innerRadius;
}

public void setInnerRadius(double innerRadius) {
    this.innerRadius = innerRadius;
}
```

`getInnerRadius()` 读取属性并返回数值，所以返回类型是 `double`。

`setInnerRadius()` 接收一个新的内半径并修改属性，不需要返回计算结果，所以返回类型是 `void`。

其他两个属性也是相同写法，只需要替换属性名和对应类型。完整程序通过构造方法初始化、通过 `get` 方法输出；`set` 方法虽然没有在 `main` 中调用，但仍然要按题目要求提供。

本题按给定的合法半径进行计算，不额外增加半径检查或颜色判断。

### 3. 面积、外圆周长和内圆周长

设外半径为 $R$，内半径为 $r$，则：

$$
S = \pi(R^2-r^2)
$$

$$
C_{\text{外}} = 2\pi R, \qquad C_{\text{内}} = 2\pi r
$$

代码直接使用乘法表示平方：

```java
return Math.PI * (outerRadius * outerRadius - innerRadius * innerRadius);
```

`Math.PI` 是 Java 提供的圆周率常量，不需要导入额外的包。不要直接写成 `3.14`：例如第一组的面积若使用 `3.14`，结果会是 `122.46`，与题目要求的 `122.52` 不同。

外圆周长使用外半径，内圆周长使用内半径，不能混淆。颜色只用于保存和输出，不参与计算。

### 4. 输出格式按示例处理

题目文字写了“所有输出结果保留两位小数”，但示例中的半径是 `5.0`、`8.0`，并不是 `5.00`、`8.00`。这里以给定用例为准：半径直接输出，面积和两个周长保留两位小数。

```java
System.out.println("圆环的内半径: " + ring.getInnerRadius());
System.out.println("圆环的面积: " + String.format("%.2f", ring.getArea()));
```

如果老师明确要求连半径也保留两位小数，只需要把半径的输出改为同样的形式：

```java
System.out.println("圆环的内半径: " + String.format("%.2f", ring.getInnerRadius()));
System.out.println("圆环的外半径: " + String.format("%.2f", ring.getOuterRadius()));
```

不需要为保留两位小数把 `println` 改成 `printf`，也不建议只用乘除和取整代替格式化：那样不一定能显示末尾的 `0`。

### 5. 两组输入与输出

输入用例 1：

```text
5 8 red
```

预期输出：

```text
圆环的内半径: 5.0
圆环的外半径: 8.0
圆环的颜色: red
圆环的面积: 122.52
圆环的外圆周长: 50.27
圆环的内圆周长: 31.42
```

输入用例 2：

```text
4 6 blue
```

预期输出：

```text
圆环的内半径: 4.0
圆环的外半径: 6.0
圆环的颜色: blue
圆环的面积: 62.83
圆环的外圆周长: 37.70
圆环的内圆周长: 25.13
```

## 六、第三题解析：学生对象数组与年龄统计

题目已经给出了 5 名学生的初始数据。程序先读取 `n`，输出原始名单，再把每名学生的年龄增加 `n` 岁，最后统计修改后年龄大于 20 岁的人数。

### 1. 构造方法的参数顺序要与题目一致

学生类包含学号、姓名和年龄三个属性，但题目创建对象的代码是：

```java
Student s1 = new Student(1, 18, "小明");
```

传入顺序为“学号、年龄、姓名”，因此构造方法也必须按这个顺序声明：

```java
public Student(int id, int age, String name) {
    this.id = id;
    this.age = age;
    this.name = name;
}
```

属性在类中的排列顺序不决定构造方法的参数顺序，实际调用时要看方法声明。

这里没有额外添加 `get`、`set` 方法：年龄修改和判断都发生在 `Student` 类内部，能直接访问对象的 `private` 属性。圆环题则明确要求提供 `get`、`set`，两题要求不同。

### 2. 对象数组中保存的是什么？

```java
Student s[] = {s1, s2, s3, s4, s5};
```

`Student s[]` 和 `Student[] s` 都是在声明学生数组。数组包含 5 个元素，索引从 0 到 4：

| 数组元素 | 对应学生 | 初始年龄 |
| --- | --- | --- |
| `s[0]` | 小明 | 18 |
| `s[1]` | 小张 | 20 |
| `s[2]` | 小李 | 19 |
| `s[3]` | 小王 | 18 |
| `s[4]` | 小赵 | 20 |

数组里保存的是这些学生对象的引用，并没有重新复制出 5 个学生对象。因此修改 `s[0].age`，修改的就是 `s1` 所指向的那名学生的年龄。

### 3. 遍历数组，把年龄增加 n 岁

```java
for (int i = 0; i < s.length; i++) {
    s[i].age += n;
}
```

- `i = 0`：从第一个元素开始。
- `i < s.length`：依次访问所有元素，但不越过数组末尾。
- `i++`：每处理一名学生，移动到下一名。
- `s[i].age`：当前学生的年龄。

其中：

```java
s[i].age += n;
```

等价于：

```java
s[i].age = s[i].age + n;
```

不要只写 `s[i].age++`，因为那样每次只增加 1，输入 `n = 2` 时就不符合要求。也不要写成 `s[i].age = n`，那是把年龄直接设置为 `n`，不是增加 `n`。

### 4. 先修改年龄，再统计大于 20 岁的人数

```java
int count = 0;
for (int i = 0; i < s.length; i++) {
    if (s[i].age > 20) {
        count++;
    }
}
```

`count` 是计数器，初值为 0。每找到一名符合条件的学生，就执行一次 `count++`，也就是人数增加 1。

题目要求的是 **大于 20 岁**，所以判断必须使用 `> 20`，不能改成 `>= 20`。恰好 20 岁的学生不计入结果。

统计操作放在年龄修改之后，所以使用的是新年龄，而不是原始年龄：

| 输入 n | 修改后的年龄 | 大于 20 岁的人数 |
| --- | --- | --- |
| 1 | 19、21、20、19、21 | 2 |
| 2 | 20、22、21、20、22 | 3 |

### 5. output() 和 toString() 的关系

题目给定的 `output()` 方法循环执行：

```java
System.out.println(s[i]);
```

这会调用当前学生对象的 `toString()` 方法，所以在第一个 `begin ... end` 代码块中提供：

```java
public String toString() {
    return "学号：" + id + "，姓名：" + name + "，年龄：" + age;
}
```

第一次调用 `output(s)` 时，显示初始年龄；第二次调用时，数组中的对象已经被修改，所以同一个输出方法会显示新年龄，不需要再写一套输出逻辑。

### 6. 两组输入与输出

输入用例 1：

```text
1
```

预期输出：

```text
班级学生名单如下：
学号：1，姓名：小明，年龄：18
学号：2，姓名：小张，年龄：20
学号：3，姓名：小李，年龄：19
学号：4，姓名：小王，年龄：18
学号：5，姓名：小赵，年龄：20
所有学生年龄加 1 后...
学号：1，姓名：小明，年龄：19
学号：2，姓名：小张，年龄：21
学号：3，姓名：小李，年龄：20
学号：4，姓名：小王，年龄：19
学号：5，姓名：小赵，年龄：21
大于 20 岁人数是：2
```

输入用例 2：

```text
2
```

预期输出：

```text
班级学生名单如下：
学号：1，姓名：小明，年龄：18
学号：2，姓名：小张，年龄：20
学号：3，姓名：小李，年龄：19
学号：4，姓名：小王，年龄：18
学号：5，姓名：小赵，年龄：20
所有学生年龄加 2 后...
学号：1，姓名：小明，年龄：20
学号：2，姓名：小张，年龄：22
学号：3，姓名：小李，年龄：21
学号：4，姓名：小王，年龄：20
学号：5，姓名：小赵，年龄：22
大于 20 岁人数是：3
```

两组用例应分别重新运行程序，不是在同一次运行中连续加 1、再加 2。每次重新运行，都会重新创建学生对象，年龄从初始值开始。

## 七、运行时的共同注意事项

三个程序分别保存为 `Triangle.java`、`Ring.java`、`Student.java`，公共类名与文件名必须完全一致，包括大小写，不要把三个公共类合并到同一个文件中。

在 IDEA 中，可以把三个文件放在同一项目的 `src` 目录下，分别运行各自的 `main` 方法。如果项目已有包声明，应让包名与目录保持一致；上面的代码按题目结构不添加包声明。

- 三角形题：每次输入三条边，例如 `3 4 5`。
- 圆环题：每次输入内半径、外半径和颜色，例如 `5 8 red`。
- 学生题：每次只输入一个整数，例如 `1` 或 `2`。

`Scanner` 默认可以用空格或换行分隔输入。程序没有额外打印“请输入”等提示，以免与题目要求的输出不一致。中文括号、逗号、冒号和英文冒号也要按各题示例保留；控制台显示的输入回显不属于程序输出。

三道题可以分别记住一句话：

- **三角形题：**构造方法保存三条边，海伦公式求面积，三边相加求周长。
- **圆环题：**私有属性配合 `get`、`set`，外圆面积减内圆面积，用 `String.format("%.2f", 数值)` 控制显示格式。
- **学生题：**数组遍历修改每个对象，再用 `> 20` 判断并累计人数。

