const assert = require('assert');
const { describe } = require('mocha');
const puppeteer = require('puppeteer');


describe("Account", function() {
    let browser;
    let page;
    let username = "puppeteer_test_user";
    let password = "puppeteertestpassword";
    let registerPage = 'http://127.0.0.1:8000/register'
    let loginPage = "http:127.0.0.1:8000/accounts/login"

    describe('Page setup', function() {
		it('Launch browser', async () => {
			browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']})
			page = await browser.newPage();
		}).timeout(10000)

		it('Navigate to Register Page', async () => {
			await page.goto(registerPage, { waitUntil: 'networkidle0', timeout: 60000 })
		}).timeout(20000)
	})

    describe('Create Account', function() {
        it('Create Puppeteer Test Account', async () => {
            await page.type("#id_username", "puppeteer_test_user")
            await page.type("#id_first_name", "puppeteer")
            await page.type("#id_last_name", "test")
            await page.type("#id_email", "puppeteer+test@gmail.com")
            await page.type("#id_password1", password)
            await page.type("#id_password2", password)
            await page.click("body > form > button")
            await page.waitForNavigation({waitUntil: 'load', timeout: 0})
        })
    })

    describe('Log In', function() {
        it('Navigate to Log in', async () => {
            await page.goto(loginPage, {waitUntil: 'networkidle0', timeout: 0})
        })

        it('Log In', async () => {
            await page.type("#id_username", username)
            await page.type("#id_password", password)
            await page.click("body > form > button")
            await page.waitForNavigation({waitUntil: 'load', timeout: 0})
        }).timeout(100000)
    })

    describe('Page tear down', function() {
		it('Close Browser', async () => {
			await browser.close()
		})
	})
})