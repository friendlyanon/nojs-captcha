const { assign, defineProperty, prototype: { hasOwnProperty: has } } = Object;

export { assign, defineProperty };

export const hasOwn = (obj: object, key: PropertyKey): boolean =>
  has.call(obj, key);

function get<TObject extends object, TKey extends keyof TObject, TDefault = null>(
  object: TObject | null | undefined,
  key: TKey,
  defaultValue?: TDefault,
): Exclude<TObject[TKey], null | undefined> | Exclude<TDefault, undefined>;

// @ts-ignore
function get(object, key, defaultValue = null) {
  return object == null ? defaultValue : object[key];
}

export { get };
