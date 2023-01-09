import puppeteer from 'puppeteer';
import fs from 'fs';


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Captures the current state of the accessibility tree
  const snapshot = await page.accessibility.snapshot();
  console.info(snapshot);

  fs.writeFile('./assets/accessibility.json', JSON.stringify(snapshot), function (err) {
    if (err) return console.log(err);
  });
  await browser.close();
})();