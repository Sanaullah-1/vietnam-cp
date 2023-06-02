module.exports = {
  input: ["./src/**/*.{js,jsx}"],
  output: "./public/locales/$LOCALE/translation.json",
  // locales: ["en", "ar", 'vi', 'fa'],
  locales: ["en",'vi'],

  nsSeparator: ":",
  keySeparator: ".",
  pluralSeparator: "_",
  contextSeparator: "_",
  verbose: true,
};
