import { serverOnly$ } from 'vite-env-only/macros'

const dynamicImports = serverOnly$(async () => {
  const { loader } = await import('./loader')
  return { loader }
})

export const { loader } = (await dynamicImports?.()) ?? {}
