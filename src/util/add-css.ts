export const addCss = (css: string) => {
  const { head } = d;
  head.insertAdjacentHTML("beforeend", `<style type="text/css"></style>`);
  head.lastElementChild!.appendChild(new Text(css));
};
