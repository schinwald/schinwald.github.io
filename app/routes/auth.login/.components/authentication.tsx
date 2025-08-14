import type React from "react";
import {
  AiOutlineGithub as GitHubIcon,
  AiOutlineGoogle as GoogleIcon,
} from "react-icons/ai";
import { BorderRotating } from "~/components/border-rotating";
import { NavigationBar } from "~/components/navigation-bar";
import { Form } from "~/components/primitives/ui/form";

type AuthenticationProps = {
  className?: string;
};

const Authentication: React.FC<AuthenticationProps> = () => {
  return (
    <div className="w-screen h-screen text-foreground flex flex-col justify-center items-center">
      <NavigationBar />
      <div className="h-full w-full flex flex-col justify-center items-center gap-6">
        <div>
          <BorderRotating className="w-full gap-6">
            <h2 className="text-center">Login</h2>
            <div className="flex flex-row justify-center">
              <div className="text-center w-full max-w-[350px]">
                <p>
                  Authenticate with one of the providers below to ensure the
                  integrity of your testimonial.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Form.Root method="POST">
                <Form.Field>
                  <Form.Submit
                    intent="authenticateWithGoogle"
                    className="group flex flex-row items-center gap-1 w-full"
                    variant="outline"
                    click="squish-lightly"
                  >
                    <GoogleIcon className="group-hover:animate-wiggle" />
                    Google
                  </Form.Submit>
                  <Form.Submit
                    intent="authenticateWithGithub"
                    className="group flex flex-row items-center gap-1 w-full"
                    variant="outline"
                    click="squish-lightly"
                  >
                    <GitHubIcon className="group-hover:animate-wiggle" />
                    GitHub
                  </Form.Submit>
                </Form.Field>
              </Form.Root>
            </div>
          </BorderRotating>
        </div>
      </div>
    </div>
  );
};

export { Authentication };
