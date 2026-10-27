# The Counsel

中英文咨询服务模板，共 12 个页面。包含服务介绍、关于、工作形式、文章列表及四篇全文、申请、联系和隐私页。

## 运行

固定 Node 24.16.0、pnpm 9.15.4。执行 `pnpm install --frozen-lockfile`，开发运行 `pnpm dev`；`pnpm build` 后 `pnpm start`。默认端口 43628，可用 PORT 指定；停止使用 Ctrl+C。构建与打包在本地 WSL Linux 文件系统执行。

## 检查与修改

`pnpm typecheck`、`pnpm lint`、`pnpm test`、`pnpm build`。包出口为 template、site、host；HostProvider 支持品牌、Logo、联系方式和页脚注入。页面和主题位于 src/features/counsel，修改映射见 .tpl/customization.json。

## 行为边界

表单仅在浏览器校验，不发送、不保存。没有后端、数据库或视频播放器。文字错峰、滚动入场、照片旋转、图标缩放、双向图廊、评价循环和菜单动画支持减少动态效果。字体按制作要求使用 MiSans/Poppins，因此排版与参考站衬线体有意不同。

素材来源见 docs/ASSETS.md；许可见 .tpl/docs/LICENSE.md。展示素材位于 .tpl/assets。
