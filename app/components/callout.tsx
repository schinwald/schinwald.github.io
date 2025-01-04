import React, { type PropsWithChildren } from 'react'
import { match } from 'ts-pattern'
import { FaInfoCircle as InfoIcon } from "react-icons/fa";
import { FaBook as NoteIcon } from "react-icons/fa";
import { HiOutlineSparkles as TipIcon } from "react-icons/hi2";
import {
  FaExclamationCircle as DangerIcon,
  FaExclamationTriangle as WarningIcon,
} from "react-icons/fa";
import { cn } from '~/utils/classname';

type CalloutProps = {
  type: 'info' | 'note' | 'tip' | 'danger' | 'warning'
  title: string
  isCollapsable?: boolean
}

const Callout: React.FC<PropsWithChildren<CalloutProps>> = ({
  children,
  type,
  title,
}) => {
  return (
    <div className={cn('rounded-md bg-background-overlay bg-opacity-40 px-6 py-5 border-2 border-opacity-30', {
      'border-blue-300': type === 'info',
      'border-green-400': type === 'note',
      'border-purple-300': type === 'tip',
      'border-red-500 border-double border-4': type === 'danger',
      'border-yellow-300 border-dashed': type === 'warning',
    })}>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center gap-1'>
          {match(type)
            .with('info', () => <InfoIcon className='size-6 -my-1 p-[0.1rem] opacity-50 text-blue-300' />)
            .with('note', () => <NoteIcon className='size-6 -my-1 p-[0.2rem] opacity-50 text-green-400' />)
            .with('tip', () => <TipIcon className='size-6 -my-1 opacity-50 text-purple-300' />)
            .with('danger', () => <DangerIcon className='size-6 -my-1 p-[0.1rem] opacity-50 text-red-500' />)
            .with('warning', () => <WarningIcon className='size-6 -my-1 p-[0.1rem] opacity-50 text-yellow-300' />)
            .exhaustive()
          }
          <h5 className='drop-shadow-lg'>{title}</h5>
        </div>
        <p className='inline-flex gap-2 whitespace-pre-wrap'>{children}</p>
      </div>
    </div >
  )
}

export { Callout }
