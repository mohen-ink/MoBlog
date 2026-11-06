---
title: 'java作业3'
published: 2026-11-06
description: '三道 Java 面向对象作业的完整代码与解析：Person 类的继承与 toString() 重写、抽象类与上转型对象实现的多态工资计算，以及接口的定义与实现。'
image: ''
tags: [Java, 作业]
category: 'Java'
draft: false
lang: ''
---

整理第三次实验的三道 Java 作业：类的继承、抽象类与多态、接口。前半部分先列出三题的完整代码，后半部分再集中讲解思路、关键语句和示例结果。三题都只在题目给定的 `begin ... end` 代码块中编写代码，其余部分保持不变；代码使用 Java 8 及以上版本支持的基础语法。

## 一、lab3_1.java 完整代码（30 分）

```java title="lab3_1.java"
import java.util.Scanner;

class Person {
    // 自行设计类的实现
    /************ begin ***************/
    protected String name;
    protected String sex;
    protected int age;

    public Person(String name, String sex, int age) {
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    @Override
    public String toString() {
        return name + "，" + sex + "，" + age;
    }
    /************ end ***************/
}

class Student extends Person {
    // 自行设计类的实现
    /************ begin ***************/
    private String no;
    private String enter;
    private String major;

    public Student(String name, String sex, int age, String no, String enter, String major) {
        super(name, sex, age);
        this.no = no;
        this.enter = enter;
        this.major = major;
    }

    @Override
    public String toString() {
        return super.toString() + "，" + no + "，" + enter + "，" + major;
    }
    /************ end ***************/

}

class Teacher extends Person {
    // 自行设计类的实现
    /************ begin ***************/
    private String pro;
    private String department;

    public Teacher(String name, String sex, int age, String pro, String department) {
        super(name, sex, age);
        this.pro = pro;
        this.department = department;
    }

    @Override
    public String toString() {
        return super.toString() + "，" + pro + "，" + department;
    }
    /************ end ***************/
}

public class lab3_1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 录入学生信息（一行输入，格式为：姓名, 性别, 年龄, 学号, 入学年份, 专业）
        String[] studentData = scanner.nextLine().split("，");
        Student student = new Student(
                studentData[0].trim(),
                studentData[1].trim(),
                Integer.parseInt(studentData[2].trim()),
                studentData[3].trim(),
                studentData[4].trim(),
                studentData[5].trim()
        );

        // 录入教师信息（一行输入，格式为：姓名, 性别, 年龄, 职称, 部门）
        String[] teacherData = scanner.nextLine().split("，");
        Teacher teacher = new Teacher(
                teacherData[0].trim(),
                teacherData[1].trim(),
                Integer.parseInt(teacherData[2].trim()),
                teacherData[3].trim(),
                teacherData[4].trim()
        );

        // 输出结果
        System.out.println("学生的基本信息为：" + student);
        System.out.println("教师的基本信息为：" + teacher);
    }
}
```

## 二、HardWork.java 完整代码（30 分）

```java title="HardWork.java"
import java.util.Scanner;

abstract class Employee {
    public abstract double earnings();
}

class YearWorker extends Employee {
    //重写earnings()方法
    /************ begin ***************/
    @Override
    public double earnings() {
        return 100000;
    }
    /************ end ***************/
}

class MonthWorker extends Employee {
    //重写earnings()方法
    /************ begin ***************/
    @Override
    public double earnings() {
        return 10000 * 12;
    }
    /************ end ***************/
}

class WeekWorker extends Employee {
    //重写earnings()方法
    /************ begin ***************/
    @Override
    public double earnings() {
        return 5000 * 4 * 12;
    }
    /************ end ***************/
}

class Company {
    Employee[] employees;
    double salaries = 0;

    Company(Employee[] employees) {
        this.employees = employees;
    }

    public double salariesPay() {
        salaries = 0;
        //计算salaries
        /************ begin ***************/
        for (int i = 0; i < employees.length; i++) {
            salaries += employees[i].earnings();
        }
        /************ end ***************/
        return salaries;
    }
}


public class HardWork {
    public static void main(String[] args) {
        // 从键盘输入员工的数量
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Employee[] employees = new Employee[n];
        for (int i = 0; i < employees.length; i++) {
            if (i % 3 == 0)
                employees[i] = new WeekWorker();
            else if (i % 3 == 1)
                employees[i] = new MonthWorker();
            else if (i % 3 == 2)
                employees[i] = new YearWorker();
        }
        Company company = new Company(employees);
        System.out.println("公司年工资总额：" + company.salariesPay());
    }
}
```

