const assert = require('assert');
const { describe } = require('mocha');
const puppeteer = require('puppeteer');

describe('Potluck', function() {
	let browser;
	let page;
	let username = "puppeteer_test_user";
    let password = "puppeteertestpassword";
    let createPotluckBtn
	let landingPage = 'http://127.0.0.1:8000'
    let loginPage = "http:127.0.0.1:8000/accounts/login"
	let createPotluckPage = "http://127.0.0.1:8000/mainapp/create"

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
        }).timeout(100000)

        it('Log In', async () => {
            await page.type("#id_username", username)
            await page.type("#id_password", password)
            await page.click("body > form > button")
            await page.waitForNavigation({waitUntil: 'load', timeout: 0})
        }).timeout(100000)
    })

	describe('Create Potluck', function() {

		it('Navigate to Create Potluck page', async () => {
			await page.goto(createPotluckPage, {waitUntil: 'networkidle0', timeout: 0})
		}).timeout(100000)

        it('Enter Potluck Data', async () => {
            await page.type("#name", "TestLuck1");
            var date = new Date();
            var stringDate1 = date.getMonth().toString() + date.getDate().toString() + "00" + date.getFullYear() + date.getHours() + date.getMinutes() + "PM";
            var stringDate2 = date.getMonth().toString() + date.getDate().toString() + "00" + date.getFullYear() + (date.getHours()+2) + date.getMinutes() + "PM";
			const dateTimes = await page.$$("")
            await page.type(dateTimes[1], stringDate1)
			await page.type(dateTimes[2], stringDate2)
			await page.type("#food1","Strawberry Rhubarb Pie")
            await page.click("#submit", {waitUntil: 'networkidle0', timeout: 0});
        }).timeout(100000)
	})

	describe('View Potlucks', function() {
		it('View TestLuck', async () => {
			const found = (await page.content()).match("TestLuck1")
			assert(!!found == true)
		}).timeout(60000)
	})

	describe('Page tear down', function() {
		it('Close Browser', async () => {
			await browser.close()
		})
	})
})