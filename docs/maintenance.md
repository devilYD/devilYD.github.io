# 维护指南

## 一、新增一篇文章

1. 在 Obsidian 里以 `template/博客模板.md` 为模板新建文件，保存到 `_posts/`；
2. 文件名用 `YYYY-MM-DD-标题.md`（日期补零，标题不带空格）；
3. 填写 front matter：

```yaml
---
layout: post
title: 标题
subtitle: 一句话摘要
date: 2026-10-25
author: YD
header-img: img/YD-homepage.jpg
catalog: true
tags:
  - 笔记
  - JAVA
---
```

4. 正文从一级标题开始写；代码块标注语言（```java、```xml），Prism 才能正确高亮；
5. 提交并推送，等 GitHub Pages 构建完成后访问线上地址确认。

> 标题里如果出现英文冒号（如 `Docker: 入门`），整行要用引号包住：`title: "Docker: 入门"`，否则 YAML 解析失败。

### 标签约定

标签区分大小写，同一个含义必须写法完全一致，否则会分裂成两个标签页。当前常用标签：

`笔记`、`JAVA`、`Spring`、`数据库`、`Maven`、`前端`、`C/C++`、`C++标准库`、`树莓派`、`DIY`、`折腾`、`致蛋蛋`、`一首小诗`、`编程相关`、`数据结构`、`网络`、`日常`、`docker`、`CSS`、`JavaScript`、`软件推荐`、`下载工具`、`开源`

建议后续统一：`JAVA` → `Java`、`docker` → `Docker`，并给只有 `笔记` 标签的文章补一个主题标签。改标签会影响标签页锚点，但不影响文章 URL 与评论。

## 二、Front matter 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `layout` | 是 | 固定 `post`；页面用 `page` |
| `title` | 是 | 标题；含 `:` 时必须加引号 |
| `subtitle` | 否 | 副标题 |
| `date` | 是 | 决定排序与 URL，格式 `YYYY-MM-DD`（补零） |
| `author` | 否 | 缺省显示站点标题；历史拼写 `auther` 已统一修正 |
| `header-img` | 否 | 封面图，如 `img/YD-penke.jpg`（不要写开头的 `/`） |
| `catalog` | 否 | `true` 显示右侧目录 |
| `tags` | 否 | YAML 列表；不写则文章不出现在标签页 |

## 三、本地预览

仓库没有提交 `Gemfile`，线上由 GitHub Pages 按其内置版本构建。本地预览有两种方式：

**方式 A：安装与 GitHub Pages 一致的 Ruby 环境（推荐，接近线上）**

```powershell
gem install github-pages
jekyll serve --watch
# 打开 http://127.0.0.1:4000
```

**方式 B：Docker（可选，适合不想在本机装 Ruby）**

```powershell
docker run --rm -it --volume "${PWD}:/srv/jekyll" --publish 4000:4000 `
  jekyll/jekyll jekyll serve --host 0.0.0.0 --watch
```

镜像默认可能已是 Jekyll 4；若启动时报 `gems` 配置或 `jekyll-paginate` 相关错误，改用 Jekyll 3.x 镜像，或先把 `_config.yml` 的 `gems:` 改成 `plugins:` 并在容器内安装分页插件。

注意：

- Jekyll 4 已把 `gems:` 键更名为 `plugins:`，旧写法会报警告甚至失效，所以本地尽量用 Jekyll 3.9 / `github-pages` gem；
- `_site/`、`.jekyll-cache/` 是构建产物，已被 `.gitignore` 忽略，不要提交；
- 只双击打开 `index.html` 看不到渲染结果，必须经过 Jekyll 构建。

## 四、发布与缓存

1. `git push origin main`；
2. 在 GitHub 仓库的 **Actions / Pages** 里看构建是否成功（本仓库没有自定义 workflow，走的是 Pages 内置构建）；
3. 线上地址：<https://devilyd.github.io>；
4. 样式或脚本改完没生效时：
   - 强制刷新（Ctrl+F5）；
   - 打开 DevTools → Application → Service Workers → Unregister，再刷新；
   - 或把 `sw.js` 里的 `const PRECACHE = 'precache-v1'` 改成新版本号。

## 五、评论（Gitalk）

- 评论实际存放在 `devilYD/devilYD.github.io` 的 GitHub Issues 中；
- 文章页 id 为 `md5(location.pathname)`，关于页固定为 `about`；
- **修改文章 URL（改 `date`、改文件名、加分类目录）会导致旧评论无法显示**；
- Gitalk 需要仓库开启 Issues，并保证 OAuth App 的回调地址覆盖站点域名。

## 六、已知问题与待办

### 已处理（2026-10-25 整理）

| 项目 | 处理 |
| --- | --- |
| 原有 66 篇文章和模板里的 `auther:` 拼写错误 | 统一改为 `author:`，文章页现在显示“Posted by YD”而不是站点名 |
| `about.html` 中 `distractionFreeMode: {site.gitalk...}` 少写一层大括号 | 改为 `{{ ... }}`，避免关于页 JS 语法错误导致评论区不加载 |
| `head.html` / `footer.html` 资源路径里的多余空格 | 清理为 `"/css/..."`、`"/js/..."` |
| `_config.yml` 的 `url` 为 `http://` | 改为 `https://devilyd.github.io` |
| `<html lang="en">` 与中文内容不符 | 改为 `zh-CN` |
| 缺少 `.gitignore` | 新增，忽略 `_site/`、缓存、`node_modules/`、Obsidian 工作区状态等 |
| `docs/` 会被当作静态文件发布 | 已加入 `_config.yml` 的 `exclude` |

