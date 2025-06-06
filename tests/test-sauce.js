const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { title } = require('process');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

describe('Google Search Test', function () {
    let driver;

    beforeEach(async function() {
        console.log('ini di dalam hook')
    });

    it('Visit SauceDemo pakai chrome dan cek page title', async function () {
        options = new chrome.Options();
        // options.addArguments("--headless");
        // driver = await new Builder().forBrowser('chrome').build();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        assert.strictEqual(title, 'Swag Labs');
        
        // Login
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user'); 
        await driver.sleep(1000);
        await inputPassword.sendKeys('secret_sauce'); 
        await driver.sleep(1000);
        await buttonLogin.click(); 
        await driver.sleep(1000);

        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            3000
        );
        
        // assert: elememt ada
        await buttonCart.isDisplayed()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let longtext = await textAppLogo.getText();
        assert.strictEqual(longtext, 'Swag Labs');
        await driver.sleep(1000);

        // Filter Z to A
        let sortDropdown = await driver.findElement(By.css('[data-test="product-sort-container"]'))
        let optionZtoA = await driver.findElement(By.css('[data-test="product-sort-container"] option[value="za"]'))
        await sortDropdown.click(); 
        await driver.sleep(1000);
        await optionZtoA.click(); 
        await driver.sleep(1000);
        
        await driver.quit();
    });

    it('Visit SauceDemo pakai firefox dan cek page title', async function () {
        options = new chrome.Options();
        options.addArguments("--headless");

        driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        await driver.quit()
    })
});