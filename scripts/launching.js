import puppeteer from 'puppeteer';
import sleep from '../utils/sleep.js';

(async () => {
  // Makes the browser to be launched in a headful way
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width:1920,
      height:1080
    } 
  });

  const page = await browser.newPage();
  await page.goto('https://stackoverflow.com/');
  
  await sleep(3000);

  await browser.close();
})();