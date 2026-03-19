import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly securityQuestionDropdown: Locator;
  readonly securityAnswerInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
  
    this.emailInput = page.locator('#emailControl');
    this.passwordInput = page.locator('#passwordControl');
    this.repeatPasswordInput = page.locator('#repeatPasswordControl');
    // สำหรับ Dropdown ของ Angular Material
    this.securityQuestionDropdown = page.locator('mat-select[name="securityQuestion"]');
    this.securityAnswerInput = page.locator('#securityAnswerControl');
    // ปุ่ม Register
    this.registerButton = page.locator('#registerButton');
  }

  /**
   * ทำการสมัครสมาชิกใหม่
   * @param email อีเมลที่ต้องการสมัคร
   * @param pass รหัสผ่าน
   * @param answer คำตอบของคำถามความปลอดภัย
   */
  async register(email: string, pass: string, answer: string) {
    await this.page.goto('/#/register');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.repeatPasswordInput.fill(pass);
    await this.securityQuestionDropdown.click();
    await this.page.locator('mat-option').first().click(); 
    await this.securityAnswerInput.fill(answer);
    await this.registerButton.click();
    await this.page.waitForURL(/.*\/login/); 
  }
}