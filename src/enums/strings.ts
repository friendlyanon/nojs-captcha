export const enum Strings {
  labelStyle = "top: {column}px; left: {row}px; width: 93px; height: 93px; position: absolute;",
  captchaV2ApiUrl = "/recaptcha/api.js",
  darkTheme = "\
body { \
  color: rgb(197, 200, 198); \
} \
div.fbc { \
  border: 1px solid black; \
  border-radius: 0; \
  background-color: #282a2e; \
} \
.fbc-button-reload, .fbc-button-audio { \
  filter: invert(1); \
} \
.fbc-payload-imageselect { \
  position: relative; \
} \
fbc-imageselect-payload { \
  position: relative; \
  z-index: 1; \
} \
.fbc-payload-imageselect > input { \
  z-index: 3; \
} \
.fbc-payload-imageselect > label { \
  position: absolute; \
  display: block; \
  height: 93px; \
  width: 93px; \
  z-index: 2; \
}",
}