## 三、lab3_3.java 完整代码（30 分）

```java title="lab3_3.java"
import java.util.Scanner;

interface Display {
    public void display(String s);
}

// 自行设计实现类
/************ begin ***************/
class Notice implements Display {
    @Override
    public void display(String s) {
        System.out.println("显示通知信息：" + s);
    }
}

class Car implements Display {
    @Override
    public void display(String s) {
        System.out.println("显示车辆信息：" + s);
    }
}

class Advertisement implements Display {
    @Override
    public void display(String s) {
        System.out.println("显示广告信息：" + s);
    }
}
/************ end ***************/

public class lab3_3 {
    public static void main(String[] args) {
        // 从键盘分别输入通知信息、车辆信息和广告信息
        Scanner sc = new Scanner(System.in);
        String[] str = new String[3];
        for (int i = 0; i < 3; i++) {
            str[i] = sc.nextLine();
        }
        Display[] arr = {new Notice(), new Car(), new Advertisement()};
        for (int i = 0; i < 3; i++) {
            arr[i].display(str[i]);
        }
    }
}
```

## 四、第一题解析：Person 类的继承

题目要求先设计父类 `Person`，保存姓名、性别、年龄；再让 `Student` 和 `Teacher` 继承它，分别增加自己的字段。三个类都要提供构造方法和 `toString()` 方法。

### 1. 字段类型要看 main 方法怎么传参

`main` 方法中创建学生对象的代码是：

```java
Student student = new Student(
        studentData[0].trim(),
        studentData[1].trim(),
        Integer.parseInt(studentData[2].trim()),
        studentData[3].trim(),
        studentData[4].trim(),
        studentData[5].trim()
);
```

只有第 3 个参数经过 `Integer.parseInt()` 转成了 `int`，其余参数都是 `String`。所以构造方法中只有年龄 `age` 是 `int`，学号 `no` 和入学时间 `enter` 都应声明为 `String`：

```java
public Student(String name, String sex, int age, String no, String enter, String major)
```

如果把学号写成 `int`，这里会因为参数类型不匹配而编译失败。而且学号 `202501088` 只是一个编号，不参与计算，用字符串保存也更合适。

### 2. 用 super(...) 调用父类构造方法

姓名、性别、年龄是三个类共有的，统一放在 `Person` 中：

```java
protected String name;
protected String sex;
protected int age;

public Person(String name, String sex, int age) {
    this.name = name;
    this.sex = sex;
    this.age = age;
}
```

子类构造方法的第一句使用 `super(...)`，把这三项交给父类初始化，自己只负责新增的字段：

```java
public Student(String name, String sex, int age, String no, String enter, String major) {
    super(name, sex, age);
    this.no = no;
    this.enter = enter;
    this.major = major;
}
```

`Person` 只定义了带三个参数的构造方法，没有无参构造方法。如果子类构造方法不写 `super(name, sex, age)`，Java 会默认调用 `super()`，从而找不到对应的构造方法并编译报错。另外，`super(...)` 必须写在子类构造方法的第一行。

字段使用 `protected`，表示同一个包中的类和子类都能访问。本题的 `toString()` 通过 `super.toString()` 复用父类结果，并不需要在子类中直接访问这三个字段，写成 `private` 也能正常运行。

