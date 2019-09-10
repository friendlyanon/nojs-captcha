export const onReady = (fn: () => void, doc: Document = d) => {
  switch (String(doc.readyState).toLowerCase()) {
    case "interactive":
    case "complete":
      self.setTimeout(fn, 0);
      return;
  }
  on(doc, "DOMContentLoaded", fn, { once: true });
};