### 建议后续处理

| 优先级 | 问题 | 说明 / 建议 |
| --- | --- | --- |
| 中 | 8 篇文章的文件名日期与 `date` 不一致 | 见下表。`date` 决定 URL，若改成与文件名一致会改变链接并使旧评论失联；确认后再改，或只改文件名 |
| 中 | 35 篇的 `date` 未补零（如 `2022-10-3`） | Jekyll 能解析，但排序与工具兼容性差；可统一为 `2022-10-03`（会改变 URL） |
| 中 | Google Analytics 仍是 `UA-90855596-1` | Universal Analytics 已于 2023 年停止处理数据，统计大概率失效；建议换 GA4 或删除 |
| 中 | Gitalk 的 `clientSecret` 明文写在公开仓库 | Gitalk 的常见做法，但 secret 暴露有被滥用风险；建议轮换 secret，必要时用 Cloudflare Worker 代理换取 token |
| 低 | `CNAME` 是 0 字节空文件 | 未配置自定义域名，建议删除以免误判；若绑定域名则填入域名 |
| 低 | `package.json` 仍是模板信息 | `name: by-blog`、`title: BY Blog`、预览脚本用 Python 2 的 `SimpleHTTPServer`；可改为本项目信息或直接删掉 Grunt 相关文件 |
| 低 | `.obsidian/workspace.json` 仍被 Git 跟踪 | 已加入 `.gitignore`，需要执行一次 `git rm --cached .obsidian/workspace.json` 才会停止跟踪 |
| 低 | 未引用资源 | `img/YD-darknight1.jpg` 未被引用；`js/jquery.js`、`js/bootstrap.js`、`js/hux-blog.js` 有压缩版在用，未压缩版可删 |
| 低 | Disqus 相关 Liquid 永远不会执行 | 模板判断 `site.disqus.enable`，而配置里只有注释掉的 `disqus_username`，属于模板残留，可清理 |
| 低 | `gems:` 配置键 | GitHub Pages 目前仍可使用；升级到 Jekyll 4 时需改为 `plugins:` |
| 低 | 同一日期多篇文章 | 如 2022-09-26 有 4 篇、2022-03-05 有 6 篇，排序由 Jekyll 决定，列表顺序可能不稳定；可在 front matter 加具体时间（`date: 2022-09-26 10:00:00`） |

### 文件名日期与 `date` 不一致的 8 篇

| 文件 | front matter `date` | 文件名日期 | 标题 |
| --- | --- | --- | --- |
| `2019-10-23-砂糖与香辛料.md` | 2019-8-13 | 2019-10-23 | 砂糖与香辛料 |
| `2019-11-6-无题.md` | 2019-8-13 | 2019-11-6 | 无题 |
| `2022-12-27-JAVA面试常见问题.md` | 2022-12-14 | 2022-12-27 | JAVA面试常见问题 |
| `2022-3-10-关于DNS(一).md` | 2022-3-5 | 2022-3-10 | 关于DNS(一) |
| `2022-3-8-数据结构笔记(树).md` | 2022-3-5 | 2022-3-8 | 数据结构笔记(树) |
| `2022-9-27-面向对象思想_JAVA.md` | 2022-9-26 | 2022-9-27 | 面向对象思想 |
| `2022-9-28-MySQL入门(一).md` | 2022-9-26 | 2022-9-28 | MySQL入门(一) |
| `2022-9-29-MySQL入门(二).md` | 2022-9-26 | 2022-9-29 | MySQL入门(二) |

## 七、仓库操作备忘

```powershell
# 查看改动
git status
git diff --stat

# 提交发布
git add -A
git commit -m "post: 文章标题"
git push origin main

# 停止跟踪 Obsidian 工作区状态（保留本地文件）
git rm --cached .obsidian/workspace.json

# 本地构建（安装 github-pages 后）
jekyll build          # 生成 _site/
jekyll serve --watch  # 本地预览 http://127.0.0.1:4000
```

提交信息目前多为 `更新: YYYY-MM-DD HH:mm:ss`，与 `.obsidian/plugins/obsidian-git/data.json` 中的 `commitMessage` 模板一致，说明日常是通过 Obsidian Git 插件提交的。建议之后用更有信息量的提交信息（如 `post: 新增 xxx`、`fix: 修正日期`），方便回溯。
