import React, { type PropsWithChildren } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

type CodeProps = {
  language?: string
}

const Code: React.FC<PropsWithChildren<CodeProps>> = ({
  children,
  language
}) => {
  return (
    <Highlight
      theme={themes.shadesOfPurple}
      code={children?.toString() ?? ''}
      language={language ?? ''}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className='border-white rounded-md p-4 text-md' style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className='mr-2 opacity-40'>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export { Code }
