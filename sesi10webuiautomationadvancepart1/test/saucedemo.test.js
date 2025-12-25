const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver/lib/select');


describe('SauceDemo Automation', function () {
  let driver;
  this.timeout(30000); // Tambah timeout agar cukup waktu untuk eksekusi

  before(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Sukses Login', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    const title = await driver.findElement(By.className('title')).getText();
    assert.strictEqual(title, 'Products');
  });

   it('Urutkan Produk dari A-Z', async () => {
  const sortDropdown = await driver.findElement(By.className('product_sort_container'));
  const select = new Select(sortDropdown);

  // Pilih opsi A-Z dengan value yang sesuai
  await select.selectByValue('az'); // value di HTML untuk A-Z adalah "az"

  // Tunggu sebentar agar UI update
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