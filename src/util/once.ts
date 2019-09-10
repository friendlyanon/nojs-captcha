export const once = (fn: () => void): () => void => {
  let called = false;
  return () => {
    if (called) {
      return;
    }
    called = true;

    fn();
  };
};
