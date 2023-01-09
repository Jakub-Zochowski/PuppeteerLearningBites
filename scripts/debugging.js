import puppeteer from 'puppeteer';

(async () => {
  // Makes the browser to be launched in a headful way
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width:1920,
      height:1080
    },
    slowMo: 20,
    devtools: true
  });

  const page = await browser.newPage();
  await page.goto('https://stackoverflow.com/');

  // Holds the browser until we terminate the process explicitly
  await browser.waitForTarget(() => false);

  await browser.close();
})();