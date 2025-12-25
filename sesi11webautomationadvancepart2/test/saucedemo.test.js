const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver/lib/select');
const LoginPage = require('../pages/loginPage');

describe('SauceDemo Automation', function () {
  let driver;
  let loginPage;
  this.timeout(30000);

  // Setup driver sekali sebelum semua test
  before(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
    loginPage = new LoginPage(driver);
  });

  // Tutup driver setelah semua test selesai
  after(async () => {
    await driver.quit();
  });

  // Login otomatis sebelum setiap test
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('Sukses Login', async () => {
    const title = await loginPage.getTitleText();
    assert.strictEqual(title, 'Products');
  });

  it('Urutkan Produk dari A-Z', async () => {
    const sortDropdown = await driver.findElement(By.className('product_sort_container'));
    const select = new Select(sortDropdown);

    await select.selectByValue('az'); // pilih A-Z
    await driver.sleep(2000);

    const items = await driver.findElements(By.className('inventory_item_name'));
    const names = [];
    for (let item of items) {
      names.push(await item.getText());
    }

    console.log('Produk setelah sort A-Z:', names);
    assert.strictEqual(names[0], 'Sauce Labs Backpack');
  });
});