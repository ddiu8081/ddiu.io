---
title: 做一个 VS Code 主题：Moegi Theme
date: 2011-01-01
---

作为一个不算太闲的开发人员来说，每天都会花不少的时间来面对 VS Code。为了能让这段时光不那么单调，我时常会换着不同的 VS Code 的主题，希望能找到一些还不错的。值得一提的是，默认主题 Default Dark 还挺好看的，而 GitHub Theme 等官方主题也在个人榜单的第一梯度里。

不过除此之外的第三方主题，体验下来觉得它们往往或多或少存在一些个人不那么喜欢的点，让它不能被我主力使用。因此最近我尝试自制了一个主题 Moegi Theme，期望它能变成自己真正的主力。

或许比较主观，无法满足所有人的观感，但是如果各位能据此找到新的灵感，也着手做一套自己的主题，想必也十分美好了。

## 问题

在尝试各种主题的过程中，我发现主要有三种问题：

1. 被选中文字的颜色不够明显，经常不知道自己选中了哪里；

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/97908D56-99BD-4811-B861-52E06784F6F1/4F28753C-BBF2-48F0-A238-F03749595399_2/v2TCmUulVXlulEV3Z5pWpyvVDYcyCUoVZkITPgQu0JAz/Image.png)

2. 很多 Dark 主题背景色会偏蓝，如果开启了 Mac Native Tab 选项后，系统标题栏就与主题背景不太协调了；

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/97908D56-99BD-4811-B861-52E06784F6F1/DD781A15-4422-4C2D-B374-CA07A617841E_2/2DMKF13OSWj2SBrmUYaRIxvyHzWUKbkODUTMf3wcx84z/Image.png)

3. 界面比较倾向于扁平化，文件树区域和编辑区没有颜色差异，甚至没有分割线。感觉太过扁平的界面有点像在操作白板而不是操作软件。

![Twitter post - 3.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/97908D56-99BD-4811-B861-52E06784F6F1/D133E4CA-CB0E-46BA-9D9A-A616C256572A_2/UbxQlynGEPTckwkaQBEeO9IKdTKIgLlqFGzoZUtYOnsz/Twitter%20post%20-%203.png)

于是，Moegi Theme 的主要 Feature 就大概定下了：

- 为搜索和字符选中优化
- 纯朴的灰色系背景
- 没那么扁

## 从确定配色到上线

