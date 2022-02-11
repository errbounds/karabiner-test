const lists = {
  modifiers: [
    { input: "q", output: "left_option", variable: "option_shortcut" },
    { input: "w", output: "left_shift", variable: "shift_shortcut" },
    {
      input: ["q", "w"],
      output: ["left_option", "left_shift"],
      variable: "option_shift_shortcuot",
    },
  ],
  key_code: [
    { input: "h", output: "left_arrow" },
    { input: "j", output: "down_arrow" },
    { input: "k", output: "up_arrow" },
    { input: "l", output: "right_arrow" },
  ],
};

function f() {
  const conditions = [];
}
