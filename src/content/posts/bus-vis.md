---
title: 把北京的所有公交织成一张图——带你看看北京的公交网
date: 2011-01-01
---

> 北京有约 4000 条线路，1.6w 个公交站点，你可曾想过如果把它们全部画下来是什么样子？这是我的一个尝试。

![AnimatedImage.gif](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/5570C3FE-E82F-45A7-818F-C439D07971CC_2/e653wSR2nhnQ5J0siO8RhumNgdKce6GuucOwVc9scFMz/AnimatedImage.gif)

[https://cloud-upyun.ddiu.site/picture/2022/02/14/zBoYeK.png](https://cloud-upyun.ddiu.site/picture/2022/02/14/zBoYeK.png)

![ScreenShot 2022-02-14 at 15.09.38.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/9FD87300-48AF-454A-9EED-CA2F2F359E97_2/IQgbCdDRtwBlSySfZcKHcZYhx6Zx03fdYZB4qhxQHz4z/ScreenShot%202022-02-14%20at%2015.09.38.png)

大家都见过地铁图，那种把所有地铁线路和站点抽象地贴在一张白纸上的图。

再写实一点，前段时间 [帝都绘](https://mp.weixin.qq.com/s/SIo-MkolLz4pz52GOyXUrQ) 做出了一张百科全书一样的《北京城市轨道交通全图》，把地铁的每个历史、车站信息、站间距、时刻表等等信息都画了出来，十分硬核。

说到地铁图，那有没有人做一张公交图呢？我试着做了一个。

# 数据收集

想看如何获得全北京的线路数据的小伙伴恐怕要失望了，本篇不会讲到这部分内容。拿到数据并入库后，首先随便选取了 200 条线路转为 GeoJson 格式，在 [kepler.gl](https://kepler.gl) 预览下效果：

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/CC90E22B-49D6-4058-A341-F2205EB9B36E_2/1Ro70xMw2yxcvASejuOBHEZT3Rq4xkQ4LUY670hArpkz/Image.png)

[https://cloud-upyun.ddiu.site/picture/2022/01/31/O40hfQ.png](https://cloud-upyun.ddiu.site/picture/2022/01/31/O40hfQ.png)

感觉还是可以的。

然后是所有公交站点的一个展示：

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/C53DDE18-9A9A-4717-BB1E-8062AEE3FEF2_2/YTbVMQrE5yjhVfkhxiBefhOxsKxV0HkZeLEgilNwQy4z/Image.png)

[https://cloud-upyun.ddiu.site/picture/2022/01/30/ocgJiw.png](https://cloud-upyun.ddiu.site/picture/2022/01/30/ocgJiw.png)

# 数据整理

本以为把数据套个壳就可以自己展示，但是发现一个问题——原始数据太大了（北京路网数据达到了44M），这个体积实在无法满足传输的要求，而且前端解析时会把浏览器卡崩，于是得想办法把数据进行压缩。

## 第一次压缩：Visvalingam-Whyatt

Visvalingam-Whyatt 算法是一种折线点的概化算法，可以在失真较小的情况下删除一条线上的部分点。Python 中有一个库 [visvalingamwyatt](https://pypi.org/project/visvalingamwyatt/) 实现了这种算法。

```other
import visvalingamwyatt as vw

simplify_loc_list = vw.simplify(new_loc_list, ratio=0.2)
```

经测试，优化率设置为0.2时（即压缩后体积为之前的20%），线路的大部分细节还是没有丢失的。

经过这轮优化，路网数据的体积从 44 M 优化到了 8.8 M。

## 第二次压缩：相邻点差值计算

前面的算法压缩率非常高，但是当0.2的压缩数值进一步调低时，在立交桥等区域的线路细节丢失就比较多了。于是采用第二种方案进行压缩。

就拿北京869路公交车的路径为例（为啥拿这条线举例子呢，这是从数据库寻找到的北京全程最短的纯数字号线路，只有4.0公里），它的路径是这样的。

```other
116.460243,40.047118;116.460247,40.04628;116.460252,40.045165;116.460252,40.045109;116.460243,40.043941;116.460243,40.043872;116.460243,40.043759;116.460247,40.043073;116.460243,40.040352;116.460378,40.040243;116.461628,40.040269;116.462025,40.040276;116.463364,40.040299;116.466176,40.040312;116.466324,40.040343;116.46691,40.04033;116.467687,40.04033;116.468646,40.040343;116.469366,40.040365;116.470343,40.040434;116.470339,40.040434;116.470699,40.04046;116.473134,40.040621;116.473238,40.040625;116.473572,40.040647;116.474102,40.040686;116.474349,40.040699;116.474579,40.040716;116.474865,40.040738;116.475148,40.040755;116.475369,40.040768;116.475894,40.040803;116.476037,40.040812;116.476033,40.040812;116.476927,40.040872;116.477049,40.040877;116.477209,40.04089;116.478542,40.040985;116.478793,40.041007;116.479805,40.041085;116.480126,40.041115;116.480343,40.037127;116.48036,40.036918;116.480391,40.036515;116.480395,40.036228;116.480395,40.035955;116.48043,40.035438;116.480486,40.034414;116.480499,40.034175;116.480508,40.033932;116.48053,40.033507;116.480543,40.033312;116.480564,40.032726;116.481072,40.032682;116.480959,40.032431;116.481068,40.031115;116.481072,40.031081;116.481033,40.030651;116.480968,40.030317;116.480894,40.030104;116.480716,40.029783;116.480599,40.029614;116.48043,40.02941;116.480252,40.029236;116.479635,40.028702;116.478928,40.02809
```

共有1373个字符，它们以 `经度1,纬度1;经度2,纬度2…` 的格式排列。鉴于所有经度/纬度之间的相差并不大，且每个点都是上一点的延伸，于是可以想到把“零散点”变成“继承点”的方式。采用相邻求差值的方式计算每一个经度/纬度与上一组值的差值，并将所有结果乘10^6以尽量减少小数的出现：

```python
def compress_polyline(raw_polyline):
    loc_text_list = raw_polyline.split(';')
    last_blng = 0
    last_blat = 0
    new_loc_text_list = []
    for loc_text in loc_text_list:
        loc_array = loc_text.split(',')
        blng = int(float(loc_array[0]) * 1000000)
        blat = int(float(loc_array[1]) * 1000000)
        diff_blng = blng - last_blng
        diff_blat = blat - last_blat
        last_blng = blng
        last_blat = blat
        new_loc_text_list.append(str(diff_blng) + ',' + str(diff_blat))
    new_result = ';'.join(new_loc_text_list)
    return new_result
```

优化过后，前述路径会被优化成这个样子：

```other
116460243,40047118;4,-838;5,-1115;0,-56;-9,-1168;0,-69;0,-113;4,-686;-4,-2721;135,-109;1250,26;397,7;1339,23;2812,13;148,31;586,-13;777,0;959,13;720,22;977,69;-4,0;360,26;2435,161;104,4;334,22;530,39;247,13;230,17;286,22;283,17;221,13;525,35;143,9;-4,0;894,60;122,5;160,13;1333,95;251,22;1012,78;321,30;217,-3988;17,-209;31,-403;4,-287;0,-273;35,-517;56,-1024;13,-239;9,-243;22,-425;13,-195;21,-586;508,-44;-113,-251;109,-1316;4,-34;-39,-430;-65,-334;-74,-213;-178,-321;-117,-169;-169,-204;-178,-174;-617,-534;-707,-612
```

共519个字符，缩小了一多半体积。经过这轮压缩，北京的全路数据就从8.8M优化到了3.4M。再挂上 Gzip 压缩，现在传输体积已经变为了1.8M，足以应付大部分传输需求了。

# 前端编写

用来展示地理数据的前端库选用了deck.gl，Mapbox 作为地图底图。整个儿做下来感觉，其实这种可视化地图的展示，核心就在于处理好图层。

就像 Photoshop 的图层一样，deck.gl 也是是通过叠图层的方式来展示数据的，通常每一类基本元素和数据源为一层，且每层都可以自定义控制显隐性和交互。deck.gl 中的图层包括 BitmapLayer 图片层、TextLayer 文本层、PathLayer 路径层、IconLayer 图标层、ScatterplotLayer 散点层等等。而我们的公交图，正是由这几个基础层组合而成的。

![未命名.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/B3F1F545-6A2A-474D-A2CA-B5FBAEA9376A_2/tNk6C1OnwCDFSjKHMcMyTsyKxxZRFprbrq0DHfc2Q0Qz/B3F1F545-6A2A-474D-A2CA-B5FBAEA9376A_2.png)

[https://cloud-upyun.ddiu.site/picture/2022/02/14/Aw3aRC.png](https://cloud-upyun.ddiu.site/picture/2022/02/14/Aw3aRC.png)

以 `SingleLineViewLayer` 举例子：这是一个自定义图层，代表某条线路的详情视图。在这个视图中，会展示一条路径以及沿途的站点。它的构成是：

```other
SingleLineViewLayer
├── PathLayer (基本图层，线图层)
└── ScatterStopLayer
	├── ScatterplotLayer (基本图层，散点图层)
	├── IconLayer (基本图层，图标图层)
	└── TextLayer (基本图层，文字图层)
```

deck.gl 允许控制每一个基本图层的展示与隐藏，于是途径站点这一层就是这么设计的：缩放比例较小时隐藏所有点，缩放比例较大时展示黑点、比例更大时展示图标和文字。

![AnimatedImage.gif](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/1AF63BC0-3CA0-4AA5-852F-250104A8563A_2/xiJmwfelL2qoILzNWumUs6vrzy4W1v4Fe7tqFASxF9Iz/AnimatedImage.gif)

[https://cloud-upyun.ddiu.site/picture/2022/02/12/sTQz8Z.gif](https://cloud-upyun.ddiu.site/picture/2022/02/12/sTQz8Z.gif)

顺便佩服一下 Github Copilot，在开发的过程中给过我很多智能提示，不仅能完成代码逻辑的智能补全，还避免我手动搜索“广东的经纬度是___”这种问题了……

![AnimatedImage.gif](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/5C56B821-5D2D-40AF-BE52-555FE606995F_2/9DdarRmhwWJEmuV22jBGPzEoUiZFABoXkhow3rUt17Mz/AnimatedImage.gif)

[https://cloud-upyun.ddiu.site/picture/2022/02/04/l7NoO5.gif](https://cloud-upyun.ddiu.site/picture/2022/02/04/l7NoO5.gif)

# 使用

## 公交网

![AnimatedImage.gif](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/1918B206-D469-4B24-8236-3101CECDA7FD_2/ZlU0TrpFm9B9y9IU0TJzhxjq6yGfGKJ8e3Jx3G4aVB8z/AnimatedImage.gif)

[https://cloud-upyun.ddiu.site/picture/2022/02/14/0U11xp.gif](https://cloud-upyun.ddiu.site/picture/2022/02/14/0U11xp.gif)

进入页面首先看到的就是公交网图了。所有线条都是一条条公交线路，每条公交线路行驶在既定的线路上，彼此交织便形成了一张专属于公交的路网。其实一眼看起来和北京的道路网差不多，其实是帝都的公交系统比较发达，基本上大部分道路都有公交经过。

公交线路用了带透明度的颜色绘制，因此颜色越深代表此处经过的线路越多。整个公交网是可交互的，鼠标放在具体的线路上可以看到高亮的线路名称，点击可以查看线路的详情。

[https://cloud-upyun.ddiu.site/picture/2022/02/13/7eZnuI.gif](https://cloud-upyun.ddiu.site/picture/2022/02/13/7eZnuI.gif)

有了这张公交网，就能解决诸如“一条道路上究竟有多少条公交在跑”这种问题了，而这也是我做图的初衷了。

## 站点网

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/DEB1A980-22F9-4BF1-9E36-86941E8276CC_2/7Jn9nL7uIsWm9jRLezWH5IOX8CoagyS9J6Q08lruk7gz/Image.png)

[https://cloud-upyun.ddiu.site/picture/2022/02/13/N3d2sH.png](https://cloud-upyun.ddiu.site/picture/2022/02/13/N3d2sH.png)

和公交网一样，站点网也会把所有公交站标注出来。我一向不喜欢把点聚合那种飘渺的不知道具体位置的感觉。所以站点网依然没有做聚类，有多少点就会展示多少点。

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/47F8AE23-B232-4CA0-AE39-A6AB779B6D27_2/xUdU03yHL769uZq38gK2do2JQMeBxTFxD97FYS5ctxsz/Image.png)

[https://cloud-upyun.ddiu.site/picture/2022/02/12/UIPLkx.png](https://cloud-upyun.ddiu.site/picture/2022/02/12/UIPLkx.png)

图片来自腾讯开发者文档，右图就是点聚合

## 站点辐射图

![ScreenShot 2022-02-14 at 00.29.03@2x.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/C87CBE9D-E8E2-445D-B59F-AB716FEC5A07_2/1sYu02ycO3JApy0xu0xgHIHR3Vp1GKE4zZqX7bSim9kz/ScreenShot%202022-02-14%20at%2000.29.032x.png)

[https://cloud-upyun.ddiu.site/picture/2022/02/14/aAXbPE.png](https://cloud-upyun.ddiu.site/picture/2022/02/14/aAXbPE.png)

马神庙站的辐射图

一个公交站会有很多公交线路停靠，那么如果把这些线路都绘制出来，那就形成了以这个站点为中心的辐射网。根据辐射网的大小，也许可以比较直观地看出来每个站点的“影响力”怎么样。

我觉得这是一个很酷的功能，可惜没见有哪家服务实现过。于是，我尝试把这个功能搞了出来。选中一个公交站，就可以看到以这个公交站辐射出去的路网了。

# 那就挑几个数据吧

有了一些基础数据后，我整理了一些公交之最系列。读者朋友们如果还有哪些感兴趣的想知道的知识，可以反馈给我，我会在后面的文章更新中尝试着去找出来。由于一些限制，可能我的路网数据有部分缺失，所以可能会出现纰漏和错误，敬请谅解。

## 最长的公交站名——清华大学附属中学大兴校区西

我称它为“播报快乐站”。排名第一的选手是清华大学附属中学大兴校区西（13个字），另外还有生物医药基地开发区管委会等4个站点并列第二。

## 最长的常规公交线路——936路

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/57E882BF-416D-409D-B019-3292D5052B05_2/YrGq3MwHpry2sdh3EKYmesbkWxisnFNWS5MFyaRJyY4z/Image.png)

[https://cloud-upyun.ddiu.site/picture/2022/02/14/ygPWKl.png](https://cloud-upyun.ddiu.site/picture/2022/02/14/ygPWKl.png)

北京公交的936路，原为北京公交城际丰宁班车，全程达到了约165公里。

## 最曲折的线路——还不知道

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/B8827089-034F-4455-A423-EDEA425735CC_2/xYUYIbZIIzyX5FKy0ptB5BMWxo0CfyhkSoPpdWQmn08z/Image.png)

[https://cloud-upyun.ddiu.site/picture/2022/02/14/89i2tf.png](https://cloud-upyun.ddiu.site/picture/2022/02/14/89i2tf.png)

偶然在六环外点到了 M36 这条公交：全程只有两站却长 33 公里，中间还有许许多多大弯道。于是想，北京拐了最多弯的公交（我称它为“过山车线”）是哪一个？当然估计不会是我随便选的这条。

估计得到这个结果需要不少计算量，而整个儿算法我还没想明白，所以可能会留在之后几期的分享吧。

# 还要做的事情

以上完成的是第一版，从数据到展示前前后后花了两周时间，完成了一些比较主要的功能，也遗留了很多不足。下面有几项未来还计划加入的功能。

## 提升性能

最开始我使用的是 Ant 家的 L7 + 高德地图作为地图库，可惜自己欠缺优化，等全城的线路加载出来会把浏览器搞崩，在手机上更是无法打开。后来换成 deck.gl + Mapbox 来渲染后，仍旧卡但是已经好了很多，在手机上也可以正常刷出首屏了。

浏览 deck.gl 文档的 showcase 时，偶然发现了 [新加坡巴士路线浏览器](https://busrouter.sg/) 这个网站，完全震惊到了。它在数据可视化展示方面做得非常出色，展示也很流畅。现在，我们的北京公交路网拖拽起来还是卡卡的，很有必要优化一下。我对地图的研究还不够深，会继续学习寻找提升性能的办法。

## 按时间查看

公交都是有运行时段的，有白班线路，也有夜班线路。我想到一个有趣的功能，可以根据一天的不同时段生成不同的在线路网图，能看到从白天到黑夜，城市路网从兴盛到平静的变化，想来是很令人兴奋的。

## 站点可视化

还有一个功能是站点可视化，也就是把站点的一些可量化的数据展示出来，比如前面讲到的“站点影响力”。后面我会尝试计算一些数据出来，做一个数据的可视化展示。

## 实时公交

实时公交应该是一个不太好实现的美好的设想。说到实时公交，我曾经写过一个小程序，叫做北京公交出行，可能一些朋友会有印象，它长这样：

![68747470733a2f2f696d6167652e646469752e736974652f696d672f32303139303432393130313032372e6a7067.jpeg](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/544C156D-70CA-470C-8F13-F522141F49EA_2/pvhhwq7nkNYNIorgLArLHnjZcka6Pnb0EWFyN6QYeDYz/68747470733a2f2f696d6167652e646469752e736974652f696d672f32303139303432393130313032372e6a7067.jpeg)

[https://cloud-upyun.ddiu.site/picture/2022/02/09/hMoZY6.jpg](https://cloud-upyun.ddiu.site/picture/2022/02/09/hMoZY6.jpg)

在当时实时公交查询与展示是个很能戳痛点的东西，因为国内地图御三家都没有实时数据，于是个小程序还是很有用的。后来三家地图都推出了实时公交的查询，迫于自己也没办法获得准确的实时数据，就顺势关闭了服务。

但是实时公交如果真的能展示出来应该很有意思，不过数据量和难度估计会很大。期待日后北京能把这项数据源开放出来。

# One More Thing

![Slide 16_9 - 1.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/B1F0AC24-BB9D-41B3-AFC5-85D9C8BE976A/60558D01-FFE2-4401-B3EE-33E112C2A0A8_2/4nSch4crCiQx9A8lXWuLgsdPui8MYATkNg2YVbQayc8z/Slide%2016_9%20-%201.png)

[https://cloud-upyun.ddiu.site/picture/2022/02/06/F0kJ8i.png](https://cloud-upyun.ddiu.site/picture/2022/02/06/F0kJ8i.png)

对了，除了北京外，我也加入了上海、广州、南京三个城市，点击左上角即可切换城市。

很高兴通过建立这个网站满足了自己对于公交的好奇心，也期待能通过这个项目帮到更多对公交同样感兴趣的人。

前端工程的源码可以从这里找到：[https://github.com/ddiu8081/bus-vis](https://github.com/ddiu8081/bus-vis)

[BusRouter SG - Singapore Bus Routes Explorer](https://busrouter.sg/)

[Building BusRouter SG](https://cheeaun.com/blog/2019/02/building-busrouter-sg/)

[Building BusRouter SG](https://cheeaun.com/blog/2019/02/building-busrouter-sg/)

