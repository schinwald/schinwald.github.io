import { useLoaderData } from "react-router";
import { BackgroundGradient } from "~/components/background-gradient";
import { NavigationBar } from "~/components/navigation-bar";
import { Newsletter } from "~/components/newsletter";
import { Container } from "~/layouts/container";
import { AllArticles } from "./components/all-articles";
import { meta as actualMeta } from "./meta";
import { validators } from "./schemas/actions/subscribe-to-newsletter";
import { action as actualAction } from "./server/actions";
import type { Loader } from "./server/loader";
import { loader as actualLoader } from "./server/loader";

export const loader = await actualLoader;
export const action = await actualAction;
export const meta = actualMeta;

export default function () {
  const { newsletterSubscriber } = useLoaderData<Loader>();

  return (
    <div>
      <section className="h-screen w-screen">
        <div className="relative flex w-screen flex-col items-center justify-center gap-20 overflow-hidden pb-32 text-foreground">
          <NavigationBar />
          <AllArticles />
          <Container variant="narrow">
            <Newsletter
              validators={validators}
              isSubscribed={Boolean(newsletterSubscriber)}
            />
          </Container>
        </div>
        <BackgroundGradient />
      </section>
    </div>
  );
}
