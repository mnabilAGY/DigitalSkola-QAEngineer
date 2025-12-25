const { Builder } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../pages/loginPage');

describe('SauceDemo Visual Testing', function () {
  let driver;
  let loginPage;
  this.timeout(30000);

  before(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it('Screenshot halaman produk', async () => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  const screenshot = await driver.takeScreenshot();

  // Pastikan folder ada
  const dir = path.join(__dirname, '../reports/screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Simpan file screenshot
  const filePath = path.join(dir, 'products-page.png');
  fs.writeFileSync(filePath, screenshot, 'base64');
});
});