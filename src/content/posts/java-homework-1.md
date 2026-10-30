---

title: 'java作业1'
published: 2026-10-16
description: '三道 Java 基础作业的完整代码与解析：String 常用方法、3×3 二维数组行列互换，以及学生成绩分段统计和平均分计算。'
image: ''
tags: [Java, 作业]
category: 'Java'
draft: false
lang: ''
---

整理三道 Java 基础作业：字符串常用方法、二维数组行列互换、学生成绩统计。前半部分先列出三题的完整代码，后半部分再集中讲解思路、关键语句和示例结果。代码使用 Java 8 及以上版本支持的语法。

## 一、StringExample.java 完整代码（40 分）

```java title="StringExample.java"
public class StringExample {
    public static void main(String args[]) {
        String s1 = new String("you are a student");
        String s2 = new String("how are you");

        if (s1.equals(s2)) {
            System.out.println("s1与s2相同");
        } else {
            System.out.println("s1与s2不相同");
        }

        String s3 = new String("13971918888");
        if (s3.startsWith("139")) {
            System.out.println("手机号以139开头");
        }

        String s4 = new String("你"), s5 = new String("我");
        if (s4.compareTo(s5) > 0) {
            System.out.println("按字典序s4大于s5");
        } else {
            System.out.println("按字典序s4小于s5");
        }

        int position = 0;
        String path = "d:\\java\\A.java";
        position = path.lastIndexOf("\\");
        System.out.println(path + "中最后出现\\的位置为: " + position);

        String fileName = path.substring(position + 1);
        System.out.println(path + "中含有的文件名为: " + fileName);

        String s6 = new String("100");
        String s7 = new String("123.678");
        int n1 = Integer.parseInt(s6);
        double n2 = Double.parseDouble(s7);
        double m = n1 + n2;
        System.out.println(n1 + " + " + n2 + " 的和为: " + m);

        String s8 = String.valueOf(m);
        position = s8.indexOf(".");
        String temp = s8.substring(position + 1);
        System.out.println("数字" + m + "有" + temp.length() + "位小数");

        String s9 = new String("ABCDEF");
        char a[] = s9.toCharArray();
        System.out.print(s9 + " 逆序字符输出为: ");
        for (int i = a.length - 1; i >= 0; i--) {
            System.out.print(" " + a[i]);
        }
    }
}
```

## 二、SwapMatrix.java 完整代码（25 分）

```java title="SwapMatrix.java"
import java.util.Scanner;

public class SwapMatrix {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[][] matrix = new int[3][3];

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                matrix[i][j] = scanner.nextInt();
            }
        }

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(matrix[j][i] + " ");
            }
            System.out.println();
        }

        scanner.close();
    }
}
```

## 三、Score.java 完整代码（25 分）

```java title="Score.java"
import java.util.Locale;
import java.util.Scanner;

public class Score {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in).useLocale(Locale.US);
        int fail = 0;
        int pass = 0;
        int medium = 0;
        int good = 0;
        int excellent = 0;
        int count = 0;
        double total = 0;

        double score = scanner.nextDouble();
        while (score != -1) {
            if (score < 60) {
                fail++;
            } else if (score < 70) {
                pass++;
            } else if (score < 80) {
                medium++;
            } else if (score < 90) {
                good++;
            } else if (score > 90) {
                excellent++;
            }

            total += score;
            count++;
            score = scanner.nextDouble();
        }

        double average = count == 0 ? 0 : total / count;
        System.out.println("不及格的人数为：" + fail);
        System.out.println("及格的人数为：" + pass);
        System.out.println("中等的人数为：" + medium);
        System.out.println("良好的人数为：" + good);
        System.out.println("优秀的人数为：" + excellent);
        System.out.printf(Locale.US, "全班平均分为：%.2f%n", average);

        scanner.close();
    }
}
```

## 四、第一题解析：String 类的常用方法

这是一道填空题，共 10 空，每空 4 分。重点是字符串比较、查找、截取、类型转换，以及字符数组的遍历，不需要从控制台输入数据。

### 1. 十个填空对应的方法

