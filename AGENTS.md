# MoBlog Agent 指南

本项目是基于 Astro + Fuwari 的静态博客，使用 pnpm。本文同时作为 Agent 工作约定和文章写作手册，不另设 `docs/writing.md`。用户明确要求的语言、风格和发布状态优先于这里的默认建议。

## 工作范围

- 写作默认只修改目标文章及其图片资源，不顺带调整主题、依赖、站点配置或其他文章。
- 保留用户已有的修改；未获明确要求，不执行提交、推送或部署。
- 项目当前使用 `.md` 文章，没有配置 MDX 或 Mermaid；不要为了写文章自动安装插件。
- 不把 `AGENTS.md`、写作手册或其他非文章 Markdown 放进 `src/content/posts/`，它们可能被识别为文章并因缺少 Frontmatter 导致构建失败。

## 1. 创建与组织文章

在项目根目录执行：

```bash
pnpm new-post my-post
```

这会创建 `src/content/posts/my-post.md`，已有同名文件时脚本会拒绝覆盖。使用简短、稳定的英文小写文件名，以连字符分词。不要选 `.mdx`：虽然创建脚本接受该后缀，但本站没有启用 MDX 集成。

- 一般文章地址为 `/posts/my-post/`；不要随意重命名已发布文件，以免旧链接失效。
- 新文章若未明确要求发布，默认先设 `draft: true`。创建脚本默认是 `false`，需要手动改为草稿。
- `pnpm dev` 可查看草稿；生产构建会排除草稿，首页、归档、RSS 和文章路由均不会收录它。
- 未来的 `published` 日期并不代表定时发布；当前代码只按 `draft` 过滤。
- 当前参考文章为 `src/content/posts/ubuntu-debian-change-mirror.md`，可参考结构，不必照搬其语气。

## 2. Frontmatter

文章开头使用 YAML，以下是可复制的模板；标题、日期和内容应按实际文章替换：

```yaml
---
title: '文章标题'
published: 2026-10-05
description: '简洁说明文章讨论什么，以及读者可以获得什么。'
image: ''
tags: [Linux, 教程]
category: 'Linux'
draft: true
lang: ''
---
```

| 字段 | 规则 |
| --- | --- |
| `title` | 必填字符串；正文通常不重复写同名一级标题。 |
| `published` | 必填日期，使用不加引号的 `YYYY-MM-DD`；新文章按实际日期填写，不直接沿用示例日期。 |
| `updated` | 可选日期，同样不加引号；已有文章实质更新时填写，保留原始 `published`。 |
| `description` | 可选摘要，建议填写；为空时列表卡片取正文首个段落，RSS 不使用这个回退。 |
| `image` | 可选封面路径；没有封面时留空，不写不存在的占位路径。 |
| `tags` | 字符串数组；优先复用已有标签，避免同义标签和大小写变体。 |
| `category` | 单个分类字符串，不是数组；优先复用已有分类。 |
| `draft` | 布尔值 `true` / `false`，不要写成字符串。 |
| `lang` | 默认留空，跟随 `src/config.ts` 的 `zh_CN`；仅在文章语言不同时填写，如 `en`。 |

完整字段以 `src/content/config.ts` 为准。`prevTitle`、`prevSlug`、`nextTitle`、`nextSlug` 为内部字段，不手工维护。包含冒号、引号等字符的 YAML 字符串需正确引用和转义。

## 3. 内容与结构

- 默认使用中文；遵循用户指定的读者、篇幅、语言和风格。
- 首段说明问题与适用范围，正文主要用 `##` 和 `###`，不跳级。当前目录显示从正文最浅标题开始的两层，通常对应这两级。
- 根据内容需要使用表格、列表和提示框，不为了展示功能堆砌样式。
- 技术教程注明适用系统、软件版本、前置条件和预期结果；危险操作说明风险、备份与恢复方法。
- 示例命令按目标读者的操作系统编写，不将 Agent 的 Windows 环境与教程目标环境混为一谈。
- 不编造作者经历、测试结果、性能数据或引用。区分已验证结论与未验证建议；版本敏感的信息优先查官方资料，并给出来源链接。
- 普通写作不执行文章中的安装、换源、删除或管理员命令；只有用户另行要求验证且确认环境合适时才执行。

## 4. Markdown 与扩展语法

支持标准 Markdown，以及 GFM 表格、任务列表和删除线。标题锚点、文内目录、字数、预计阅读时间与文章许可声明由主题生成，不手工重复维护。

### 代码块

围栏代码块标注正确语言；没有对应语言时使用 `text`。本站使用 Expressive Code，具备语法高亮、语言标签、复制按钮、行号和自动换行。可按需使用下列元信息：

````markdown
```js title="hello.js" {2}
const name = "MoBlog";
console.log(`Hello, ${name}!`);
```

