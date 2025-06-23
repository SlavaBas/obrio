import { Page, Locator } from '@playwright/test';


export class AdminLoginPage  {
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;



  constructor(page: Page) {
  
    this.usernameField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
 
  }

  async login(user: string, pass: string) {
    await this.usernameField.waitFor({ state: 'visible' });
    await this.usernameField.fill(user);
    await this.passwordField.fill(pass);
    await this.submitButton.click();
  }


}