| 空号 | 代码                           | 作用                           |
| ---- | ------------------------------ | ------------------------------ |
| 1    | `s1.equals(s2)`                | 比较两个字符串的内容是否相同   |
| 2    | `s3.startsWith("139")`         | 判断字符串是否以 `139` 开头    |
| 3    | `s4.compareTo(s5) > 0`         | 判断前者的字典序是否大于后者   |
| 4    | `path.lastIndexOf("\\")`       | 获取最后一个反斜杠的索引       |
| 5    | `path.substring(position + 1)` | 截取最后一个反斜杠后面的文件名 |
| 6    | `Integer.parseInt(s6)`         | 将字符串转换为整数             |
| 7    | `Double.parseDouble(s7)`       | 将字符串转换为 `double` 数值   |
| 8    | `String.valueOf(m)`            | 将数值转换为字符串             |
| 9    | `s8.substring(position + 1)`   | 截取小数点之后的内容           |
| 10   | `s9.toCharArray()`             | 将字符串转换为字符数组         |

题目注释中的 `valuOf` 是笔误，正确的方法名是 `valueOf`。

### 2. equals、startsWith 和 compareTo

`s1.equals(s2)` 比较的是字符串的文字内容。两个字符串分别是 `you are a student` 和 `how are you`，内容不同，因此返回 `false`，执行 `else` 分支。

不要用 `==` 代替这里的 `equals()`：对于字符串对象，`==` 判断的是是否引用同一个对象，不是单纯比较文字内容。

`s3.startsWith("139")` 判断手机号字符串是否以 `139` 开头，结果为 `true`，因此会打印对应提示。判断结尾则可以使用 `endsWith()`。

`compareTo()` 返回一个整数：

- 大于 0：前面的字符串字典序更大。
- 等于 0：两个字符串内容相同。
- 小于 0：前面的字符串字典序更小。

本题比较的是“你”和“我”。Java 在这里按字符的 UTF-16 代码单元比较，不是按汉语拼音排序。“你”的编码值小于“我”，所以 `s4.compareTo(s5) > 0` 不成立，输出“按字典序s4小于s5”。

### 3. 查找路径中的位置并截取文件名

源代码中的路径写成：

```java
String path = "d:\\java\\A.java";
```

