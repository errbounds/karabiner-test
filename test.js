"use strict";
const keyList = [
  { input: "h", output: "left_arrow" },
  { input: "j", output: "down_arrow" },
  { input: "k", output: "up_arrow" },
  { input: "l", output: "right_arrow" },
  { input: "i", output: ["left_arrow", "left_command"] },
  { input: "o", output: ["right_arrow", "left_command"] },
  { input: "x", output: "delete_forward" },
];

const type = "basic";
function caspMode() {
  const from = { key_code: "caps_lock" };
  const to = [{ set_variable: { name: "caps_mode", value: 1 } }];
  const to_after_key_up = [{ set_variable: { name: "caps_mode", value: 0 } }];
  return { from, to, to_after_key_up, type };
}

function capsOptMode() {
  const conditions = [{ type: "variable_if", name: "caps_mode", value: 1 }];
  const from = { key_code: "q" };
  const to = [
    { set_variable: { name: "caps_mode", value: 0 } },
    { set_variable: { name: "caps_opt_mode", value: 1 } },
  ];
  const to_after_key_up = [
    { set_variable: { name: "caps_opt_mode", value: 0 } },
    { set_variable: { name: "caps_mode", value: 1 } },
  ];
}

function capsOptShfMode() {
  const condition = [{ type: "variable_if", name: "caps_opt_mode", value: 1 }];
  const from = { key_code: "w" };
  const to = [
    {set_variable: { name: "caps_mode"}}
  ]
}

function shortcutModes({ input, output }) {
  const conditions = [{ type: "variable_if", name: "caps_mode", value: 1 }];
  // const from = { key_code: input };
  const from =
    input instanceof Array
      ? {
          key_code: input[0],
          modifiers: { mandatory: [...input.slice(1, input.length)] },
        }
      : { key_code: input, modifiers: { optional: ["any"] } };
  const to =
    output instanceof Array
      ? [
          {
            key_code: output[0],
            modifiers: [...output.slice(1, output.length)],
          },
        ]
      : [{ key_code: output }];
  return { conditions, from, to, type };
}

const description = "description";
const manipulators = [caspMode(), ...keyList.map((key) => shortcutModes(key))];

const title = "title";
const rules = [{ description, manipulators }];

const data = JSON.stringify({ title, rules }, null, 4);

root.appendChild(document.createTextNode(data));
