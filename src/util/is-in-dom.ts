export const isInDOM = (el: Node): boolean => {
  for (; ;) {
    const parent = el.parentNode;
    switch (parent) {
      case d:
        return true;
      case null:
        return false;
    }
    el = parent;
  }
};
