/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_TITLE?: string
  readonly VITE_SITE_DESCRIPTION?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_AUTHOR?: string
  readonly VITE_TWITTER_HANDLE?: string
  readonly VITE_GITHUB_USERNAME?: string
  readonly VITE_GOOGLE_ANALYTICS_ID?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_DARK_MODE?: string
  readonly VITE_POSTS_PER_PAGE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  glob(pattern: string, options?: { as?: string; eager?: boolean }): Record<string, any>
}