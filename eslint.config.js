import vue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: require.resolve("vue-eslint-parser"), // Use Vue parser
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue,
    },
    rules: {
      "vue/no-multiple-script": "off", // Allow multiple <script> blocks
      "no-unused-vars": "warn", // Warn for unused variables
    },
  },
];