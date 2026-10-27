# 架构

Next.js App Router 只负责入口。src/features/counsel 按 config、content、components、pages 分层；SitePage 选择页面，Shell 处理导航、菜单与页脚。HostProvider 提供可选宿主配置，独立运行使用自身品牌。theme.css 集中主题、字体与滚动条。routing.ts 处理语言与挂载点，不依赖外部服务。
