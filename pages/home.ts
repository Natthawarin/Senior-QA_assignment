import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly dismissButton: Locator;
  readonly cookieButton: Locator;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly addToBasketBtns: Locator;
  readonly snackBar: Locator;

constructor(page: Page) {
    this.page = page;
    
    // Locators สำหรับหน้า Welcome และ Cookie (ใช้ getByRole ได้เพราะเป็นมาตรฐาน)
    this.dismissButton = page.getByRole('button', { name: 'Close Welcome Banner' });
    this.cookieButton = page.getByRole('link', { name: 'dismiss cookie message' });
    
    // Locators สำหรับการค้นหา (ปรับให้ตรงกับ DOM จริงของ Juice Shop)
    this.searchIcon = page.locator('#searchQuery');
    this.searchInput = page.getByRole('textbox');
    
    // Locators สำหรับตะกร้าสินค้า
    this.addToBasketBtns = page.locator('button[aria-label="Add to Basket"]');
    this.snackBar = page.locator('simple-snack-bar');
  }


async gotoAndDismissBanners() {
    await this.page.goto('/');
    
    // บังคับรอให้หน้าต่าง Welcome โผล่มาก่อนสูงสุด 5 วิ ถ้าโผล่มาให้กดปิด
    try {
      await this.dismissButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.dismissButton.click();
    } catch (error) {
      // ปล่อยผ่านไปถ้า Pop-up ไม่เด้ง
    }

    // บังคับรอและปิดแถบ Cookie ด้านล่าง
    try {
      await this.cookieButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.cookieButton.click();
    } catch (error) {
      // ปล่อยผ่านไปถ้าแถบ Cookie ไม่เด้ง
    }
  }

  /**
   * ค้นหาสินค้า
   * @param keyword คำที่ต้องการค้นหา
   */
  async searchFor(keyword: string) {
    // 1. กดปุ่มแว่นขยาย เพื่อให้ช่องพิมพ์ขยายตัวออกมา
    await this.searchIcon.click();
    // 2. บังคับให้รอจนกว่าช่อง input จะโผล่ขึ้นมาบนหน้าจอจริงๆ ค่อยเริ่มพิมพ์
    await this.searchInput.waitFor({ state: 'visible' });
    // 3. พิมพ์คำค้นหาทีละตัวอักษร (หน่วงเวลาตัวละ 100ms) ป้องกัน Angular จับ Event ไม่ทัน
    await this.searchInput.pressSequentially(keyword, { delay: 100 });
    // 4. กด Enter เพื่อเริ่มค้นหา
    await this.searchInput.press('Enter');
    // 5. รอผลลัพธ์โหลด
    await this.page.waitForTimeout(1000); 
  }

  /**
   * เพิ่มสินค้าลงตะกร้าตามจำนวนชิ้น
   * @param amount จำนวนชิ้นที่ต้องการเพิ่ม
   */
  async addItemsToBasket(amount: number) {
    for (let i = 0; i < amount; i++) {
      await this.addToBasketBtns.nth(i).click();
      
      // รอให้ Toast แจ้งเตือนว่า "Placed ... into basket" เด้งขึ้นมาก่อนค่อยกดชิ้นต่อไป
      await this.snackBar.waitFor({ state: 'visible' });
      await this.page.waitForTimeout(500); 
    }
  }
}