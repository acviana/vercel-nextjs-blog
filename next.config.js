import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
  readingTime: true,
  latex: true
})
 
export default withNextra({
  reactStrictMode: true,
  cleanDistDir: true
})
 
// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
