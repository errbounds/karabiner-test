const fs = require("fs");
const maniType = "basic";
const condiType = "variable_if";

const modifierMode = [
  { name: "caps_opt_mode", from: "q", to: "left_option" },
  { name: "caps_shift_mode", from: "w", to: "left_shift" },
];

const arrowKeys = [
  { from: "h", to: "left_arrow" },
  { from: "j", to: "down_arrow" },
  { from: "k", to: "up_arrow" },
  { from: "l", to: "right_arrow" },
];
const fnKeys = [
  { from: "x", to: ["delete_forward"] },
  { from: "i", to: ["left_arrow", "left_command"] },
  { from: "o", to: ["right_arrow", "right_command"] },
];

// caps_mode
function getCapsMode() {
  return {
    from: { key_code: "caps_lock" },
    to: [{ set_variable: { name: "caps_mode", value: 1 } }],
    to_after_key_up: [{ set_variable: { name: "caps_mode", value: 0 } }],
    type: maniType,
  };
}

// caps_opt_mode, caps_shift_mode
function getModifierMode({ name, from }) {
  return {
    conditions: [{ name: "caps_mode", value: 1, type: condiType }],
    from: { key_code: from },
    to: [
      { set_variable: { name: name, value: 1 } },
      { set_variable: { name: "caps_mode", value: 0 } },
    ],
    to_after_key_up: [
      { set_variable: { name: name, value: 0 } },
      { set_variable: { name: "caps_mode", value: 1 } },
    ],
    type: maniType,
  };
}

// [caps/caps_opt/caps_shift]
// [[100], [101], [110], [111]]
const stat = [0, 1];
function getArrowModeConditions(modifierMode) {
  const conditionsList = [];
  for (let i = 0; i < stat.length; i++) {
    const line = [];
    for (let j = 0; j < stat.length; j++) {
      conditionsList.push({
        conditions: [
          { name: "caps_mode", value: 1, type: condiType },
          { name: modifierMode[0].name, value: stat[i], type: condiType },
          { name: modifierMode[1].name, value: stat[j], type: condiType },
        ],
        to: [
          stat[i] ? modifierMode[0].to : null,
          stat[j] ? modifierMode[1].to : null,
        ].filter((item) => item != null),
      });
    }
  }
  return conditionsList;
}
const arrowModeConditions = getArrowModeConditions(modifierMode);

// [100, 101, 110, 111] * [h, j, k, l] -> 12
function getArrowModeKeys(arrowMode, arrowKey) {
  return {
    conditions: arrowMode.conditions,
    from: { key_code: arrowKey.from },
    to: [{ key_code: arrowKey.to, modifiers: arrowMode.to }],
    type: maniType,
  };
}

// [i, o, x]
function getFnKeys({ from, to }) {
  return {
    conditions: [{ name: "caps_mode", value: 1, type: condiType }],
    from: { key_code: from },
    to: [{ key_code: to }],
    type: maniType,
  };
}

//============================================================
const title = "Capslock Shortcut Mode";
const rules = [
  {
    description: "capslock + hjkl to arrow, hjkl + q/w to option/shift",
    manipulators: [
      getCapsMode(),
      ...modifierMode.reduce(
        (acc, mode) => [...acc, getModifierMode(mode)],
        []
      ),
      ...arrowModeConditions.reduce(
        (acc, conditions) => [
          ...acc,
          ...arrowKeys.reduce(
            (acc2, arrowKey) => [
              ...acc2,
              getArrowModeKeys(conditions, arrowKey),
            ],
            []
          ),
        ],
        []
      ),
    ],
  },
  {
    description: "capslock + i/o to start/end of line, capslock + x to delete",
    manipulator: fnKeys.map((fnKey) => getFnKeys(fnKey)),
  },
];

const data = JSON.stringify({ title, rules }, null, 4);

// console.log(data);
// container.textContent = data;

fs.writeFileSync("./karabiner.json", data);
