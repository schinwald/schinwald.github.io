import { BackgroundGradient } from "~/components/background-gradient";
import * as Card from "~/components/card";
import { Container } from "~/layouts/container";
import { meta as actualMeta } from "./meta";
import { loader as actualLoader } from "./server/loader";

export const loader = await actualLoader;
export const meta = actualMeta;

export default function () {
  return (
    <div>
      <section className="flex h-screen w-screen flex-col items-center py-28 text-white">
        <Container variant="narrow">
          <h1>Style Guide</h1>
          <Card.Root>
            <Card.Content>
              <div className="h-6 border-y-2 border-y-primary/30" />
              <h1>Header 1</h1>
              <div className="h-6 border-y-2 border-y-primary/30" />
              <h2>Header 2</h2>
              <div className="h-6 border-y-2 border-y-primary/30" />
              <h3>Header 3</h3>
              <div className="h-6 border-y-2 border-y-primary/30" />
              <h4>Header 4</h4>
              <div className="h-6 border-y-2 border-y-primary/30" />
              <h5>Header 5</h5>
              <div className="h-6 border-y-2 border-y-primary/30" />
              <h6>Header 6</h6>
              <div className="h-6 border-y-2 border-y-primary/30" />
              <p>Paragraph</p>
              <div className="h-6 border-y-2 border-y-primary/30" />
            </Card.Content>
          </Card.Root>
        </Container>
        <BackgroundGradient />
      </section>
    </div>
  );
}
