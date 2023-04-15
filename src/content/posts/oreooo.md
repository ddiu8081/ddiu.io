---
title: 用 Vue + Canvas 做一个奥利奥图片生成器
date: 2019-01-09
---

偶然发现了一张沙雕图：

![https://cloud-upyun.ddiu.site/picture/2021/03/05/LWXqyN.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/LWXqyN.jpg)

感觉很有意思啊，来做一个生成器好了。

## 成果

![https://cloud-upyun.ddiu.site/picture/2021/03/05/9epfNO.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/9epfNO.jpg)

你可以从 [这里](https://ljl.li/oreooo) 访问这个生成器。

全部源代码已经在 Github 开源，项目地址 [ddiu8081/oreooo](https://github.com/ddiu8081/oreooo) ，喜欢的话欢迎加个星星。

## 思路

因为功能整体比较简单——根据输入字符串生成对应图片，并且可以以 png 格式保存。整体不涉及后端操作，所以选择轻巧的 Vue 来实现。

关于生成图片的部分，有两个主流选择：直接创建对应的 DOM 元素，再将 DOM 转化为 png 图片；或者直接将图片绘制在 canvas 画布上。在这里我们选择后者方案。

## 素材准备

找了一张分层的源文件（图左），用 Illustrator 打开之后处理成立体的样子，分别导出。

（绘图水平并不高…只是把原图拉扁，拼了一个椭圆+矩形，看起来像一个圆柱…至于光滑的感觉实在做不出来...）

![https://cloud-upyun.ddiu.site/picture/2021/03/05/hxudsq.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/hxudsq.jpg)

## 核心操作：Canvas 部分

### canvas 基本概念及图片绘制

> canvas
> 
> 
> [JavaScript](https://developer.mozilla.org/zh-CN/docs/JavaScript)
> 
> [HTML](https://developer.mozilla.org/zh-CN/docs/HTML)
> 
> [不那么简单的](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/A_basic_ray-caster)
> 

通过 HTML 和 JavaScript 声明一个 canvas，然后使用到 `drawImage` 方法来绘制图像。：

`context.drawImage` 的基本语法如下：

参数描述*img*规定要使用的图像、画布或视频。*sx*可选。开始剪切的 x 坐标位置。*sy*可选。开始剪切的 y 坐标位置。*swidth*可选。被剪切图像的宽度。*sheight*可选。被剪切图像的高度。*x*在画布上放置图像的 x 坐标位置。*y*在画布上放置图像的 y 坐标位置。*width*可选。要使用的图像的宽度。（伸展或缩小图像）*height*可选。要使用的图像的高度。（伸展或缩小图像）

### 向画布中叠放图片

例如，在 canvas 中插入一张”奥“：

注意和 DOM 中可以根据 `z-index` 属性设置层次不同，canvas 中的对象没有层级，也不能修改，类似于现实中的画油画。要根据从后向前的顺序依次覆盖，否则可能会出现下图状况：

![https://cloud-upyun.ddiu.site/picture/2021/03/05/kGDYr1.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/kGDYr1.jpg)

但是这样三个 onload 相互嵌套，不够优雅，所以可以实现一个图片预加载的方法。传入一个预加载对象，然后再进行叠放。

然后一张”奥利奥“就成型了。至于做成”奥利利奥奥奥“这种图片，依次叠放即可......

![https://cloud-upyun.ddiu.site/picture/2021/03/05/Mo2x7J.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/Mo2x7J.jpg)

## 进阶：其他一些优化

### 实现旋转 loading

![https://cloud-upyun.ddiu.site/picture/2021/03/05/1PctUS.gif](https://cloud-upyun.ddiu.site/picture/2021/03/05/1PctUS.gif)

想在网页初次加载的时候放一个全屏 loading，用到了 CSS 的动画。

首先创建一个占满浏览器窗口的 div，将图片置于中心，使用 Vue 的 data 来控制 loading 的显隐。

然后对图片设置动画，先创建一个旋转动作：

然后对图片设置 `animation` 属性，调节动画速度，设置为循环播放，线性速度。

### WebFont 自定义字体

在 Web 中使用自定义字体是个麻烦事，因为中文字体实在太大，全部加载的话体积可观，于是采用按需加载是一个可行的方案：计算页面中使用了哪些字，再实时生成一个字体子集进行挂载。目前 [有字库](https://www.youziku.com/)、 [justfont](http://cn.justfont.com/)、 [Adobe Fonts(Typekit)](https://fonts.adobe.com/) 均提供了中文字体的在线加载方案。

由于这个项目非常简单，用到的字也不多，干脆直接生成一个仅包含这些字的字体用在网页中。

百度前端团队提供了一套 [Fontmin](http://ecomfe.github.io/fontmin/) 解决方案，可以将 ttf 字体进行子集化，提供了开发方案和客户端。

正巧发现了一套免费可商用的 [瀨戶字型](http://www.hellofont.cn/font-detail?fontid=2646)，和这种中二的风格很搭（？）

![https://cloud-upyun.ddiu.site/picture/2021/03/05/kQVJOG.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/kQVJOG.jpg)

所以通过 Fontmin 工具，创建了一份瀨戶字型的子集，并且自动生成了所需的 CSS 代码：

### 国际化

要实现一个国际友好的项目，多语言切换是不能少的，下面使用 [Vue I18n](https://kazupon.github.io/vue-i18n/) 来实现一下。

![https://cloud-upyun.ddiu.site/picture/2021/03/05/OD9DEX.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/OD9DEX.jpg)

安装详见文档 [Installation](https://kazupon.github.io/vue-i18n/installation.html) 部分，这里因为没有用到模块化所以直接用了 script 引入方式，然后使用 `Vue.use` 引入 VueI18n。

定义字典：

然后在 HTML 中通过 `$t` 就可以读取到当前语言的字符串了。

然后可以看到语言已经被替换成对应的文字。

![https://cloud-upyun.ddiu.site/picture/2021/03/05/eBFgbc.jpg](https://cloud-upyun.ddiu.site/picture/2021/03/05/eBFgbc.jpg)