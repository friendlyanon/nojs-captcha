export const canSubmit = (el: HTMLElement): boolean => {
  switch (el.tagName) {
    case "BUTTON":
      return true;
    case "INPUT":
      break;
    default:
      return false;
  }

  switch ((el as HTMLInputElement).type) {
    case "submit":
    case "button":
      return true;
  }

  return false;
};
