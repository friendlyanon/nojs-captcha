import { Html } from "./enums/html";
import { hasOwn, isInDOM, once } from "./util/index";
import { execute, remove, reset } from "./ui/index";

const clients = new Map<HTMLElement, Widget>();
export const widgets = new Map<number, Widget>();

export const garbageCollector = once(() => {
  self.setInterval(() => {
    for (const { 0: key, 1: value } of clients) {
      if (!isInDOM(key)) {
        widgets.delete(value.id);
        clients.delete(key);
        remove(value.id);
      }
    }
  }, 1000);
});

const uniqueId = (i => () => i++)(0);

const getWidgetById = (id: number) => widgets.get(id);
const getFirstWidget = () =>
  widgets.values().next().value as (Widget | undefined);

export const getWidget = (widgetId?: number) => widgetId !== void 0 ?
  getWidgetById(widgetId) :
  getFirstWidget();

export class Widget {
  readonly id = uniqueId();
  private readonly _text: HTMLTextAreaElement;
  private readonly _iframe: HTMLIFrameElement;

  constructor(
    private readonly _target: HTMLElement,
    public readonly parameters: ReCaptchaV2.Parameters,
  ) {
    clients.set(_target, this);
    widgets.set(this.id, this);

    _target.innerHTML = Html.initHtml;
    this._text = $("textarea", _target) as HTMLTextAreaElement;
    this._iframe = $("iframe", _target) as HTMLIFrameElement;

    self.setTimeout(() => this._initIframe(), 100);
  }

  get invisible() {
    const params = this.parameters;
    return hasOwn(params, "size") && params.size === "invisible";
  }

  get response() {
    return this._text.value;
  }

  set response(response: string) {
    this._text.value = response;
    const button = $("button", this._iframe.contentDocument as Document);
    if (response) {
      remove(this.id);
      button!.className = "completed";
    } else {
      button!.removeAttribute("class");
      return;
    }

    if (!hasOwn(this.parameters, "callback")) {
      return;
    }

    try {
      const { callback } = this.parameters;
      if (typeof callback === "function") {
        callback(response);
      } else {
        // @ts-ignore
        (0, self[callback])(response);
      }
    } catch {
      // ignored
    }
  }

  execute() {
    execute(this.id);
  }

  reset() {
    this.response = "";
    reset(this.id);
  }

  private _initIframe() {
    const doc = this._iframe.contentDocument as Document;
    doc.head.innerHTML = Html.headHtml;
    doc.body.innerHTML = Html.bodyHtml;
    on($("button", doc) as HTMLElement, "click", e => this._clickHandler(e));
  }

  private _clickHandler(e: Event) {
    e.preventDefault();
    const ev = e as MouseEvent;
    const target = ev.target as HTMLButtonElement;
    if (target.hasAttribute("class")) {
      this.reset();
    } else {
      this.execute();
    }
  }
}
