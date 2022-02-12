const fs = require("fs");

const conditionLock = [
  { name: "caps_lock_pressed", value: 1, type: "variable_if" },
];
function getCapsMode() {
  return {
    from: { key_code: "caps_lock", modifiers: { optional: ["any"] } },
    to: [{ set_variable: { name: "caps_lock_pressed", value: 1 } }],
    to_after_key_up: [
      { set_variable: { name: "caps_lock_pressed", value: 0 } },
    ],
    type: "basic",
  };
}

const arrowKeys = [
  { from: "h", to: "left_arrow" },
  { from: "j", to: "down_arrow" },
  { from: "k", to: "up_arrow" },
  { from: "l", to: "right_arrow" },
];
function getCapsArrowKey({ from, to }) {
  return {
    conditions: conditionLock,
    from: { key_code: from, modifiers: { optional: ["any"] } },
    to: [{ key_code: to }],
    type: "basic",
  };
}

const lineKeys = [
  { from: "i", to: ["left_arrow", "left_command"] },
  { from: "o", to: ["right_arrow", "left_command"] },
];
function getCapsLineKey({ from, to }) {
  return {
    conditions: conditionLock,
    from: { key_code: from, modifiers: { optional: ["any"] } },
    to: [{ key_code: to[0], modifiers: to.filter((item, index) => index > 0) }],
    type: "basic",
  };
}

function getCapsOption() {
  return {
    conditions: conditionLock,
    from: { key_code: "q", modifiers: { optional: ["any"] } },
    to: [{ key_code: "left_option" }],
    type: "basic",
  };
}

function getCapsShift() {
  return {
    conditions: conditionLock,
    from: { key_code: "w", modifiers: { optional: ["any"] } },
    to: [{ key_code: "left_shift" }],
    type: "basic",
  };
}

function getCapsDelete() {
  return {
    conditions: conditionLock,
    from: { key_code: "x", modifiers: { optional: ["any"] } },
    to: [{ key_code: "delete_forward" }],
    type: "basic",
  };
}

const shortcutKeys = [
  "semicolon",
  "1",
  "2",
  "3",
  "4",
  "a",
  "s",
  "d",
  "f",
  "e",
  "r",
  "c",
  "v",
  "spacebar",
  "tab",
];
function getCapsShortcutKey(from) {
  return {
    conditions: conditionLock,
    from: { key_code: from },
    to: [
      {
        key_code: from,
        modifiers: [
          "left_option",
          "left_shift",
          "left_control",
          "left_command",
        ],
      },
    ],
    type: "basic",
  };
}

const title = "CapsLock Enhancement 1";
const rules = [
  {
    description: "capslock + hjkl to arrow",
    manipulators: [
      getCapsMode(),
      getCapsOption(),
      getCapsShift(),
      getCapsDelete(),
      ...lineKeys.map((key) => getCapsLineKey(key)),
      ...arrowKeys.map((key) => getCapsArrowKey(key)),
    ],
  },
  {
    description: "capslock + shortcutKey to hyper + shortcutKey",
    manipulators: [...shortcutKeys.map((key) => getCapsShortcutKey(key))],
  },
];

const data = JSON.stringify({ title, rules }, null, 4);

fs.writeFileSync("./karabiner.json", data);
