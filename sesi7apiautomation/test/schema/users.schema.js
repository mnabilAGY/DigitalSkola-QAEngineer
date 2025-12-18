const { expect } = require("chai");
const Ajv = require("ajv");

describe("JSON Schema - GET Users", () => {
  it("should validate get users response schema", () => {
    const responseData = {
      status: 200,
      users: [
        {
          userId: "6906253b673f8dae6a1023d8",
          username: "Ridhwan",
          age: 29,
          protected: true,
        },
      ],
    };

    const schema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        status: { type: "number" },
        users: {
          type: "array",
          items: {
            type: "object",
            properties: {
              userId: { type: "string" },
              username: { type: "string" },
              age: { type: "number" },
              protected: { type: "boolean" },
            },
            required: ["userId", "username", "age", "protected"],
          },
        },
      },
      required: ["status", "users"],
    };

    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);

    const isValid = validate(responseData);

    const errorMessage = validate.errors
      ? JSON.stringify(validate.errors, null, 2)
      : null;

    expect(isValid, errorMessage).to.be.true;
  });
});