```js title="change.js" del={1} ins={2}
const mode = "old";
const mode = "new";
```

```bash frame="terminal" title="安装依赖" showLineNumbers=false
pnpm install
```

```js collapse={1-2}
const name = "MoBlog";
const message = `Hello, ${name}!`;
console.log(message);
```
````

行号从代码内容第 1 行算起；`{2}` 表示高亮，`del={1}` / `ins={2}` 表示删除 / 新增标记，`collapse={1-2}` 表示折叠区段。折叠区段不会删除代码，复制按钮仍会复制完整内容。需要表现修改时可用 `diff` 代码块，不把增删标记混进供读者直接执行的命令。

### 提示框

支持 `note`、`tip`、`important`、`warning`、`caution`。使用三个冒号组成块，`[标题]` 可省略：

```markdown
:::tip[小提示]
这里可以写 **Markdown** 内容。
:::
```

也支持 GitHub 风格；多个正文行应继续添加引用前缀：

```markdown
> [!WARNING]
> 操作前请备份数据。
>
> 确认目标文件无误后再继续。
```

### 数学公式

使用 KaTeX，行内写 `$E = mc^2$`，独立公式用双美元符号：

```markdown
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

只使用 KaTeX 支持的命令，复杂公式需要预览确认。

### GitHub 仓库卡片

独占一行，使用两个冒号：

```markdown
::github{repo="mohen-ink/MoBlog"}
```

`repo` 格式为 `owner/repo`。组件会尝试获取真实仓库信息；可按需指定 `description`、`language`、`stars`、`forks`、`license`，但不能编造数据。网络失败时检查卡片实际效果，不以构建成功代替验证。已有实例在 `src/content/spec/about.md`。

### 图片与 HTML

- 可将资源放入 `src/content/posts/my-post/`，正文使用 `![说明文字](./my-post/example.png)`，封面使用 `image: './my-post/cover.jpg'`；路径相对于 `my-post.md`。
- 放在 `public/images/` 的图片通过 `/images/example.png` 引用，不把 `public/` 写进 URL。封面也支持完整的远程图片 URL。
- 正文图片写有意义的替代文本，注明需要的来源或授权；不要假设远程图片永久可用。正文与封面图片已接入点击放大，无需额外脚本。
- `.md` 可直接写原生 HTML，例如 `<details>` 折叠内容和 `<iframe>` 嵌入；这不代表支持 MDX 或任意组件。HTML 块中的 Markdown 不一定被解析，不确定时使用纯 HTML 并预览。
- 嵌入内容应有可访问的标题和普通链接作为补充；不要为文章添加不必要的脚本或外部跟踪。
- 未配置 Mermaid 或脚注扩展；不要默认它们会正常渲染。
- RSS 使用独立的 MarkdownIt 渲染并清洗 HTML，不会完整复现提示框、公式、仓库卡片等页面扩展；重要信息应同时以普通文字或链接表达。

## 5. 写作完成后的验证

1. 检查 Frontmatter、日期、发布状态、标题层级、图片路径、代码块闭合及来源链接。
2. 在项目根目录运行 `pnpm check` 和 `pnpm build`；构建包含 Pagefind 搜索索引。没有配置单独的测试命令，不为写作额外添加测试框架。
3. 使用 `pnpm dev`（默认 `http://localhost:4321`）打开目标文章。草稿必须用开发模式预览，不能只检查生产 `dist/`。已发布文章还可用 `pnpm preview` 查看构建结果。
4. 检查桌面 / 移动布局、目录跳转、代码复制与折叠、图片放大，以及文章实际使用的提示框、公式、仓库卡片和嵌入内容。
5. 移除临时验证文章或资源，确认差异只包含本次需要的内容。检查失败时说明具体错误与是否为已有问题；未完成的验证如实报告，不宣称已通过。

文档修改不必把示例发布为正式文章。若创建临时文章验证语法，验证后删除；生产验证须在清理后重新构建，避免临时文章残留在 `dist/`。

## 6. 参考与维护

- 中文入门与基础 Frontmatter：`docs/README.zh-CN.md`。
- 扩展语法入口：`README.md` 的 `Markdown Extended Syntax` 章节。
- 提示框与仓库卡片示例：https://fuwari.vercel.app/posts/markdown-extended/
- 代码块示例：https://fuwari.vercel.app/posts/expressive-code/
- Expressive Code 文档：https://expressive-code.com/
- 行高亮与增删标记：https://expressive-code.com/key-features/text-markers/
- 代码区段折叠：https://expressive-code.com/plugins/collapsible-sections/

字段、插件和渲染行为以当前项目代码为准，外部示例与中文 README 可能落后或不同。修改 `src/content/config.ts`、`astro.config.mjs`、文章创建脚本或草稿过滤逻辑后，同步更新本指南中的相关说明。