### 3. 用 super.toString() 复用父类的输出

父类的 `toString()` 用中文逗号把三项基本信息拼接起来：

```java
@Override
public String toString() {
    return name + "，" + sex + "，" + age;
}
```

子类在父类结果的基础上继续拼接自己的字段：

```java
@Override
public String toString() {
    return super.toString() + "，" + no + "，" + enter + "，" + major;
}
```

`super.toString()` 表示调用父类版本的 `toString()`，这样子类就不用把姓名、性别、年龄再写一遍。以后如果父类的输出格式变了，两个子类会跟着一起变化。

`@Override` 注解告诉编译器“这个方法是在重写父类方法”。如果不小心把方法名写成 `tostring`，编译器会直接报错，而不是悄悄多出一个不会被调用的新方法。

`main` 中的 `"学生的基本信息为：" + student` 是字符串与对象拼接，Java 会自动调用 `student.toString()`。

### 4. 输入格式：中文逗号，两行之间不要空行

```java
String[] studentData = scanner.nextLine().split("，");
```

`split("，")` 按 **中文逗号** 切分一整行，所以输入时必须使用中文逗号“，”。如果输入的是英文逗号“,”，整行只会得到 1 个元素，取 `studentData[1]` 时会抛出 `ArrayIndexOutOfBoundsException`。

`trim()` 用来去掉每一项首尾的空格，所以在中文逗号后多打一个空格也没有影响。

另外要注意，程序用两次 `nextLine()` 分别读取学生和教师信息。从题目中复制输入用例时，如果把两行之间的空行也一起粘贴进去，第二次 `nextLine()` 读到的就是空行，同样会出现数组越界。两行之间只按一次回车即可。

### 5. 两组输入与输出

输入用例 1：

```text
张三，男，20，202501088，2025，计算机科学与技术
齐心，男，48，高级实验师，计算机工程与软件实验中心
```

预期输出：

```text
学生的基本信息为：张三，男，20，202501088，2025，计算机科学与技术
教师的基本信息为：齐心，男，48，高级实验师，计算机工程与软件实验中心
```

输入用例 2：

```text
李四，女，19，202502066，2025，软件工程
翟亚红，女，45，教授，计算机工程系
```

预期输出：

```text
学生的基本信息为：李四，女，19，202502066，2025，软件工程
教师的基本信息为：翟亚红，女，45，教授，计算机工程系
```

## 五、第二题解析：抽象类、上转型对象与多态

题目定义了抽象类 `Employee` 和抽象方法 `earnings()`，三个子类分别按年、按月、按周领取薪水。`Company` 类保存一个 `Employee` 数组，计算公司一年需要支付的薪水总额。

### 1. 抽象类与抽象方法

```java
abstract class Employee {
    public abstract double earnings();
}
```

- 抽象方法只有声明，没有方法体，以分号结尾。
- 包含抽象方法的类必须声明为 `abstract`。
- 抽象类不能直接 `new Employee()` 创建对象。
- 普通子类继承抽象类后，必须重写全部抽象方法，否则子类自己也必须声明为抽象类。

所以 `YearWorker`、`MonthWorker`、`WeekWorker` 中都必须提供 `earnings()` 的具体实现。

### 2. 三种员工的年薪

题目要求 `earnings()` 给出“每年报酬”，所以三个方法返回的都是一年的薪水：

| 类名          | 领取方式     | 年薪计算         | 结果（元） |
| ------------- | ------------ | ---------------- | ---------- |
| `YearWorker`  | 每年 10 万   | 100000           | 100000     |
| `MonthWorker` | 每月 1 万    | 10000 × 12       | 120000     |
| `WeekWorker`  | 每周 0.5 万  | 5000 × 4 × 12    | 240000     |

题目设定一个月 4 周，所以按周领取的员工一年是 48 周，而不是按日历的 52 周计算。

