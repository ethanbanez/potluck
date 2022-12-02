const assert = require('assert');
const { describe } = require('mocha');
const puppeteer = require('puppeteer');

describe('Potluck', function() {
	let browser;
	let page;
	let username = "puppeteer_test_user";
    let password = "puppeteertestpassword";
	let landingPage = 'http://127.0.0.1:8000'
	let createPotluckPage = "http://127.0.0.1:8000/mainapp/create"

	describe('Page setup', function() {
		it('Launch browser', async () => {
			browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']})
			page = await browser.newPage();
            page.setDefaultNavigationTimeout(0)
		}).timeout(10000)

		it('Navigate to landing page', async () => {
			await page.goto(landingPage, { timeout: 60000 })
		}).timeout(20000)
	})
	
	describe('Create Potluck', function() {

		it('Navigate to Create Potluck page', async () => {
			await page.goto(createPotluckPage, { timeout: 0})
		}).timeout(0)

		it('Log In', async () => {
            await page.type("#id_username", username)
            await page.type("#id_password", password)
			await Promise.all([
				page.click("#btn-login"),
				page.waitForNavigation({waitUntil: 'domcontentloaded', timeout: 0})
			])
        }).timeout(20000)

        it('Enter Potluck Data', async () => {
            await page.type("#name", "TestLuck1");
			console.log(page.url())
            var date = new Date();
            var stringDate1 = date.getMonth().toString() + date.getDate().toString() + "00" + date.getFullYear() + date.getHours() + date.getMinutes() + "PM";
            var stringDate2 = date.getMonth().toString() + date.getDate().toString() + "00" + date.getFullYear() + (date.getHours()+2) + date.getMinutes() + "PM";
			const dateTimes = await page.$$("#datetime-input")
            await page.type(dateTimes[1], stringDate1)
			await page.type(dateTimes[2], stringDate2)
			await page.type("#food1","Strawberry Rhubarb Pie")
			Promise.all([
				page.click("#submit", {waitUntil: 'domcontentloaded', timeout: 0}),
				page.waitForNavigation({timeout: 0})
			])
        }).timeout(30000)
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