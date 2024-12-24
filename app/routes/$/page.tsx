import { BackgroundGradient } from '~/components/background-gradient';

export default function() {
  return (
    <main className='w-screen h-screen text-foreground flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <h2>Page Not Found</h2>
        <p>Are you lost?</p>
      </div>
      <BackgroundGradient />
    </main>
  )
}
