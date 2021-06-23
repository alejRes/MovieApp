const puppeteer = require("puppeteer");

const scrapSensa = async(title) => {
  const browser = await puppeteer.launch({ 
    headless: true,//OJO cambiar a TRUE cuando lo lance
    slowMo: 20
  });
  const page = await browser.newPage();
  await page.goto(`https://www.sensacine.com`);
  await page.click('[aria-label="Aceptar nuestro procesamiento de datos y cerrar"]')
  await page.waitForSelector('input[class="header-search-input"]');
  await page.click("#header-main-mobile-btn-search");
  await page.waitForSelector("#header-search-input");
  await page.type("#header-search-input", title);
  await page.waitForSelector('#search-engine > div > div > div.autocomplete-results > div:nth-child(1) > span');
  await page.click('#search-engine > div > div > div.autocomplete-results > div:nth-child(1) > span');
  await page.waitForSelector('div.review-card-content');

    const data = await page.$$eval('div.review-card-content', (divs) => {
    const reviews = []
    
    divs.forEach(div => {
      reviews.push(div.innerText)
  })
  return reviews
} )
  return data;
};

// scrapSensa("avatar")


const scrapFilmAffinity = async(titulo) => {
  const browser = await puppeteer.launch({
      headless: true,//OJO cambiar a TRUE cuando lo lance
      slowMo: 20
  })
  const page = await browser.newPage();
  await page.goto("https://www.filmaffinity.com/");
  await page.click('[aria-label="ACEPTO"]')
  
  await page.waitForSelector('input[id="top-search-input"]')
  await page.type('input[id="top-search-input"]', titulo)
  await page.waitForSelector('li[class="ui-menu-item"]')
  await page.click('li[class="ui-menu-item"]')
  
  await page.waitForSelector('li div[itemprop="review"]')
  
  const data = await page.$$eval('li div[itemprop="review"]', (divs) => {
    const reviews = []
    
  divs.forEach(div => {
      reviews.push(div.innerText)
      
  })
  /* console.log()
  console.log(reviews) */
  return reviews
} )
  return data;
};


module.exports ={scrapSensa, scrapFilmAffinity}
// scrapFilmAffinity("Titanic")