# 架构

`src/app/[[...slug]]/page.tsx` 校验路径并调用 `src/features/counsel/SitePage.tsx`。`SitePage` 通过宿主上下文接收挂载路径与可选品牌配置，页面、公共导航、文章数据和主题分别位于 `pages/`、`components/`、`content/` 和 `theme.css`。运行素材放在 `public/templates/counsel/`。

项目无后端或持久化；演示表单不会发送或保存。当前页面和动效仍属开发版本，详见验证说明。
