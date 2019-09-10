type EventHandler = { handleEvent(): void } | (() => void);

interface ReCaptchaMock extends ReCaptchaV2.ReCaptcha {
  ready(handler: EventListenerOrEventListenerObject): void
}
