import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
  }


  async login(email: string, pass: string) {
      await this.page.goto('/#/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
    
    // wait for the login process to complete and the home page to load
    await this.page.waitForSelector('button[routerlink="/basket"]', { state: 'visible' });
  }
}