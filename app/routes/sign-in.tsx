import { Navigation } from '~/components/navigation';
import { Authentication } from '~/components/authentication';
import { BackgroundGradient } from '~/components/background-gradient';
import { ActionFunction, MetaFunction } from "@remix-run/node";
import '~/styles/globals.css'

export const meta: MetaFunction = () => {
  return [
    { title: "Sign-in" },
    { name: "description", content: "" },
  ]
}

export const action: ActionFunction = ({ request }) => {
  return new Response()
}

export default function Page() {
  return (
    <div>
      <Navigation/>
      <section className='bg-background w-screen h-screen'>
        <Authentication/>
        <BackgroundGradient/>
      </section>
    </div>
  )
}
