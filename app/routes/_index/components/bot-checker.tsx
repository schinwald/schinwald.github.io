import { useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";

type BotCheckerProps = {
  googleReCAPTCHASiteKey: string;
};

export const BotChecker: React.FC<BotCheckerProps> = ({
  googleReCAPTCHASiteKey,
}) => {
  const [recaptchaResponse, setReCAPTCHAResponse] = useState<string>("");

  return (
    <GoogleReCaptchaProvider reCaptchaKey={googleReCAPTCHASiteKey}>
      <GoogleReCaptcha onVerify={setReCAPTCHAResponse} />
      <input type="hidden" name="recaptchaResponse" value={recaptchaResponse} />
    </GoogleReCaptchaProvider>
  );
};
