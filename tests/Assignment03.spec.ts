import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';

test.describe('Search Scenarios (Assignment03)', () => {
  
  test('Scenario 3: Search for apple and verify correct products show up', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoAndDismissBanners();
    // Click on the search button, search for 'apple'
    await homePage.searchFor('apple');
    //  Verify that 2 apple products show up
const productCards = page.getByRole('button', { name: 'Click for more information about the product' });
    await expect(productCards).toHaveCount(2);
    // 4. Verify that banana product 
    const bananaProduct = page.locator('mat-card.mat-card', { hasText: /banana/i });
    await expect(bananaProduct).not.toBeVisible();
  });

});