const assert = require('assert');
const { describe } = require('mocha');
const puppeteer = require('puppeteer');

describe('Testing Potluck', function() {
	let browser;
	let page;
    let createPotluckBtn
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

	describe('Create Potluck', function() {
		it('Find Create Potluck Button', async () => {
            createPotluckBtn = await page.waitForSelector("#nav-bar > a:nth-child(2)", {visible: true, timeout: 50000})
		}).timeout(50000)

		it('Click Create Potluck', async () => {
			await createPotluckBtn.click();
			await page.waitForNavigation();
		}).timeout(40000)

        it('Enter Potluck Data', async () => {
            await page.type("#name", "TestLuck1");
            var date = new Date();
            var stringDate = date.getMonth().toString() + date.getDate().toString() + "00" + date.getFullYear() + date.getHours() + date.getMinutes() + "PM";
            await page.type("#datetime-input", stringDate)
			await page.type("#host","Test Host")
			await page.type("#food1","Strawberry Rhubarb Pie")
            await page.click("#submit");
        }).timeout(40000)
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