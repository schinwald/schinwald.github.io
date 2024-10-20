import { serverOnly$ } from 'vite-env-only/macros'

const importLoader = serverOnly$(async () => {
  const { loader } = await import('./loader')
  return loader
})

export const loader = importLoader?.()

export * from './meta';
export { default } from './page';
