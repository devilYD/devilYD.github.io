# 项目资料导航

本目录是 2026-10-25 对仓库做的一次系统整理，目的是让项目结构、内容资产和维护方式都有据可查。所有文档均为 Markdown，`docs/` 已加入 `_config.yml` 的 `exclude`，不会发布到线上站点。

## 阅读顺序

| 文档 | 内容 | 适合什么时候看 |
| --- | --- | --- |
| [项目结构说明](project-structure.md) | 技术栈、目录职责、页面继承、URL 规则、资源组织、构建发布流程 | 第一次接手或想改主题时 |
| [文章索引](content-index.md) | 66 篇文章按 10 个主题分类，含日期、标签、文件名 | 找旧文章、规划学习路线时 |
| [维护指南](maintenance.md) | 写作流程、front matter 规范、本地预览、缓存、已知问题与待办 | 新增文章、排查问题时 |

## 一页结论

- **项目性质**：Jekyll 静态博客，GitHub Pages 从 `main` 分支自动构建，仓库名即域名（用户站点，`baseurl` 为空）。
- **内容规模**：66 篇，2019 年 4 篇、2022 年 59 篇、2023 年 2 篇、2026 年 1 篇；主体是 2022 年下半年的 Java 全栈学习笔记（JavaWeb → MySQL → Maven → Spring/SSM → SpringBoot）。
- **写作入口**：Obsidian 打开仓库根目录，模板 `template/博客模板.md`，新文件放 `_posts/`，Obsidian Git 提交。
- **主题结构**：`default` → `page` / `post` / `keynote`，公共片段在 `_includes`；首页分页 10 篇。
- **样式来源**：`less/` 编译为 `css/hux-blog*.css`；页面实际加载压缩版。CSS/JS 已编译并提交，GitHub Pages 构建时不需要额外的前端构建步骤。
- **评论**：Gitalk，评论存在本仓库 Issues；文章 id 由 URL 的 md5 生成，**改 URL 会丢评论入口**。

## 本次整理做了什么

已修正：

- 66 篇文章 + 模板的 `auther:` → `author:`（此前文章页署名错误地显示为 “YD Blog”）；
- `about.html` 中 Gitalk 配置少一层大括号导致的 JS 语法错误；
- `head.html` / `footer.html` 资源路径的多余空格；
- `_config.yml`：`url` 改为 https，`docs` 加入构建排除；
- `<html lang="en">` → `zh-CN`；
- 新增 `.gitignore`（`_site/`、缓存、`node_modules/`、Obsidian 工作区状态）；
- 新增本目录 4 份文档，重写根目录 `README.md`。

未自动改动、需要你决定的：

- 8 篇文章文件名日期与 `date` 不一致（改则 URL 变化）；
- 35 篇日期未补零；
- GA 仍是已停用的 UA 属性；
- Gitalk `clientSecret` 明文暴露；
- 空的 `CNAME`、模板遗留的 `package.json` / `Gruntfile.js` / `codecov.yml`；
- 标签写法不统一（`JAVA` / `Java`、`docker` / `Docker`）。

详见 [维护指南](maintenance.md) 的“已知问题与待办”。

## 仓库速览

| 目录/文件 | 数量 | 说明 |
| --- | ---: | --- |
| `_posts/` | 66 | 文章 Markdown，唯一内容源 |
| `_layouts/` | 4 | default / page / post / keynote |
| `_includes/` | 3 | head / nav / footer |
| `img/` | 21 | 封面、头像、图标（2 张未引用） |
| `css/` | 7 | Bootstrap、主题（含压缩版）、Prism、Rouge |
| `js/` | 13 | jQuery、Bootstrap、主题脚本、Prism、Gitalk 依赖 |
| `less/` | 5 | 主题样式源码 |
| `fonts/` | 5 | Glyphicons 字体 |
| `.obsidian/` | 15 | Obsidian 配置、ITS 主题、Obsidian Git 插件 |

## 文档维护

- 新增文章后，在 [文章索引](content-index.md) 对应分类补一行；
- 调整目录结构、构建方式或配置项后，同步更新 [项目结构说明](project-structure.md)；
- 处理完待办后，从 [维护指南](maintenance.md) 的表格中移除或标记。
