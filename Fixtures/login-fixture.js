const { test: base } = require('@playwright/test');

const email = 'mehu1414@gmail.com';
const password = 'Mehu@123';
const clientUrl = 'https://rahulshettyacademy.com/client';

const customtest = base.extend({
   loggedInPage: async ({ browser }, use, testInfo) => {
      const loginContext = await browser.newContext();
      const loginPage = await loginContext.newPage();
      const storageStatePath = testInfo.outputPath('state.json');

      try {
         await loginPage.goto(clientUrl);
         await loginPage.locator('#userEmail').fill(email);
         await loginPage.locator('#userPassword').fill(password);
         await loginPage.locator("[value='Login']").click();

         await loginPage.waitForLoadState('networkidle');
         //await loginPage.locator('.dashboard').waitFor();
         await loginContext.storageState({ path: storageStatePath });
      } finally {
         await loginContext.close();
      }

      const webContext = await browser.newContext({ storageState: storageStatePath });
      const page = await webContext.newPage();

      try {
         await page.goto(clientUrl);
         await use(page);
      } finally {
         await webContext.close();
      }
   }
});

module.exports = { customtest, email };