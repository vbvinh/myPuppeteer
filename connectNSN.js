const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    //ignoreDefaultArgs: ['--enable-automation'],
    //args: ['--disable-popup-blocking'] // Tùy chọn chặn popup
  });

  const page = await browser.newPage();

  
  // readline.question('Vui lòng nhập địa chỉ IP: ', async ipAddress => {
  //   await page.goto(`https://${ipAddress}`);

  await page.goto('https://10.229.174.125');
  
  //Login
  const userXPath = '//*[@id="login-username"]';
  const passwordXPath = '//*[@id="login-password"]';
  const loginBtnXPath = '/html/body/login-root/div/login/div/div/div[1]/p-card/div/div[2]/div/form/div[3]/p-button/button/span';
  //Scrape
  const detailSiteViewXPath ='//*[@id="main-view"]/div/div[1]/div[3]/ng-view/wf-panel/wf-panel-section/div/div/site-runtime-views/div/ul/li[2]/a';
  const btsidXpath ='//*[@id="main-view"]/div/div[1]/div[2]/div/div[1]/div[1]/div[2]/div[2]'
  
  // Đợi các trường input và nút đăng nhập xuất hiện trên trang
  await page.waitForXPath(userXPath);
  await page.waitForXPath(passwordXPath);
  await page.waitForXPath(loginBtnXPath);

  // Tìm và nhập thông tin user và password vào các trường input
  const userInput = await page.$x(userXPath);
  const passwordInput = await page.$x(passwordXPath);

  if (userInput[0] && passwordInput[0]) {
    await userInput[0].type('Nemuadmin');
    await passwordInput[0].type('nemuuser');
  } else {
    console.error('Không tìm thấy trường input với XPath đã cho');
  }

  // Tìm và click vào nút đăng nhập
  const [loginBtn] = await page.$x(loginBtnXPath);
  if (loginBtn) {
    await loginBtn.click();
  } else {
    console.error('Không tìm thấy nút đăng nhập với XPath đã cho');
  }

  const confirmLegalNoticeXPath = '/html/body/div[1]/div/div/ui-modal-renderer/login-banner-modal/ui-modal/div/div/div[3]/div/ui-footer/div/ui-button[1]/button';
  await page.waitForXPath(confirmLegalNoticeXPath);
  const [button] = await page.$x(confirmLegalNoticeXPath);
  if (button) {
    await button.click();
  } else {
    console.error('Không tìm thấy phần tử với XPath đã cho');
  }

  //Xpath smallIcon
  await page.waitForXPath(detailSiteViewXPath);
  const [detailSiteView] = await page.$x(detailSiteViewXPath);
  if (detailSiteView) {
    await detailSiteView.click();
  } else {
    console.error('Không tìm thấy detailSiteView với XPath đã cho.');
  }  
  //Xpath BTS ID
  await page.waitForXPath(btsidXpath);
  const [btsid] = await page.$x(btsidXpath);
  const NodeB = await page.evaluate(el => el.textContent, btsid);
  console.log('Đang login trạm:', NodeB); 

  //scraping

//Input param
  // readline.question('Vui lòng nhập xPath: ', async fanStatusXpath => {
  //   fanStatusXpath = fanStatusXpath.replace(/\[@id="[^"]*"\]/g, "[@class='new-site']");
  //   console.log('fanStatusXpath sau khi thay đổi:', fanStatusXpath);

  //   // Tiếp tục với việc sử dụng fanStatusXpath trong các bước tiếp theo của bạn
  //   await page.waitForXPath(fanStatusXpath);
  //   const [fanR2] = await page.$x(fanStatusXpath);
  //   if (fanR2) {
  //       await fanR2.click();
  //       console.log('Đã click vào fanR2 với selector đã cho.');
  //   } else {
  //       console.error('Không tìm thấy fanR2 với Xpath đã cho.');
  //   }
  //   readline.close();

  // });

    //Lay gia tri Xpath TB
    readline.question('Vui lòng nhập xPath Cellphone: ', async cellphoneXpath => {
    await page.waitForXPath(cellphoneXpath);
    const [cellphone] = await page.$x(cellphoneXpath);
    const numberUser = await page.evaluate(el => el.textContent, cellphone);
    console.log('Tong so TB tren cell:', numberUser); 

  //await browser.close()
  readline.close();
 });  //open with readline.question('Vui lòng nhập địa chỉ IP: ', async ipAddress => {
})();
