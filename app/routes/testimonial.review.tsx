import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { LoaderFunction, MetaFunction, json, redirect } from "@remix-run/node";
import { TestimonialEditor } from '../../test/src/pages/testimonial/review/_layouts/testimonial-editor';
import '~/styles/globals.css'
import { useLoaderData } from '@remix-run/react';
import { DatabaseManagementSystem } from '~/utils/database';

// async function extractSession() {
//   if (['development'].includes(import.meta.env.APP_ENVIRONMENT)) {
//     return {} as Record<string, any>
//   } else {
//     return await getSession(Astro.request);
//   }
// }

// const session = await extractSession()

// if (!session) {
//   return Astro.redirect('/sign-in?redirect=/testimonial/review')
// }

// const user = {
//   full_name: session.user?.name ?? undefined,
//   avatar: session.user?.image?.replace?.('=s96-c', '') ?? undefined
// }
// ---

export const meta: MetaFunction = () => {
  return [
    { title: "Review Me" },
    { name: "description", content: "" },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)

  const databaseManagementSystem = new DatabaseManagementSystem({ request })
  const { cookies, headers, supabaseClient } = databaseManagementSystem.initialize()

  // Grab session
  let session
  {
    const response = await databaseManagementSystem.getSession()

    if (response.errors) {
      return redirect(`/sign-in?redirect=${pathname}`)
    }

    session = response.data.session
  }

  console.log(session)

  return json({
    user: session.user
  })
}

export default function Page() {
  const data = useLoaderData()

  return (
    <div>
      <Navigation/>
      <section className='bg-background w-screen h-screen overflow-y-scroll overflow-x-hidden'>
        {/* <TestimonialEditor
          fullName={user.full_name}
          avatar={user.avatar}
        /> */}
        <BackgroundGradient/>
      </section>
    </div>
  )
}

