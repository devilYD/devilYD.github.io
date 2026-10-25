# 项目结构说明

## 一、项目定位

这是一个托管在 GitHub Pages 上的**个人静态博客**，线上地址 <https://devilyd.github.io>。

- 站点名：`YD Blog`（余盾的博客），仓库 `devilYD/devilYD.github.io`
- 技术：Jekyll + Liquid 模板 + Markdown，由 GitHub Pages 自动构建
- 主题：基于 [qiubaiying/qiubaiying.github.io](https://github.com/qiubaiying/qiubaiying.github.io)（Hux Blog 主题）二次修改
- 内容：67 篇文章（2019–2026），以 Java / JavaWeb / Spring / SSM 学习笔记为主，另有 C++、树莓派、Docker、软件推荐和少量随笔
- 写作方式：用 Obsidian 直接打开仓库根目录作为 vault，新文章落在 `_posts/`，通过 Obsidian Git 插件提交并推送

## 二、技术栈

| 层次 | 使用的东西 | 说明 |
| --- | --- | --- |
| 站点生成 | Jekyll（GitHub Pages 内置版本） | `_config.yml` 配置，push 后自动构建 |
| 模板 | Liquid + HTML | `_layouts/` 提供骨架，`_includes/` 提供公共片段 |
| 正文 | Markdown（kramdown + GFM） | 支持表格、围栏代码块、任务列表等 |
| 代码高亮 | Rouge（Jekyll 内置）+ Prism.js | Prism 负责行号、复制按钮与更多语言 |
| 样式 | Bootstrap 3 + 自定义 Less/CSS | `less/` 是源码，`css/hux-blog*.css` 是编译产物 |
| 交互 | jQuery 1.x、Bootstrap JS、hux-blog.js | 导航、目录、标签云、返回顶部等 |
| 评论 | Gitalk（基于 GitHub Issues） | 配置在 `_config.yml` 的 `gitalk` 段 |
| 统计 | Google Analytics（UA）与百度统计 | 均在 `_includes/footer.html` 注入 |
| PWA | `pwa/manifest.json` + `sw.js` | 离线页 `offline.html`，Service Worker 预缓存 |
| 部署 | GitHub Pages（用户站点） | 仓库名即域名，`baseurl` 为空 |

## 三、目录树

```text
devilYD.github.io/
├── _config.yml              # 全站配置：标题、作者、分页、评论、统计、构建规则
├── _posts/                  # ★ 唯一内容源：67 篇 Markdown 文章
├── _layouts/                # 页面骨架（4 个）
│   ├── default.html         #   HTML 外壳：head + nav + content + footer
│   ├── page.html            #   普通页面：带页头、侧栏、标签云（首页/关于/标签页使用）
│   ├── post.html            #   文章页：封面、正文、目录、上下篇、Gitalk
│   └── keynote.html         #   幻灯片/iframe 页（当前未使用）
├── _includes/               # 可复用片段（3 个）
│   ├── head.html            #   <head>：SEO、CSS、Prism、PWA manifest
│   ├── nav.html             #   顶部导航（自动列出所有带 title 的页面）
│   └── footer.html          #   页脚、脚本、统计、Service Worker、目录生成
├── index.html               # 首页：分页文章列表（每页 10 篇）
├── about.html               # 关于页（中英切换 + Gitalk）
├── tags.html                # 标签云 + 按标签分组文章
├── 404.html                 # 404 页（permalink: /404.html）
├── offline.html             # 离线页（Service Worker 回退）
├── feed.xml                 # RSS 2.0 模板（当前 RSS 开关为 false）
├── css/                     # 已编译样式与第三方样式（7 个）
├── js/                      # 第三方库与主题脚本（13 个）
├── fonts/                   # Bootstrap Glyphicons 字体（5 个）
├── img/                     # 封面、头像、favicon 等图片（21 张）
├── less/                    # 主题 Less 源码（5 个，不参与 Jekyll 构建）
├── pwa/manifest.json        # PWA 应用清单
├── sw.js                    # Service Worker（根级注册，需放根目录）
├── template/博客模板.md      # Obsidian 新建文章的 front matter 模板
├── docs/                    # ★ 项目资料（本目录，已加入构建排除）
├── .obsidian/               # Obsidian vault 配置、主题、Obsidian Git 插件
├── Gruntfile.js             # Less → CSS 的编译任务（历史遗留）
├── package.json             # Grunt 依赖与旧预览脚本（历史遗留）
├── .gitignore               # 本次整理新增
├── .npmignore               # 模板遗留
├── codecov.yml              # 模板遗留，与本项目无关
├── CNAME                    # 空文件（未配置自定义域名）
├── LICENSE
└── README.md                # 项目入口说明
```

## 四、构建与访问流程

```text
Obsidian 编辑 _posts/*.md
        │  git commit / push (Obsidian Git)
        ▼
GitHub 仓库 main 分支
        │  GitHub Pages 检测到 push，调用 Jekyll 构建
        ▼
   _config.yml + _layouts + _includes + Markdown + 静态资源
        │  Liquid 渲染 → kramdown 转 HTML → Rouge 高亮
        ▼
      _site/（构建产物，不提交）
        │  发布到 devilyd.github.io
        ▼
浏览器：HTML + CSS/JS + Gitalk + Service Worker 缓存
```

本地没有 `Gemfile`、也没有 GitHub Actions 工作流，构建完全依赖 GitHub Pages 的默认环境。

### URL 规则

`_config.yml` 中 `permalink: pretty`，文章地址形如：

```text
/2022/10/12/JavaWeb简介/
```

- 年/月/日来自 **front matter 的 `date`**，不是文件名；
- 末段 slug 来自文件名去掉日期前缀后的部分，中文会被百分号编码；
- 因为没有使用 `categories`，文章放在 `_posts/` 子目录会改变 URL，**不要随意移动文章**；
- Gitalk 的评论 id 使用 `md5(location.pathname)`，改 URL 会导致旧评论“消失”（其实还留在 Issues 里，只是新地址找不到）。

### 页面继承关系

```text
default.html（html/head/body）
├── page.html   → index.html / about.html / tags.html / 404 / offline
├── post.html   → 所有 _posts 文章
└── keynote.html→ 预留的 iframe 展示布局
```

`post.html` 额外提供：封面图、标签、上下篇、右侧目录（`page.catalog`）、Gitalk；`footer.html` 负责生成目录条目并给代码块加行号。

## 五、内容模型

每篇文章以 YAML front matter 开头：

```yaml
---
layout: post
title: Jekyll 网页代码块美化
subtitle: 使用 prismjs 实现代码高亮、行号、复制按钮
date: 2026-03-08
author: YD
header-img: img/YD-penke.jpg
catalog: true
tags:
  - 笔记
  - CSS
  - JavaScript
  - 前端
---
```

| 字段 | 必填 | 作用 |
| --- | --- | --- |
| `layout` | 是 | 固定 `post` |
| `title` | 是 | 文章标题，同时用于 `<title>`、列表、标签页 |
| `subtitle` | 否 | 副标题，显示在标题下方 |
| `date` | 是 | 发布时间，决定排序与 URL |
| `author` | 否 | 文章署名；缺省显示站点标题（本次已把历史文章的 `auther` 拼写统一为 `author`） |
| `header-img` | 否 | 封面图，相对站点根目录；缺省用 `site.header-img` |
| `catalog` | 否 | `true` 时显示右侧标题目录 |
| `tags` | 否 | 标签数组，标签页与首页 FEATURED TAGS 依据它生成；同名标签需完全一致（区分大小写） |

命名约定：`YYYY-MM-DD-文章标题.md`，标题里避免空格；含括号、下划线可以正常工作。

## 六、静态资源与前端脚本

- **样式**：`less/` 是主题源码；`css/hux-blog.css` 与压缩版 `hux-blog.min.css` 同时存在，页面实际加载 `.min.css`。`css/syntax.css`（Rouge）与 `css/prism.css`、`css/copy.css` 都会被加载。改样式时改 Less 再编译，或直接改 CSS。
- **脚本**：`footer.html` 依次加载 jQuery、Bootstrap、`hux-blog.min.js`；`head.html` 加载 `prism.js`；标签页按需加载 `jquery.tagcloud.js`，文章目录按需加载 `jquery.nav.js`，Gitalk 用 `md5.min.js`。
- **图片**：统一放 `img/`，文章里写 `/img/xxx.jpg`；当前有 1 张未被引用（`YD-darknight1.jpg`）。
- **PWA**：`pwa/manifest.json` 定义图标与主题色；`sw.js` 在根目录注册，预缓存 `offline.html`，其余请求走 stale-while-revalidate 并用运行时缓存兜底。改版后如遇旧页面，可提升 `PRECACHE` 版本号或强制刷新。

## 七、写作与发布

1. 在 Obsidian 中用 `template/博客模板.md` 新建文章，存入 `_posts/`；
2. 按上表补全 front matter，选好 `tags`（尽量复用已有标签）；
3. 本地预览（可选，见 [维护指南](maintenance.md)）；
4. 提交并推送到 `main`，等待 GitHub Pages 构建（通常 1–2 分钟）；
5. 打开线上页面确认封面、代码块、目录与评论正常。

## 八、相关文档

- [文章索引](content-index.md)：67 篇文章按主题分类的完整清单
- [维护指南](maintenance.md)：front matter 规范、本地预览、常见问题与待办
- [资料导航](README.md)：本目录的阅读顺序
