module.exports = function (plop) {
  plop.setGenerator("feature", {
    description: "Generate a feature module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name:",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "plop-templates/features",
        templateFiles: "plop-templates/features/**",
        destination: "src/features/{{kebabCase name}}",
      },
    ],
  });
};
