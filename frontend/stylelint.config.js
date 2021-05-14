module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "indentation": [
      2,
      {
        "except": ["block"],
        "message": "Please use 2 spaces for indentation.",
        "severity": "warning"
      }
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
}
