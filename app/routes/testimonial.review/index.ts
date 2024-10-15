import { serverOnly$ } from 'vite-env-only/macros'

const dynamicImports = serverOnly$(async () => {
  const { action } = await import('./actions')
  const { loader } = await import('./loader')
  return { action, loader }
})

export const { action, loader } = (await dynamicImports?.()) ?? {}

export * from './meta';
export { default } from './page';
