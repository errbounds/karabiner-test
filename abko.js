const { writeFileSync } = require("fs");

jpTochange = {
  from: { key_code: "japanese_kana" },
  to: [{ key_code: "f13" }],
  type: "basic",
};

s = {
  title: "abko jp to language Change",
  rules: [{ description: "", manipulators: [jpTochange] }],
};

writeFileSync("./abko.json", JSON.stringify(s, null, 4));
