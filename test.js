const path = "./test.txt";

const keyList = [
  { input: "q", output: "left_option" },
  { input: "w", output: "left_shift" },
  { input: "h", output: "left_arrow" },
  { input: "j", output: "down_arrow" },
  { input: "k", output: "up_arrow" },
  { input: "l", output: "right_arrow" },
  { input: "i", output: ["right_arrow", "left_command"] },
  { input: "o", output: ["left_arrow", "left_command"] },
];

const type = "basic";
function capsShortcutMode() {
  const from = { key_code: "caps_lock" };
  const to = [{ set_variable: { name: "caps_shortcut_mode", value: 1 } }];
  const to_after_key_up = [
    { set_variable: { name: "caps_shortcut_mode", value: 0 } },
  ];
  return { from, to, to_after_key_up, type };
}

function shortcutModes({ input, output }) {
  const conditions = [
    { type: "variable_if", name: "caps_shortcut_mode", value: 1 },
  ];
  const from = { key_code: input };
  const to =
    output instanceof Array
      ? [{ key_code: output[0], modifiers: [output[1]] }]
      : [{ key_code: output, modifiers: ["any"] }];
  return { conditions, from, to, type };
}

const description = "description";
const manipulators = [
  capsShortcutMode(),
  ...keyList.map((key) => shortcutModes(key)),
];

const title = "title";
const rules = [{ description, manipulators }];

const data = JSON.stringify({ title, rules }, null, 4);

root.appendChild(document.createTextNode(data));
