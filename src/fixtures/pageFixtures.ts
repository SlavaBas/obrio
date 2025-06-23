import { test as base } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { TestData } from '../utils/testData';




type Pages = {
  pageManager: PageManager
  testData: TestData

};

export const test = base.extend<Pages>({
  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },

   testData: async ({ page }, use) => {
    await use(new TestData());
  },

 
 
});

export { expect } from '@playwright/test';