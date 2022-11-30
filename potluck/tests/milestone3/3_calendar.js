const assert = require('assert');
const { describe } = require('mocha');
const puppeteer = require('puppeteer');


describe("Calendar", function() {
    let browser;
    let page;
    let username = "puppeteer_test_user";
    let password = "puppeteertestpassword";
    let landingPage = 'http://127.0.0.1:8000'
    let loginPage = "http:127.0.0.1:8000/accounts/login"
    let calendarPage = "http://127.0.0.1:8000/mainapp/calendar"

    describe('Page setup', function() {
		it('Launch browser', async () => {
			browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']})
			page = await browser.newPage();
		}).timeout(10000)

		it('Navigate to landing page', async () => {
			await page.goto(landingPage, { waitUntil: 'networkidle0', timeout: 60000 })
		}).timeout(20000)
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

    describe('Navigate to Calendar', function() {
        it('View Calendar', async () => {
            await page.goto(calendarPage, {waitUntil: 'networkidle0', timeout: 0})
        })

        it('Verify Potluck rendered', async () => {
            const found = (await page.content()).match("TestLuck1")
			assert(!!found == true)
        }).timeout(40000)
    })

    describe('Page tear down', function() {
		it('Close Browser', async () => {
			await browser.close()
		})
	})
})