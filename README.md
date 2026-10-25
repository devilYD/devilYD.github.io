# YD Blog

余盾的个人博客，基于 Jekyll 与 GitHub Pages 构建，主要存放 Java / JavaWeb / Spring 学习笔记、C++ 与工具类笔记，以及少量随笔。

线上地址：<https://devilyd.github.io>

## 技术栈

Jekyll + Liquid + Markdown（kramdown / GFM），Bootstrap 3 + 自定义 Less 主题，Rouge + Prism.js 代码高亮，Gitalk 评论，PWA 离线支持。主题改自 [qiubaiying](https://github.com/qiubaiying/qiubaiying.github.io) 的 Hux Blog。

## 目录

```text
_posts/      文章（67 篇，唯一内容源）
_layouts/    页面骨架：default / page / post / keynote
_includes/   head / nav / footer
img/ css/ js/ fonts/   静态资源
less/        主题 Less 源码
template/    Obsidian 文章模板
docs/        项目文档（不参与构建）
```

## 写一篇新文章

1. 复制 `template/博客模板.md` 到 `_posts/`，命名为 `YYYY-MM-DD-标题.md`；
2. 填写 `title`、`date`、`subtitle`、`header-img`、`tags`（`layout: post` 保持不变）；
3. 提交并推送到 `main`，GitHub Pages 会自动构建发布。

Front matter 字段、标签规范和常见问题见 [维护指南](docs/maintenance.md)。

## 本地预览

```powershell
gem install github-pages
jekyll serve --watch   # http://127.0.0.1:4000
```

## 项目文档

- [资料导航](docs/README.md)
- [项目结构说明](docs/project-structure.md)
- [文章索引](docs/content-index.md)
- [维护指南](docs/maintenance.md)

## 致谢

- 主题与教程：[qiubaiying/qiubaiying.github.io](https://github.com/qiubaiying/qiubaiying.github.io)、[Hux Blog](https://github.com/Huxpro/huxpro.github.io)
- 评论组件：[Gitalk](https://github.com/gitalk/gitalk)
- 建站方案：[GitHub Pages](https://pages.github.com/)、[Jekyll](https://jekyllrb.com/)

站内图片来自网络，如有侵权请联系署名或删除。
