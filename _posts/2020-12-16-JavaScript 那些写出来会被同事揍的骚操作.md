---
# layout: post
layout: myPost
title: 'JavaScript 那些写出来会被同事揍的骚操作'
date: 2020-12-16 20:02:16 +0800
categories: '转载'
---

# JavaScript 那些写出来会被同事揍的骚操作

**转载自：https://juejin.cn/post/6844904032146817038**

## 前言

曾经，我接手了一份大佬的代码，里面充满了各种“骚操作”，还不加注释那种，短短几行的函数花了很久才弄懂。

![]({{ site.url }}/assets/img/16f40d8a3ac43572.webp)

这世上，“只有魔法才能对抗魔法”，于是后来，翻阅各种“黑魔法”的秘籍，总结了一些比较实用的“骚操作”，让我们装 X 的同时，提升代码运行的效率（请配合健身房一起使用）。

![]({{ site.url }}/assets/img/16f41662f7a9bfed.webp)

## 正文

### 位运算

JavaScript 中最臭名昭著的 Bug 就是 `0.1 + 0.2 !== 0.3`，因为精度的问题，导致所有的浮点运算都是不安全的，具体原因可详见[《0.1 + 0.2 不等于 0.3？为什么 JavaScript 有这种“骚”操作？》](https://juejin.im/post/6844903680362151950)。

因此，之前有大牛提出，不要在 JS 中使用位运算：

> Javascript 完全套用了 Java 的位运算符，包括按位与`&`、按位或`|`、按位异或`^`、按位非`~`、左移`<<`、带符号的右移`>>`和用`0`补足的右移`>>>`。 这套运算符针对的是整数，所以对 JavaScript 完全无用，因为 JavaScript 内部，所有数字都保存为双精度浮点数。如果使用它们的话，JavaScript 不得不将运算数先转为整数，然后再进行运算，这样就降低了速度。而且"按位与运算符"`&`同"逻辑与运算符"`&&`，很容易混淆。

但是在我看来，如果对 JS 的运用达到炉火纯青的地步，能避开各种“Feature”的话，偶尔用一下位运算符也无所谓，还能提升运算性能，毕竟直接操作的是计算机最熟悉的二进制。

位运算的原理可以参考这篇文章 [《位运算符在 JS 中的妙用》](https://juejin.im/post/6844903568906911752)

#### 1\. 使用左移运算符 `<<` 迅速得出 2 的次方

```javascript
1 << 2 // 4, 即 2的2次方
1 << 10 // 1024, 即 2的10次方

// 但是要注意使用场景
a = 2e9 // 2000000000
a << 1 // -294967296
```

#### 2\. 使用 `^` 切换变量 0 或 1

```javascript
// --- before ---
// if 判断
if (toggle) {
  toggle = 0
} else {
  toggle = 1
}
// 三目运算符
togle = toggle ? 0 : 1

// --- after ---
toggle ^= 1
```

#### 3\. 使用 `&` 判断奇偶性

偶数 & 1 = 0  
奇数 & 1 = 1

```javascript
console.log(7 & 1) // 1
console.log(8 & 1) // 0
```

#### 4\. 使用 `!!` 将数字转为布尔值

所有`非0`的值都是`true`，包括负数、浮点数：

```javascript
console.log(!!7) // true
console.log(!!0) // false
console.log(!!-1) // true
console.log(!!0.71) // true
```

#### 5\. 使用`~`、`>>`、`<<`、`>>>`、`|`来取整

相当于使用了 Math.floor()

```javascript
console.log(~~11.71) // 11
console.log(11.71 >> 0) // 11
console.log(11.71 << 0) // 11
console.log(11.71 | 0) // 11
console.log(11.71 >>> 0) // 11
```

> 注意 >>> 不可对负数取整

![]({{ site.url }}/assets/img/16f40fed00be4a42.webp)

#### 6\. 使用`^`来完成值交换

这个符号的用法前面提到过，下面介绍一些高级的用法，在 ES6 的解构赋值出来之前，用这种方式会更快(但必须是整数)：

```javascript
// --- before ---
let temp = a
a = b
b = temp // 传统，但需要借助临时变量
b = [a, (a = b)][0] // 借助数组

// --- after ---
let a = 7
let b = 1
a ^= b
b ^= a
a ^= b
console.log(a) // 1
console.log(b)[(a, b)] = [b, a] // 7 // ES6，解构赋值
```

#### 7\. 使用`^`判断符号是否相同

```javascript
;(a ^ b) >= 0 //  true 相同; false 不相同
```

![]({{ site.url }}/assets/img/16f4109f3a95343b.webp)

#### 8\. 使用`^`来检查数字是否不相等

```javascript
// --- before ---
if (a !== 1171) {...};

// --- after ---
if (a ^ 1171) {...};
```

![]({{ site.url }}/assets/img/16f410edb1e24be5.webp)

#### 9\. `n & (n - 1)`，如果为 0，说明 n 是 2 的整数幂

![]({{ site.url }}/assets/img/16f41056f7c0d5c0.webp)

#### 10\. 使用 `A + 0.5 | 0` 来替代 Math.round()

![]({{ site.url }}/assets/img/16f411b3794ca5d9.webp)

如果是负数，只需要`-0.5`

![]({{ site.url }}/assets/img/16f411d67a45f8b5.webp)

### String

#### 1\. 使用`toString(16)`取随机字符串

```javascript
Math.random().toString(16).substring(2, 15)
```

> .substring() 的第二个参数控制取多少位 (最多可取 13 位)

![]({{ site.url }}/assets/img/16f411765effedea.webp)

#### 2\. 使用 split(0)

使用数字来做为 split 的分隔条件可以节省 2 字节

```javascript
// --- before ---
'alpha,bravo,charlie'.split(',')

// --- after ---
'alpha0bravo0charlie'.split(0)
```

#### 3\. 使用`.link()` 创建链接

一个鲜为人知的方法，可以快速创建 a 标签

```javascript
// --- before ---
let b = `<a herf="www.google.com">google</a>`

// --- after ---
let b = 'google'.link('www.google.com')
```

![]({{ site.url }}/assets/img/16f41237aa0eec32.webp)

#### 4\. 使用 `Array` 来重复字符

```javascript
// --- before ---
for (let a = '', i = 7; i--; ) a += 0

// --- after ---
let b = Array(7).join(0) // "000000"
let c = Array(7).join('La') // "LaLaLaLaLaLa"

// ES6
let d = '0'.repeat(7) // "0000000"
```

### 其他一些花里胡哨的操作

#### 1\. 使用当前时间创建一个随机数

```javascript
// --- before ---
let b = 0 | (Math.random() * 100)

// --- after ---
let a
a = new Date() % 100 // 两位随机数
a = new Date() % 1000 // 三位随机数
a = new Date() % 10000 // 四位随机数...依次类推
// 不要在快速循环中使用，因为毫秒可能没有变化；
```

#### 2\. 一些可以替代 `undefined` 的操作

1.  `""._`, `1.._` 和 `0[0]`

![]({{ site.url }}/assets/img/16f412b73fbab55f.webp)

2.  `void 0` 会比写 `undefined` 要快一些

```javascript
let d = void 0
console.log(d) // undefined
```

![]({{ site.url }}/assets/img/16f412a4ce53ef82.webp)

#### 3\. 使用 `1/0` 来替代 `Infinity`

```javascript
// --- before ---
;[Infinity, -Infinity][
  // --- after ---
  (1 / 0, -1 / 0)
]
```

#### 4\. 使用 `Array.length = 0` 来清空数组

![]({{ site.url }}/assets/img/16f412f4622cfca3.webp)

#### 5\. 使用 `Array.slice(0)` 实现数组浅拷贝

![]({{ site.url }}/assets/img/16f41316d136ad60.webp)

#### 6\. 使用 `!+"\v1"` 快速判断 IE8 以下的浏览器

谷歌浏览器：

![]({{ site.url }}/assets/img/16f413b1de2078e6.webp)

IE 9（10，11）：

![]({{ site.url }}/assets/img/16f4149860e9ea1d.webp)

IE 8（7，6，5）：

![]({{ site.url }}/assets/img/16f413d12cf67eb0.webp)

#### 7\. for 循环条件的简写

```javascript
// --- before ---
for(let i = 0; i < arr.length; i++) {...}

// --- after ---
for(let i = arr.length; i--;) {...} // 注意 i-- 后面的分号别漏了

```

## 结尾

虽然上述操作能在一定程度上使代码更简洁，但会降低可读性。在目前的大环境下，机器的性能损失远比不上人力的损失，因为升级机器配置的成本远低于维护晦涩代码的成本，所以请谨慎使用这些“黑魔法”。就算要使用，也请加上注释，毕竟，这世上还有很多“麻瓜”需要生存。

![]({{ site.url }}/assets/img/16f4166f2e8ccdb2.webp)

还有一些其他骚操作，可以参考这位大神总结的 [《Byte-saving Techniques》](https://github.com/jed/140bytes/wiki/Byte-saving-techniques)，有些很常见，有些使用环境苛刻，这里就不一一列出了。

最后，来一个彩蛋，在控制台输入：

```javascript
(!~+[] + {})[--[~+''][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]]
```

如果以后有人喷你的代码，你就可以将此代码发给他。

![]({{ site.url }}/assets/img/16f4166833d5e344.webp)

**转载自：https://juejin.cn/post/6844904032146817038**
