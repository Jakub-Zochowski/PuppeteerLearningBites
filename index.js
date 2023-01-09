import sleep from './utils/sleep.js';

(async () => {
  const text = await sleep(3000);
  console.log('text');
})();