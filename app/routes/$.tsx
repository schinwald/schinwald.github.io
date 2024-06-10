import type { MetaFunction } from "@remix-run/node";
import { BackgroundGradient } from '~/components/background-gradient';

export const meta: MetaFunction = () => {
  return [
    { title: "Page Not Found" },
    { name: "description", content: "" },
  ];
};

export default function Page() {
  return (
    <main className='w-screen h-screen bg-background text-foreground flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <h2>Page Not Found</h2>
        <p>Are you lost?</p>
      </div>
      <BackgroundGradient />
    </main>
  )
}
