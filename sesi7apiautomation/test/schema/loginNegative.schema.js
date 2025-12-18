const { expect } = require("chai");
const Ajv = require("ajv");

describe("JSON Schema - POST Login Negative", () => {
  it("should validate login failed response schema", () => {
    const responseData = {
      status: 401,
      message: "Invalid username or password!",
    };

    const schema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        status: { type: "number" },
        message: { type: "string" },
      },
      required: ["status", "message"],
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
