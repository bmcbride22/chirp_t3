import { type PropsWithChildren } from 'react'

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className='flex justify-center'>
      <div className=' h-full min-h-screen w-full overflow-y-scroll border-x border-slate-400 md:max-w-3xl'>
        {props.children}
      </div>
    </main>
  )
}