```java
public double earnings() {
    return 5000 * 4 * 12;
}
```

`5000 * 4 * 12` 先按 `int` 计算得到 240000，返回时自动转换为 `double`。单位统一使用“元”，因为题目要求输出的总额单位是元。

### 3. 上转型对象

```java
Employee[] employees = new Employee[n];
employees[i] = new WeekWorker();
```

数组的类型是 `Employee`，但实际存进去的是子类对象。把子类对象赋给父类类型的变量，就叫 **上转型对象**。

上转型对象有两个特点：

- 只能调用父类中声明过的方法，例如 `earnings()`；子类新增的方法不能通过它直接调用。
- 调用被子类重写的方法时，执行的是子类的版本。

正因为三种员工都可以当作 `Employee` 看待，它们才能放进同一个数组中统一处理。

### 4. 多态：同一句代码，不同的执行结果

```java
for (int i = 0; i < employees.length; i++) {
    salaries += employees[i].earnings();
}
```

循环中始终是同一句 `employees[i].earnings()`，但 Java 会根据 `employees[i]` 实际指向的对象决定调用哪个版本：

- 指向 `WeekWorker` 时，返回 240000；
- 指向 `MonthWorker` 时，返回 120000；
- 指向 `YearWorker` 时，返回 100000。

这就是多态。`Company` 类完全不需要判断员工的具体类型，不用写一串 `if` 或 `instanceof`。以后如果新增一种按天领取的员工，只需要再写一个子类并重写 `earnings()`，`salariesPay()` 不用做任何修改。

`salariesPay()` 开头先执行了 `salaries = 0;`，保证多次调用时不会在上一次的结果上继续累加。

### 5. 结果是怎么算出来的？

`main` 方法按 `i % 3` 分配员工类型：余数为 0 是按周，余数为 1 是按月，余数为 2 是按年。

| 输入 n | 按周人数 | 按月人数 | 按年人数 | 年工资总额（元）                              |
| ------ | -------- | -------- | -------- | --------------------------------------------- |
| 20     | 7        | 7        | 6        | 7×240000 + 7×120000 + 6×100000 = 3120000      |
| 30     | 10       | 10       | 10       | 10×240000 + 10×120000 + 10×100000 = 4600000   |

当 n = 20 时，`i` 的取值为 0～19：余数为 0 的有 0、3、6、9、12、15、18，共 7 个；余数为 1 的有 1、4、…、19，共 7 个；余数为 2 的有 2、5、…、17，共 6 个。

`salariesPay()` 返回 `double`，所以输出带有 `.0`。

### 6. 两组输入与输出

输入用例 1：

```text
20
```

预期输出：

```text
公司年工资总额：3120000.0
```

输入用例 2：

```text
30
```

预期输出：

```text
公司年工资总额：4600000.0
```

## 六、第三题解析：接口的定义与实现

题目给定了接口 `Display`，要求 `Notice`、`Car`、`Advertisement` 三个类实现它，并通过接口引用调用 `display()` 方法。

### 1. 接口与实现类

```java
interface Display {
    public void display(String s);
}
```

接口中的方法默认就是 `public abstract`，只规定“要有什么方法”，不提供具体实现。类通过 `implements` 关键字实现接口，并给出方法体：

```java
class Notice implements Display {
    @Override
    public void display(String s) {
        System.out.println("显示通知信息：" + s);
    }
}
```

实现接口方法时，访问权限必须写成 `public`。如果省略 `public`，方法的访问权限就比接口中的低，会编译报错。

另外两个类写法相同，只是输出的前缀分别换成“显示车辆信息：”和“显示广告信息：”。

### 2. 为什么三个类不加 public？

一个 `.java` 文件中只能有一个 `public` 类，并且它的名字必须和文件名相同。本题文件名是 `lab3_3.java`，公共类已经是 `lab3_3`，所以 `Notice`、`Car`、`Advertisement` 都不能再加 `public`。第一题、第二题中的辅助类也是同样的道理。

