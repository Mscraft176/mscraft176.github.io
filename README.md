# 个人主页框架

轻量的学术个人主页，使用原生 HTML、CSS 和 JavaScript，可以直接部署到 GitHub Pages。无需安装依赖、构建工具或购买服务器。

当前显示：个人简介、研究兴趣、四份笔记与联系邮箱。研究项目、论文、教育经历与最近动态在添加内容后自动显示。网页仅使用英文，支持手机菜单和简历 / 论文 PDF 链接。

## 预览

直接用浏览器打开 `index.html` 即可预览。也可以在这个目录启动本地服务器：

```sh
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。

## 填写内容

通常只需修改 `content.js`，保留现有格式即可。此文件带有中文注释和添加论文、笔记、教育经历的示例。

| 内容 | 在 `content.js` 中的位置 |
| --- | --- |
| 姓名、邮箱 | `profile` |
| 个人介绍 | `about` |
| About 中的研究兴趣 | `researchInterests` |
| 具体研究项目 | `research` |
| 论文和预印本 | `publications` |
| 笔记、项目和资源 | `notes` |
| 教育经历 | `education` |
| 最近动态 | `news` |
| GitHub、Scholar、ORCID 等链接 | `links` |
| 更新日期 | `lastUpdated` |

填写英文文本即可。正文按普通文本显示，不需填写 HTML。文件中的中文注释只供编辑时参考，不会出现在网页上。

把照片放进 `assets/`，设置 `profile.portrait` 为 `"./assets/photo.jpg"`。照片留空时使用默认 Hopf fibration 插图。

把简历放进 `files/`，设置 `profile.cv` 为 `"./files/cv.pdf"`。邮箱、简历及其他链接留空时，对应按钮自动隐藏。请先放入文件，再配置链接。

论文按数组顺序显示，可以自行按年份排序。添加多少个研究项目或笔记，页面都会自动生成相应条目；Research、Publications、Notes 列表为空时隐藏对应分区和导航，添加内容后自动显示。研究兴趣单独列在 About 中。

若要调整外观，修改 `assets/styles.css`。顶部 `:root` 集中了背景、文字、强调色与字体设置。

## 部署到 GitHub Pages

目标仓库：`Mscraft176/mscraft176.github.io`。目标网站：`https://mscraft176.github.io/`。

1. 在 GitHub 新建公开仓库，名称设为 **`你的用户名.github.io`**，例如 `alice.github.io`。使用实际 GitHub 用户名的小写形式。
2. 把**这个目录内的文件**上传到仓库根目录：根目录应该直接包含 `index.html`，不要把整个 `personal-homepage` 目录作为一层上传。
3. 仓库中打开 **Settings → Pages**。
4. 在 **Build and deployment → Source** 选择 **Deploy from a branch**。
5. 分支选择 **main**，目录选择 **/(root)**，点击 **Save**。
6. 发布完成后，页面会给出访问地址：`https://你的用户名.github.io/`。

保留 `.nojekyll` 可以让 GitHub 直接发布静态文件。若网页上传界面未包含隐藏文件，可以在 GitHub 的 **Add file → Create new file** 中创建名为 `.nojekyll` 的空文件。

如果使用普通仓库名称，例如 `personal-homepage`，站点地址为 `https://你的用户名.github.io/personal-homepage/`。所有网站资源均使用相对路径，两种方式都适用。

如果账号已有同名主页仓库，应先检查现有内容，再决定合并；不要直接覆盖已有网站。

后续只需在 GitHub 修改 `content.js` 并提交，Pages 会重新发布。

官方说明：[创建 GitHub Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 文件结构

```text
index.html          页面结构
content.js          需要填写的全部内容
assets/styles.css   页面样式
assets/site.js      内容渲染、手机菜单
assets/geometry.svg 默认插图
assets/favicon.svg  网站图标
files/              放置简历、论文与笔记 PDF
.nojekyll           GitHub Pages 静态发布标记
```

已填写 Panhuan Shi、南京大学大四本科生（2023–present）、三项研究兴趣、四份用户提供的 PDF 笔记及联系邮箱。没有预填论文或研究项目。网站不依赖外部字体、分析服务或内容库。
