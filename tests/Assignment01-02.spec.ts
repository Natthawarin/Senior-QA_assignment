import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { CheckoutPage } from '../pages/checkout';
import { RegisterPage } from '../pages/register'; 
import { user, address } from '../data/test-data';

test.describe('Purchase Flow Scenarios (Assignment01-02)', () => {
  let dynamicEmail: string;
  // register user before all tests
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    
    await page.goto('http://localhost:3000/'); 
    await homePage.gotoAndDismissBanners();
    
    // crewate dynamic email for registration to avoid "email already exists" error
    const timestamp = Date.now();
    const emailParts = user.email.split('@');
    dynamicEmail = `${emailParts[0]}+${timestamp}@${emailParts[1]}`;
    
    console.log(`=== registering newUser: ${dynamicEmail} ===`);
    await registerPage.register(dynamicEmail, user.password, 'my_secret_answer');
    console.log(`=== register sc! ===`);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoAndDismissBanners();
  });

  const testScenarios = [
    { no: 1, items: 1 },
    { no: 2, items: 2 }
  ];

  for (const data of testScenarios) {
    test(`Scenario ${data.no}: Add ${data.items} item(s) and complete address flow`, async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);
      const checkoutPage = new CheckoutPage(page);

      // --- Flow: Login ---
      console.log(`Login with User: ${dynamicEmail}`);
      await loginPage.login(dynamicEmail, user.password);
      
      await page.goto('/'); 
      // --- Flow: select product (Add to Basket) ---
      await homePage.addItemsToBasket(data.items);

      // --- Flow: Click Your Basket ---
      await checkoutPage.basketButton.click();
      await expect(checkoutPage.checkoutButton).toBeVisible();

      // --- Flow: Click Checkout ---
      await checkoutPage.checkoutButton.click();

      // --- Flow: Click + Add New Address ---
      await checkoutPage.addNewAddressBtn.click();

      // --- Flow: fill address ---
      await checkoutPage.countryInput.fill(address.country);
      await checkoutPage.nameInput.fill(`${address.baseName} ${data.no}`);
      await checkoutPage.mobileInput.fill(address.mobile);
      await checkoutPage.zipInput.fill(address.zip);
      await checkoutPage.addressInput.fill(`${address.baseAddress} ${data.no}`);
      await checkoutPage.cityInput.fill(address.city);
      await checkoutPage.stateInput.fill(address.state);

      // --- Flow: Click Submit ---
      await expect(checkoutPage.submitAddressBtn).toBeEnabled();
      await checkoutPage.submitAddressBtn.click();

      const addressRow = page.locator('mat-cell', { hasText: `${address.baseAddress} ${data.no}` });
      await expect(addressRow).toBeVisible();
    });
  }
});