const fs = require("fs");

function getTabMode() {
  return {
    from: { key_code: "tab" },
    to: [{ set_variable: { name: "tab_pressed", value: 1 } }],
    to_after_key_up: [{ set_variable: { name: "tab_pressed", value: 0 } }],
    to_if_alone: [{ key_code: "tab" }],
    type: "basic",
  };
}

const numberList = [
  ["f13", "0"],
  ["comma", "1"],
  ["period", "2"],
  ["slash", "3"],
  ["k", "4"],
  ["l", "5"],
  ["semicolon", "6"],
  ["o", "7"],
  ["p", "8"],
  ["open_bracket", "9"],
];
function getTabNumber(from, to) {
  return {
    conditions: [{ name: "tab_pressed", value: 1, type: "variable_if" }],
    from: { key_code: from },
    to: [{ key_code: to }],
    type: "basic",
  };
}

const title = "Tab Enhancement";
const rules = [
  {
    description: "tab+,./ to 123",
    manipulators: [
      getTabMode(),
      ...numberList.map((key) => getTabNumber(...key)),
    ],
  },
];
const data = JSON.stringify({ title, rules }, null, 4);

fs.writeFileSync("./tab-number.json", data);
