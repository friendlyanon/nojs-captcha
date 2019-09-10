import { Html } from "../enums/html";
import { Widget, widgets } from "../widget";
import { hasOwn } from "../util/object";

export const frameMeta = new WeakMap<HTMLIFrameElement, { id: number }>();

let window: HTMLIFrameElement | undefined;

const close = () => {
  if (window) {
    window = window.remove() as undefined;
  }
};

const open = (id: number) => {
  if (window != null) {
    return;
  }
  d.body.insertAdjacentHTML("beforeend", Html.windowIframe);
  window = d.body.lastElementChild as HTMLIFrameElement;
  frameMeta.set(window, { id });
  const { parameters } = widgets.get(id) as Widget;
  const theme = hasOwn(parameters, "theme") && parameters.theme === "dark" ?
    "&theme=dark" :
    "";
  window.src += parameters.sitekey + theme;
};

export const execute = (id: number) => {
  close();
  open(id);
};

export const reset = (id: number) => {
  execute(id);
};

export const remove = (id: number) => {
  close();
};
