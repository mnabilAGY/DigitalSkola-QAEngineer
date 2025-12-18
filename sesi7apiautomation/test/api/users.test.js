const { describe, it } = require("mocha");
const { expect } = require("chai");

let token;
describe("API Automation Test", function () {

  before(async function () {
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

    const data = await response.json();
    token = data.token;
  });
/**
   * ============================
   * GET - Get User (Authorized)
   * ============================
   */
  it("GET Users - Success", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    // Assert Status Code
    expect(response.status).to.equal(200);

    const data = await response.json();

    // Assert Response Body
    expect(data.users).to.be.an("array");
  });
});