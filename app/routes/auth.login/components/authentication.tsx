import { motion } from "framer-motion";
import React from "react";
import {
  AiOutlineGithub as GitHubIcon,
  AiOutlineGoogle as GoogleIcon,
} from "react-icons/ai";
import { BorderRotating } from "~/components/border-rotating";
import { NavigationBar } from "~/components/navigation-bar";
import { Form } from "~/components/primitives/ui/form";

const ButtonContext = React.createContext<{ isHovered: boolean } | null>(null);

const useButtonContext = () => {
  const context = React.useContext(ButtonContext);
  if (!context) {
    throw new Error(
      "useButtonContext must be used within a ButtonContext.Provider",
    );
  }
  return context;
};

type ButtonTextProps = {
  original: React.ReactNode;
  alternate: React.ReactNode;
};

const ButtonText: React.FC<ButtonTextProps> = ({ original, alternate }) => {
  const context = useButtonContext();
  const isHovered = context?.isHovered ?? false;

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="relative flex w-full flex-row items-center justify-center"
        animate={isHovered ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        {original}
      </motion.div>
      <motion.div
        className="absolute inset-0 flex flex-row items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        {alternate}
      </motion.div>
    </div>
  );
};

type AuthenticationProps = {
  className?: string;
};

const Authentication: React.FC<AuthenticationProps> = () => {
  const [googleHovered, setGoogleHovered] = React.useState(false);
  const [githubHovered, setGithubHovered] = React.useState(false);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-foreground">
      <NavigationBar />
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <div>
          <BorderRotating className="w-full gap-6">
            <h2 className="text-center">Login</h2>
            <div className="flex flex-row justify-center">
              <div className="w-full max-w-[350px] text-center">
                <p>
                  Authenticate with one of the providers below to ensure the
                  integrity of your testimonial.
                </p>
              </div>
            </div>
            <Form.Root
              method="POST"
              className="flex flex-col items-center gap-3"
            >
              <Form.Field className="w-[200px]">
                <ButtonContext.Provider value={{ isHovered: googleHovered }}>
                  <Form.Submit
                    intent="authenticateWithGoogle"
                    className="group flex w-full flex-row items-center gap-1 hover:bg-primary hover:border-primary"
                    variant="outline"
                    click="squish-lightly"
                    onMouseEnter={() => setGoogleHovered(true)}
                    onMouseLeave={() => setGoogleHovered(false)}
                  >
                    <ButtonText
                      original={
                        <div className="flex flex-row items-center gap-1">
                          <GoogleIcon className="group-hover:animate-wiggle" />
                          Google
                        </div>
                      }
                      alternate={
                        <div className="flex flex-row items-center gap-1">
                          <GoogleIcon className="group-hover:animate-wiggle" />
                          Connect
                        </div>
                      }
                    />
                  </Form.Submit>
                </ButtonContext.Provider>
              </Form.Field>
              <Form.Field className="w-[200px]">
                <ButtonContext.Provider value={{ isHovered: githubHovered }}>
                  <Form.Submit
                    intent="authenticateWithGithub"
                    className="group flex w-full flex-row items-center gap-1 hover:bg-primary hover:border-primary"
                    variant="outline"
                    click="squish-lightly"
                    onMouseEnter={() => setGithubHovered(true)}
                    onMouseLeave={() => setGithubHovered(false)}
                  >
                    <ButtonText
                      original={
                        <div className="flex flex-row items-center gap-1">
                          <GitHubIcon className="group-hover:animate-wiggle" />
                          GitHub
                        </div>
                      }
                      alternate={
                        <div className="flex flex-row items-center gap-1">
                          <GitHubIcon className="group-hover:animate-wiggle" />
                          Connect
                        </div>
                      }
                    />
                  </Form.Submit>
                </ButtonContext.Provider>
              </Form.Field>
            </Form.Root>
          </BorderRotating>
        </div>
      </div>
    </div>
  );
};

export { Authentication };
