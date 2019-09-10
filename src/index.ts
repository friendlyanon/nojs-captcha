import { Strings } from "./enums/strings";
import { messageListener, ready, theme } from "./captcha-fix";
import { mock } from "./grecaptcha-mock";
import { defineProperty, get } from "./util/object";
import { garbageCollector } from "./widget";
import { onReady } from "./util/on-ready";

const detectCaptchaOptions = () => {
  const script = $("script[src*='" + Strings.captchaV2ApiUrl + "']");
  if (script == null) {
    return;
  }

  garbageCollector();
  on(self, "message", messageListener);

  const { search } = new URL(script.getAttribute("src") as string);
  const render = get(search.match(/render=([^&?]+)/i), 1, "onload");
  const onload = get(search.match(/onload=([^&?]+)/i), 1);

  if (render === "onload") {
    const el = $("div.g-recaptcha");
    if (el != null) {
      mock.render(el as HTMLElement);
    }
  }

  if (onload != null) {
    // @ts-ignore
    (0, self[onload])();
  }
};

if (/^(?:https?:)?\/\/(?:www\.)?google\.com\/recaptcha\/api\/fallback/ui.test(self.location.href)) {
  theme();
  onReady(ready);
} else {
  onReady(detectCaptchaOptions);

  const set = (_: any) => _;

  const proxified = Object
    .entries(mock)
    .reduce((o, { 0: key, 1: value }) => {
      defineProperty(o, key, {
        set,
        get: () => value,
        enumerable: true,
      });
      return o;
    }, {});

  defineProperty(self, "grecaptcha", {
    set,
    get: () => proxified,
    enumerable: true,
  });
}
