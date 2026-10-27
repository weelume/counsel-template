# The Counsel 模板

响应式咨询服务网站，使用 Next.js、React 和 TypeScript，包含中英文路由、服务介绍、文章、联系及演示申请表。表单只在浏览器本地校验，不发送或保存数据。当前为开发版本，视觉、动效和验收仍在完善。

固定工具链为 Node 24.16.0、pnpm 9.15.4。运行 `corepack pnpm install --frozen-lockfile` 后，可用 `corepack pnpm dev` 启动本地预览；`corepack pnpm typecheck`、`corepack pnpm lint` 和 `corepack pnpm build` 执行检查。默认地址为 `http://127.0.0.1:43628`，用 Ctrl+C 停止。

业务页面和内容位于 `src/features/counsel/`，页面入口为 `src/app/[[...slug]]/page.tsx`，素材及字体位于 `public/templates/counsel/`。修改前阅读 `.tpl/README.md`、`.tpl/template.json` 和 `.tpl/project.json`；素材来源见 `docs/ASSETS.md`。
