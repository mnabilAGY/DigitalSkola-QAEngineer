const { expect } = require("chai");
const Ajv = require("ajv");

describe("JSON Schema - POST Login Positive", () => {
  it("should validate login success response schema", () => {
    const responseData = {
      status: 200,
      token: "jwt-token-example",
      message: "Login successful",
    };

    const schema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        status: { type: "number" },
        token: { type: "string" },
        message: { type: "string" },
      },
      required: ["status", "token", "message"],
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
