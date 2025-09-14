import { useState } from "react";
import { ReCAPTCHA } from "react-google-recaptcha";
import { cn } from "~/utils/classname";

type BotCheckerProps = {
  googleReCAPTCHASiteKey: string;
};

export const BotChecker: React.FC<BotCheckerProps> = ({
  googleReCAPTCHASiteKey,
}) => {
  const [recaptchaResponse, setReCAPTCHAResponse] = useState<string>("");

  return (
    <div
      className={cn(
        "absolute left-0 top-0 right-0 bottom-0 bg-background-overlay flex justify-center items-center hidden",
      )}
    >
      <ReCAPTCHA
        sitekey={googleReCAPTCHASiteKey}
        onChange={(value) => {
          if (value) {
            setReCAPTCHAResponse(value);
          }
        }}
      />
      <input type="hidden" name="recaptchaResponse" value={recaptchaResponse} />
    </div>
  );
};
