module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) => {
  plop.setGenerator("e2e-test", {
    description: "Gerar um novo e2e test",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Qual é o nome da rota a ser testada?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "test/e2e/{{kebabCase name}}.spec.ts",
        templateFile: "templates/e2e.hbs",
      },
    ],
  });

  plop.setGenerator("service-test", {
    description: "Gerar um novo service test",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Qual é o nome do service ser testado?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/test/services/{{kebabCase name}}-service.spec.ts",
        templateFile: "templates/service-test.hbs",
      },
      {
        type: "add",
        path: "src/services/{{kebabCase name}}.service.ts",
        templateFile: "templates/service.hbs",
      },
    ],
  });
};
