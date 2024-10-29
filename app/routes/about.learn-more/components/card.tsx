import { PropsWithChildren } from "react"

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md flex flex-col w-full h-full gap-4'>
      {children}
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

// export const Root: React.FC = () => {
//   return (
//     <div className='border border-[#fff3] p-3 rounded-sm flex flex-row items-start gap-2 max-h-[58px] overflow-hidden'>
//       <div className='flex flex-col gap-4'>
//         <div className='flex flex-col justify-between h-8 py-[2px]'>
//           <h6 className='text-md'>University of Guelph</h6>
//           <p className='font-thin text-sm'>Bachelor of Computing</p>
//         </div>
//         <div className='flex flex-col justify-between h-8'>
//           <h6 className='text-md'>2017 - 2021</h6>
//           <p className='font-thin text-sm'>Guelph, ON</p>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export const Image: React.FC = () => {
//   return <img className='w-8' src={education.universityOfGuelphLogo.url} alt={education.universityOfGuelphLogo.alt} />
// }
//
// export const Detail: React.FC = () => {
//
// }
