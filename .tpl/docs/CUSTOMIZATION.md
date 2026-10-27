# 修改指南

- 页面内容：`src/features/counsel/pages/PracticePages.tsx` 和 `content/articles.ts`，同时维护中英文。
- 导航和页脚：`src/features/counsel/components/Shell.tsx`；宿主参数定义在 `types.ts`。
- 颜色、字体、间距与响应式：`src/features/counsel/theme.css`。
- 图片：`public/templates/counsel/`；替换时更新 `docs/ASSETS.md` 和许可说明。
- 路由：`src/app/[[...slug]]/page.tsx` 与 `SitePage.tsx`。

修改后运行根目录 README 中的类型检查、lint 和构建，实际检查受影响页面与语言。
