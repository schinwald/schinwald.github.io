import { serverOnly$ } from 'vite-env-only/macros'

const dynamicImports = serverOnly$(async () => {
  const { action } = await import('./actions')
  return { action }
})

export const { action } = (await dynamicImports?.()) ?? {}