### 3. 接口回调

```java
Display[] arr = {new Notice(), new Car(), new Advertisement()};
for (int i = 0; i < 3; i++) {
    arr[i].display(str[i]);
}
```

数组的类型是接口 `Display`，元素分别指向三个实现类的对象。这和第二题的上转型对象很相似：用接口类型的变量保存实现类的对象，再通过它调用接口方法时，执行的是对象所属类的实现。这种用法称为 **接口回调**。

| 数组元素 | 实际对象        | 读入的内容 | 输出前缀       |
| -------- | --------------- | ---------- | -------------- |
| `arr[0]` | `Notice`        | `str[0]`   | 显示通知信息： |
| `arr[1]` | `Car`           | `str[1]`   | 显示车辆信息： |
| `arr[2]` | `Advertisement` | `str[2]`   | 显示广告信息： |

### 4. 抽象类和接口的区别

第二题和第三题都体现了多态，但使用的语法不同：

| 对比项       | 抽象类（第二题）                 | 接口（第三题）                   |
| ------------ | -------------------------------- | -------------------------------- |
| 关键字       | `abstract class`、`extends`      | `interface`、`implements`        |
| 继承数量     | 一个类只能继承一个父类           | 一个类可以实现多个接口           |
| 能否有字段   | 可以有普通成员变量               | 只能有常量                       |
| 适合的场景   | 子类之间是“是一种”的关系         | 不相关的类具备同一种能力         |

例如，年薪员工、月薪员工、周薪员工都“是一种”员工，适合用抽象类；而通知、汽车、广告之间并没有共同的父类关系，只是都“能显示信息”，适合用接口。

### 5. 两组输入与输出

输入用例 1：

```text
今天会员日8.8折
小米YU7汽车
御风而行
```

预期输出：

```text
显示通知信息：今天会员日8.8折
显示车辆信息：小米YU7汽车
显示广告信息：御风而行
```

输入用例 2：

```text
新店开业，全场9折
宝马X5白色
公路之王，传奇诞生
```

预期输出：

```text
显示通知信息：新店开业，全场9折
显示车辆信息：宝马X5白色
显示广告信息：公路之王，传奇诞生
```

本题用 `nextLine()` 按整行读取，所以输入中的逗号、空格都会原样保留在信息中。三行输入之间同样不要留空行，否则空行会被当成第二条信息读入。

## 七、运行时的共同注意事项

三个程序分别保存为 `lab3_1.java`、`HardWork.java`、`lab3_3.java`，公共类名与文件名必须完全一致，包括大小写。

在 IDEA 中把它们放在同一个 `src` 目录下时，要注意同一个包中不能有同名的类。第一题定义了 `Student` 类，如果 `src` 下还保留着上一次实验的 `Student.java`，两者会发生冲突并导致编译失败。可以把旧文件移走，或者为不同实验的代码建立不同的包。上面的代码按题目结构不添加包声明。

运行前确认 IDEA 右上角选中的是要运行的程序，最好直接点击对应文件中 `main` 方法左侧的运行按钮。例如误运行了 `HardWork`，却输入第一题的学生信息，`nextInt()` 读到“张三”时就会抛出 `InputMismatchException`。

- 第一题：输入两行，用中文逗号分隔各项，两行之间不要空行。
- 第二题：只输入一个整数，例如 `20` 或 `30`。
- 第三题：输入三行文字，每行一条信息。

三道题可以分别记住一句话：

- **继承题：**子类构造方法先用 `super(...)` 初始化父类字段，`toString()` 用 `super.toString()` 复用父类的输出。
- **抽象类题：**子类重写抽象方法给出各自的年薪，父类数组保存上转型对象，一个循环统一累加。
- **接口题：**实现类用 `implements` 实现接口方法并写成 `public`，通过接口引用调用 `display()`。