整个开发的流程不算复杂，跟着 [Creating a VS Code Theme](https://css-tricks.com/creating-a-vs-code-theme/) 这篇文章的步骤来走，基本上从工程创建，到最终提交到应用商店上线的流程都介绍出来了，甚至还涉及了配色方案、可访问性的知识，可以说是一篇非常不错的启蒙文章了。

### 主题色选定

Moegi Theme 的底色确定为无彩色偏向的灰色调，而其中会有若干处作为点缀的彩色元素作为主题色。受到比较喜欢的键帽配色 9009 灵感启发，于是选用了饱和度不高的红色+绿色。

![Image.tiff](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/97908D56-99BD-4811-B861-52E06784F6F1/DA438320-EB0A-412A-9175-D184793A137D_2/YINBteucYJNO2KOxh9i5yN3YfKbUtMcTn5rNRZwcroQz/Image.tiff)

（9009配色，图源互联网）

这两种颜色会点缀在界面的各个地方，比如光标颜色、按钮颜色、侧边栏的数字徽章、面板分割线的高亮颜色等。在 Light 主题中，这两种颜色还会用在诸如编辑区选中色等地方。

### 调色的两个部分

除了一些主题做了工程化、CI/CD 外，我感觉主题最重要的部分是调色了，而主题的颜色又分 UI 界面颜色、代码高亮颜色两个部分，它们都在一个 JSON 文件中定义。

UI 界面部分颜色的设定方式是标准的 K-V 对应关系，每一处颜色都有一个与之对应的颜色 key，只要在主题文件中指定 key 对应的色值即可。

```json
{
	"colors": {
		// Base Colors
		"focusBorder": "#ffffff3f",
		"foreground": "#999999",
		"disabledForeground": "#444444",
		"widget.shadow": "#00000033",
		"selection.background": "#444444",
		"sash.hoverBorder": "#ff8787",
	}
}
```

VS Code 给出了完整的文档 [Theme Color](https://code.visualstudio.com/api/references/theme-color)，列举出了所有的 key 值，非常实用。见过一些主题文件的 UI Key 部分是乱序的，这里我比较推荐严格按照文档的顺序去排列，必要时添加注释（VS Code 主题文件的格式与 `settings.json` 一致为 JSON with Comments，是允许添加注释的）。这样可以方便后期维护时，随时参考文档去修改。

至于代码高亮部分，其设定方式类似 CSS，是一种对批量作用域设定颜色的方式。代码的每一组成部分都具有多个 scope。scope 具有优先级的概念，如果对多个 scope 都指定了颜色，优先级更高的会作为最终颜色。

```json
{
	"scope": [
		"constant",
		"entity.name.constant",
		"variable.other.enummember"
	],
	"settings": {
		"foreground": "#e2a27c"
	}
}
```

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/97908D56-99BD-4811-B861-52E06784F6F1/848B52F6-B165-4DC5-B462-9CFEF7D6E18F_2/E7qijYLM74Cc5mKOjpqg36uOogQEDzW3osynGjA0F8Ez/Image.png)

官方似乎没有给具体 scope 值完整的文档，初期我是基于主题的初始模板做的修改，后续发现需要自行增删的部分较多。于是后来我换用了 [Github Theme](https://github.com/primer/github-vscode-theme) 作为模板完成了修改。

代码高亮的配色还是比较难的，直到现在也不能确定自己做了完美的选择。最初的想法是把两种主题色塞进去，但是不太喜欢在代码中使用红色（因为比较像报错），于是只使用了绿色并作为占比较高的字符串颜色；而红色被弱化为了粉色，被用在关键字上。其余的颜色部分，依次选用了黄色-变量颜色、紫色-操作符关键字、蓝色-类与方法、橙色-值。整体应用下来还是比较花哨的。

### Vitesse Theme 的融合

自认为 Moegi 的代码高亮风格还是偏向未来+华丽风的，对于喜欢清爽的 Coder 来说可能不是那么友好。正巧我一直比较喜欢 [Vitesse Theme](https://github.com/antfu/vscode-theme-vitesse) 的高亮风格，只是它的界面对我来说还是太扁了，于是就选用了这款主题做了融合，希望能符合简约党的偏好。

![Image.png](https://res.craft.do/user/full/bb2867d0-93e5-6d95-5ba7-773f4a201293/doc/97908D56-99BD-4811-B861-52E06784F6F1/5E3B41C9-EB24-407D-9C4F-E9C4195FD00C_2/1UpyNwwIbASAnJyx4HcQhaOHwswLo6IO9xqZACA7jgAz/Image.png)

## One More Thing

这次制作 Moegi Dark 的整个流程，我把它录成了视频，配合倍速播放还挺解压的，感兴趣的话欢迎前往：

[沉浸开发 VS Code 主题 Moegi [#1]_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1NR4y1X7de/?spm_id_from=333.999.0.0)

在评论区也收获了不少建议，呼声最高的是扩展 JetBrains 与 Neovim 平台。接下来除了完善这两个平台外，还有额外一些准备做的：

- 带颜色偏向的风格变体：偏蓝色的 Dark 主题、偏黄色的 Light 主题
- Mocochrome 风格变体：UI 界面和代码高亮大部分单色置灰处理、仅保留必要的关键字高亮，适合专注使用。

以上就是 Moegi Theme 这一主题的大致诞生过程了，非常感谢大家的喜欢和建议。

Repository: [https://github.com/moegi-design/vscode-theme](https://github.com/moegi-design/vscode-theme)

