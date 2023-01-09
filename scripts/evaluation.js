import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  // Makes the browser to be launched in a headful way
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  const page = await browser.newPage();
  await page.goto('https://www.cclonline.com/pc-components/graphics-cards/nvidia-chipset-graphics-cards/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.productListOverlayWrapper');
  const products = await page.evaluate(() => {
    const products = document.querySelectorAll('.productListOverlayWrapper');
    const productsArr = [];

    for (let i = 0; i < products.length; i++) {
      productsArr.push({
        name: products[i].querySelector('h3').textContent,
        price: products[i].querySelector('.price-value-container').textContent.replace(/(\r\n|\n|\r)/gm, "")
      })
    }

    return productsArr;
  });
  await page.screenshot({ path: './assets/products.png', fullPage: true });
  await page.pdf({ path: './assets/products.pdf' });

  fs.writeFile('./assets/products.json', JSON.stringify(products), function (err) {
    if (err) return console.log(err);
  });

  await browser.close();
})();