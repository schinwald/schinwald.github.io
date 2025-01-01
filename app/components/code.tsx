import React, { type PropsWithChildren } from 'react'

type CodeProps = {}

const Code: React.FC<PropsWithChildren<CodeProps>> = ({
  children,
}) => {
  return (
    <div>
      <div className='bg-background-overlay p-4 rounded-t-md'></div>
      <div className='bg-background p-4 rounded-b-md'>
        <code>
          {children}
        </code>
      </div>
    </div>
  )
}

export { Code }
