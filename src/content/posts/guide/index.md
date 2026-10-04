---
title: Fuwari 使用指南
published: 2024-04-01
description: "如何使用这个博客模板。"
image: "./cover.jpeg"
tags: ["Fuwari", "写作", "自定义"]
category: 指南
draft: false
---

> 封面图来源：[Source](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg)

这个博客模板基于 [Astro](https://astro.build/) 构建。对于本指南中没有提及的内容，你可以在 [Astro 官方文档](https://docs.astro.build/)中找到答案。

## 文章的 Front-matter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| 属性          | 说明                                                                                                                                                                         |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | 文章标题。                                                                                                                                                                   |
| `published`   | 文章发布日期。                                                                                                                                                               |
| `description` | 文章简介，显示在首页列表中。                                                                                                                                                 |
| `image`       | 文章封面图路径。<br/>1. 以 `http://` 或 `https://` 开头：使用网络图片<br/>2. 以 `/` 开头：对应 `public` 目录中的图片<br/>3. 无以上前缀：相对于当前 Markdown 文件的路径       |
| `tags`        | 文章标签。                                                                                                                                                                   |
| `category`    | 文章分类。                                                                                                                                                                   |
| `draft`       | 是否为草稿。草稿不会在列表中显示。                                                                                                                                           |

## 文章文件的存放位置

文章文件应放在 `src/content/posts/` 目录下。你也可以创建子目录来更好地组织文章和相关资源文件。

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```
