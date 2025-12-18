const { describe, it } = require("mocha");
const { expect } = require("chai");

let token;

describe("API Automation Test", function () {

  /**
   * ============================
   * POST - Positive Case (Login)
   * ============================
   */
  it("POST Login - Positive Case", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    // Assert Status Code
    expect(response.status).to.equal(200);

    const data = await response.json();

    // Assert Response Body
    expect(data.message).to.equal("Login successful");

    // Simpan token untuk GET request
    token = data.token;
  });

  /**
   * ============================
   * POST - Negative Case (Login)
   * ============================
   */
  it("POST Login - Negative Case (Wrong Password)", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin",
          password: "salahpassword",
        }),
      }
    );

    // Assert Status Code
    expect(response.status).to.equal(401);

    const data = await response.json();

    // Assert Response Body
    expect(data.message).to.equal("Invalid username or password!");
  });
});
