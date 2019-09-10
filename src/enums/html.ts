export const enum Html {
  /* Target element */
  initHtml = "<div style=\"width: 304px; height: 78px;\"><div><iframe src=\"about:blank\" width=\"304\" height=\"78\" role=\"presentation\" frameborder=\"0\" scrolling=\"no\" style=\"display: block !important;\"></iframe></div><textarea name=\"g-recaptcha-response\" style=\"display: none;\"></textarea></div>",

  /* Iframe in target element */
  headHtml = "<meta charset=\"utf8\" /><style>* { margin: 0; padding: 0; border: 0; } button:not(.completed):before { content: \"Verify Captcha\"; } button.completed:before { content: \"Captcha verified\"; }</style>",
  bodyHtml = "<div style=\"width: 304px; height: 78px; display: grid;\"><button></button></div>",

  /* UI */
  windowIframe = "<iframe role=\"presentation\" scrolling=\"no\" style=\"width: 302px; height: 423px; position: fixed; top: 0; left: calc(50% - 151px); z-index: 9999;\" src=\"https://www.google.com/recaptcha/api/fallback?k=\" frameborder=\"0\"></iframe>",
}
