import { assign, canSubmit } from "./util/index";
import { getWidget, Widget } from "./widget";
import { Errors } from "./enums/errors";

const insertDivBefore = (el: HTMLElement) =>
  el.parentNode!.insertBefore(d.createElement("div"), el);

export const mock = {
  render(
    container: string | HTMLElement,
    parameters: ReCaptchaV2.Parameters = {},
    inherit: boolean = true,
  ): number {
    const target = typeof container === "string" ?
      d.getElementById(container) :
      container;

    if (target == null) {
      throw new Error(Errors.invalidContainer);
    }

    if (inherit) {
      parameters = assign({}, target.dataset, parameters);
    }

    return new Widget(canSubmit(target) ? insertDivBefore(target) : target, parameters).id;
  },

  execute(widgetId?: number): void {
    const widget = getWidget(widgetId);

    if (widget != null && widget.invisible) {
      widget.execute();
    }
  },

  reset(widgetId?: number): void {
    const widget = getWidget(widgetId);

    if (widget != null) {
      widget.reset();
    }
  },

  getResponse(widgetId?: number): string {
    const widget = getWidget(widgetId);

    if (widget != null) {
      return widget.response;
    }

    throw new Error(Errors.invalidId + widgetId);
  },

  ready(handler: EventHandler): number {
    if (typeof handler !== "function") {
      handler = (h => () => h.handleEvent())(handler);
    }

    return self.setTimeout(handler, 0);
  },
} as ReCaptchaMock;
