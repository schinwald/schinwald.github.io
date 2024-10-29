import { PropsWithChildren } from "react"

export const Dictionary: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className='underline decoration-dashed decoration-tertiary italic cursor-help'>
      {children}
    </span>
  )
}
