import { PropsWithChildren } from "react"

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className=' text-foreground-overlay rounded-md w-full h-full gap-4 grid overflow-clip outline outline-[#fff2]'>
      <div className='row-span-full col-span-full bg-background-overlay backdrop-blur-lg opacity-40' />
      <div className='row-span-full col-span-full flex flex-col p-6 relative gap-4'>
        {children}
      </div>
    </div>
  )
}

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <h3>{children}</h3>
    </div>
  )
}

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
