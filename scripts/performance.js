import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Executes Navigation API within the page context
  const metrics = await page.evaluate(() => JSON.stringify(window.performance));

  // Parses the result to JSON
  console.info(JSON.parse(metrics));

  fs.writeFile('./assets/performance.json', JSON.stringify(JSON.parse(metrics)), function (err) {
    if (err) return console.log(err);
  });

  await browser.close();
})();