Java 字符串中的反斜杠是转义符，所以要用 `\\` 表示一个实际的 `\`。这个字符串实际包含的内容是：

```text
d:\java\A.java
```

索引从 0 开始，最后一个反斜杠的位置为 7，字母 `A` 的位置为 8。

```java
position = path.lastIndexOf("\\");
String fileName = path.substring(position + 1);
```

`lastIndexOf()` 找到最后一次出现的位置；`substring(起始索引)` 从指定位置开始截取到末尾，并且包含起始位置的字符。这里使用 `position + 1`，就是跳过反斜杠，从 `A` 开始截取，得到 `A.java`。

`indexOf()` 查找第一次出现的位置，`lastIndexOf()` 查找最后一次出现的位置；如果找不到，两者都会返回 `-1`。本题给定的路径和小数点都存在，所以可以直接使用查找到的位置。

### 4. 字符串与数值之间的转换

`"100"` 和 `"123.678"` 是字符串，需要先转换才能进行数值计算：

```java
int n1 = Integer.parseInt(s6);
double n2 = Double.parseDouble(s7);
double m = n1 + n2;
```

这里 `n1` 为 100，`n2` 为 123.678，相加得到 223.678。

要区分两种 `+`：

```java
"100" + "123.678"  // 字符串拼接，得到 "100123.678"
100 + 123.678      // 数值相加，得到 223.678
```

再通过 `String.valueOf(m)` 将结果转换为 `"223.678"`，找到小数点并截取其后内容，得到 `"678"`。这个字符串的 `length()` 为 3，所以本例输出有 3 位小数。

这里统计的是数值转换为字符串后的小数部分长度。浮点数可能出现精度误差或科学计数法，因此不要把这个写法当成适用于所有数值的精确小数位统计方法。

### 5. 转为字符数组并倒序输出

`toCharArray()` 把 `"ABCDEF"` 转为字符数组：

```text
下标：0 1 2 3 4 5
字符：A B C D E F
```

倒序循环从最后一个索引开始：

```java
for (int i = a.length - 1; i >= 0; i--) {
    System.out.print(" " + a[i]);
}
```

数组共有 6 个元素，但最后一个索引是 5，所以初值用 `a.length - 1`。每次执行 `i--`，依次访问 `F`、`E`、`D`、`C`、`B`、`A`。

还要注意：字符串长度写作 `s.length()`，数组长度写作 `a.length`。

### 6. 本题预期输出

```text
s1与s2不相同
手机号以139开头
按字典序s4小于s5
d:\java\A.java中最后出现\的位置为: 7
d:\java\A.java中含有的文件名为: A.java
100 + 123.678 的和为: 223.678
数字223.678有3位小数
ABCDEF 逆序字符输出为:  F E D C B A
```

## 五、第二题解析：二维数组行列互换

题目要求定义一个 3 行 3 列的二维数组，从控制台读取数据，再输出行列互换后的结果。行列互换也叫矩阵转置。

### 1. 理解二维数组下标

```java
int[][] matrix = new int[3][3];
```

可以把这个数组看成一张 3 行 3 列的表。访问方式是 `matrix[行下标][列下标]`，下标都从 0 开始。

例如，`matrix[1][2]` 表示第 2 行、第 3 列的元素，不是第 1 行、第 2 列。

### 2. 用双重循环输入

```java
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        matrix[i][j] = scanner.nextInt();
    }
}
```

外层循环 `i` 控制行，内层循环 `j` 控制列。每进入一行，就依次读取这一行的 3 个整数，总共读取 9 个数。

`nextInt()` 默认把空格、换行等作为分隔符，所以可以输入三行，也可以在同一行输入 9 个整数，不需要额外处理换行。

### 3. 转置的关键：交换两个下标

普通输出读取 `matrix[i][j]`，转置输出读取 `matrix[j][i]`。

假设原数组为：

```text
1 2 3
4 5 6
7 8 9
```

当输出循环的 `i = 0` 时，`j` 依次为 0、1、2，因此读取：

```text
matrix[0][0] → 1
matrix[1][0] → 4
matrix[2][0] → 7
```

也就是把原数组的第 1 列作为新结果的第 1 行。后面两轮同理。

`System.out.print()` 输出元素但不换行；内层循环结束后执行一次 `System.out.println()`，就能做到每输出 3 个数换一行。

当前程序没有修改原数组，而是按转置后的顺序输出，满足“打印输出行列互调后的二维数组”的要求。如果还需要保存转置结果，可以另外定义数组，用 `result[i][j] = matrix[j][i]` 存储。

### 4. 两组输入与输出

输入用例 1：

```text
1 2 3
4 5 6
7 8 9
```

预期输出：

```text
1 4 7
2 5 8
3 6 9
```

输入用例 2：

```text
3 8 9
2 7 1
5 4 6
```

预期输出：

```text
3 2 5
8 7 4
9 1 6
```

代码在每个元素后输出一个空格，因此每行最后一个数后面也会带有空格。

## 六、第三题解析：成绩分段统计与平均分

题目要求输入数量不确定的一批学生成绩，以 `-1` 作为结束标记，统计各分段人数并计算平均分。重点是 `while` 循环、条件分支、计数器和累加器。

### 1. 先说明分段边界

代码按以下条件统计：

| 分段   | 条件               | 计数变量    |
| ------ | ------------------ | ----------- |
| 不及格 | `score < 60`       | `fail`      |
| 及格   | `60 <= score < 70` | `pass`      |
| 中等   | `70 <= score < 80` | `medium`    |
| 良好   | `80 <= score < 90` | `good`      |
| 优秀   | `score > 90`       | `excellent` |

成绩允许小数，所以题目中的“60～69”通常按 `[60, 70)` 理解，69.5 分也归入及格段；其他相邻分段同理。

**题面写的是“优秀 >90”，遗漏了恰好 90 分的归属。上面的完整代码保留题面条件，因此 90 分会计入总人数和总分，但不会计入任何一个分段，分段人数之和可能小于总人数。** 如果老师要求“90 分及以上为优秀”，应将 `else if (score > 90)` 改为 `else if (score >= 90)`。两组给定用例都没有恰好 90 分，所以不受这个差异影响。

程序假设输入的是合法的数值成绩，并最终输入 `-1`，没有额外增加成绩范围或非数字输入的校验逻辑。

### 2. 为什么要有计数器和累加器？

五个分段计数变量分别记录各段人数，初值都是 0。每遇到一名符合条件的学生，对应变量加 1。

```java
fail++;
```

等价于：

```java
fail = fail + 1;
```

此外，还需要：

```java
int count = 0;
double total = 0;
```

`count` 记录总人数，`total` 记录总分。人数只能是整数，用 `int`；成绩可能有小数，所以总分使用 `double`。

### 3. 为什么使用 while 循环？

学生人数不确定，不能提前写死循环次数，因此用结束标记控制循环：

```java
double score = scanner.nextDouble();
while (score != -1) {
    // 处理当前成绩
    score = scanner.nextDouble();
}
```

处理顺序是：

1. 循环前读取第一个成绩。
2. 判断它是否为 `-1`。
3. 不是 `-1`，就分类计数、累计总分和人数。
4. 读取下一个成绩，再回到条件判断。
5. 是 `-1`，就退出循环，输出统计结果。

循环末尾读取下一个成绩的语句不能漏掉，否则 `score` 不会更新，就可能一直重复处理同一个成绩，形成死循环。

因为先判断再处理，`-1` 不会进入总分和总人数统计。

### 4. 为什么 else if 不需要重复写下限？

```java
if (score < 60) {
    fail++;
} else if (score < 70) {
    pass++;
}
```

能执行到第二个判断，说明第一个条件 `score < 60` 不成立，已经确定 `score >= 60`。因此再判断 `score < 70`，组合起来就是大于等于 60、小于 70。

`if ... else if ...` 链只会执行第一个成立的分支。比如 64.5 分属于及格，不会继续进入后面的中等或良好分支。

### 5. 累加总分并计算平均分

每处理一个成绩，就执行：

```java
total += score;
count++;
```

`total += score` 等价于 `total = total + score`。所有成绩处理完后，再用总分除以总人数：

```java
double average = count == 0 ? 0 : total / count;
```

这是三元运算表达式，意思是：如果总人数为 0，程序把平均分设为 0；否则计算 `total / count`。这样一开始就输入 `-1` 时，也不会出现除以 0 的计算。

用例 1 的总分为 553，总人数为 7，平均分为 79。

用例 2 的总分为 716.5，总人数为 9，平均分约为 79.6111。

### 6. 保留两位小数

```java
System.out.printf(Locale.US, "全班平均分为：%.2f%n", average);
```

- `printf`：按指定格式输出。
- `%.2f`：将浮点数按小数点后两位输出，会进行舍入。
- `%n`：输出换行。
- `Locale.US`：确保输出的小数点是 `.`。

因此 79 显示为 `79.00`，79.6111… 显示为 `79.61`。这控制的是显示格式，不是把 `average` 变量本身变成只保存两位小数。

读取成绩时的 `.useLocale(Locale.US)` 则确保程序按 `75.5` 这种用点号表示小数的格式读取输入。

### 7. 两组输入与输出

输入用例 1：

```text
75.5 80 92.5 64.5 55 87.5 98 -1
```

预期输出：

```text
不及格的人数为：1
及格的人数为：1
中等的人数为：1
良好的人数为：2
优秀的人数为：2
全班平均分为：79.00
```

输入用例 2：

```text
87.5 98 67.5 78 86.5 92 56.5 62.5 88 -1
```

预期输出：

```text
不及格的人数为：1
及格的人数为：2
中等的人数为：1
良好的人数为：3
优秀的人数为：2
全班平均分为：79.61
```

## 七、运行时的共同注意事项

三个程序分别保存为 `StringExample.java`、`SwapMatrix.java`、`Score.java`，不要把它们合并进同一个 Java 文件。Java 要求公共类名与文件名完全一致，包括大小写，否则会提示公共类应在同名文件中声明。

在 IDEA 中，可以把三个文件放在同一个项目的 `src` 目录下，分别点击对应 `main` 方法左侧的绿色三角形运行。第一题不需要输入；第二题输入 9 个整数；第三题输入一批成绩，并以 `-1` 结束。控制台中出现自己刚输入的数据是输入回显，不属于程序额外输出的内容。

三道题可以分别记住一句话：

- **字符串题：**根据需求选择比较、查找、截取和转换方法。
- **二维数组题：**输入访问 `matrix[i][j]`，转置输出访问 `matrix[j][i]`。
- **成绩统计题：**读一个成绩，分类计数并累加，再读下一个，遇到 `-1` 结束。
