const assert = require('assert');
const { describe } = require('mocha');
const puppeteer = require('puppeteer');


describe("Creating an Account and Logging In", function() {
    let browser;
    let page;
    let username = "puppeteer_test_user";
    let password = "puppeteertestpassword";
    let landingPage = 'http://127.0.0.1:8000'

    describe('Page setup', function() {
		it('Launch browser', async () => {
			browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']})
			page = await browser.newPage();
		}).timeout(10000)

		it('Navigate to landing page', async () => {
			await page.goto(landingPage, { waitUntil: 'networkidle0', timeout: 60000 })
		}).timeout(20000)
	})

    describe('Create Account', function() {
        it('Navigate to Registration', async () => {
            await page.click("#login > ul > li:nth-child(2) > a")
            await page.waitForNavigation({waitUntil: 'load'})
        }).timeout(40000)

        it('Create Puppeteer Test Account', async () => {
            await page.type("#id_username", "puppeteer_test_user")
            await page.type("#id_first_name", "puppeteer")
            await page.type("#id_last_name", "test")
            await page.type("#id_email", "puppeteer+test@gmail.com")
            await page.type("#id_password1", password)
            await page.type("#id_password2", password)
            await page.click("body > form > button")
            await page.waitForNavigation({waitUntil: 'load'})
        }).timeout(40000)
    })

    describe('Log In', function() {
        it('Navigate to Log in', async () => {
            await page.click("#login > ul > li:nth-child(1) > a")
            await page.waitForNavigation({waitUntil: 'load'})
        }).timeout(40000)

        it('Log In', async () => {
            await page.type("#id_username", username)
            await page.type("#id_password", password)
            await page.click("body > form > button")
            await page.waitForNavigation()
        }).timeout(40000)
    })

    describe('Page tear down', function() {
		it('Close Browser', async () => {
			await browser.close()
		})
	})
})