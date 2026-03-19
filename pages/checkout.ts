import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly basketButton: Locator;
  readonly checkoutButton: Locator;
  readonly addNewAddressBtn: Locator;
  
  // Locators สำหรับฟอร์มกรอกที่อยู่
  readonly countryInput: Locator;
  readonly nameInput: Locator;
  readonly mobileInput: Locator;
  readonly zipInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly submitAddressBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketButton = page.locator('button[routerlink="/basket"]');
    this.checkoutButton = page.locator('#checkoutButton');
    this.addNewAddressBtn = page.locator('button[aria-label="Add a new address"]');

    // ใช้ Placeholder ในการหาช่องกรอกข้อมูล 
    this.countryInput = page.getByPlaceholder('Please provide a country.');
    this.nameInput = page.getByPlaceholder('Please provide a name.');
    this.mobileInput = page.getByPlaceholder('Please provide a mobile number.');
    this.zipInput = page.getByPlaceholder('Please provide a ZIP code.');
    this.addressInput = page.getByPlaceholder('Please provide an address.');
    this.cityInput = page.getByPlaceholder('Please provide a city.');
    this.stateInput = page.getByPlaceholder('Please provide a state.');
    
    this.submitAddressBtn = page.locator('#submitButton');
  }

  /**
   * ไปที่ตะกร้าสินค้าและกดปุ่ม Checkout
   */
  async goToBasketAndCheckout() {
    await this.basketButton.click();
    await this.checkoutButton.click();
  }

  /**
   * กรอกฟอร์มเพิ่มที่อยู่ใหม่และกด Submit
   */
  async addNewAddress(addressData: {
    country: string;
    name: string;
    mobile: string;
    zip: string;
    address: string;
    city: string;
    state?: string;
  }) {
    await this.addNewAddressBtn.click();
    
    // กรอกข้อมูลตาม Object ที่ส่งเข้ามา
    await this.countryInput.fill(addressData.country);
    await this.nameInput.fill(addressData.name);
    await this.mobileInput.fill(addressData.mobile);
    await this.zipInput.fill(addressData.zip);
    await this.addressInput.fill(addressData.address);
    await this.cityInput.fill(addressData.city);
    
    if (addressData.state) {
      await this.stateInput.fill(addressData.state);
    }
    
    // กด Submit บันทึกที่อยู่
    await this.submitAddressBtn.click();
  }
}