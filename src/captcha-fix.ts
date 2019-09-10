import { Strings } from "./enums/index";
import { addCss } from "./util/add-css";
import { widgets } from "./widget";
import { frameMeta } from "./ui/index";

/* NoJS */

export const theme = () => {
  if (self.location.href.endsWith("theme=dark")) {
    addCss(Strings.darkTheme);
  }
};

const challengeCompleted = (el: Element) => {
  const data = [
    messageId,
    (el.firstElementChild as HTMLTextAreaElement).value,
  ];
  parent.postMessage(data, "*");
};

const regex = /\{([^}]+)\}/gu;
const setBoxesUp = () => {
  const root = $(".fbc-payload-imageselect") as HTMLElement;
  if (!root) {
    const container = $("body > .fbc");
    if (container && container.children.length === 5) {
      container.children[2].insertAdjacentText("beforeend", " Is your ad blocker set up correctly?");
    }
    return;
  }

  root.style.position = "relative";
  for (let i = 0; i < 9;) {
    const positions = {
      column: i / 3 | 0,
      row: i % 3 | 0,
    } as { [k: string]: number };
    const clazz = `fbc-imageselect-checkbox-${++i}`;
    const coords = Strings.labelStyle.replace(regex, (_, key) => String(positions[key] * 93));
    const box = $("." + clazz, root) as HTMLElement;
    box.setAttribute("id", clazz);
    box.insertAdjacentHTML("beforebegin", `<label for="${clazz}" style="${coords}"></label>`);
  }
};

export const ready = () => {
  const el = $(".fbc-verification-token");
  if (el != null) {
    challengeCompleted(el);
  } else {
    setBoxesUp();
  }
};

/* Parent */

const getSourceIframe = (source: MessageEventSource): HTMLIFrameElement | undefined => {
  for (const iframe of $$("iframe")) {
    if (iframe.contentWindow === source) {
      return iframe;
    }
  }
};

export const messageListener = (e: Event) => {
  const ev = e as MessageEvent;
  const data = ev.data as [string, string];
  if (!Array.isArray(data) || data[0] !== messageId) {
    return;
  }

  const source = getSourceIframe(ev.source as MessageEventSource) as HTMLIFrameElement;
  const widget = widgets.get(frameMeta.get(source)!.id);

  widget!.response = data[1];
};
