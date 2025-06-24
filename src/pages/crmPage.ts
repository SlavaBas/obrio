import { Page, Locator, test } from '@playwright/test';
import { HelperBase } from '../utils/helperBase';
import { th } from '@faker-js/faker/.';


export class CRMPage extends HelperBase {

  constructor(page: Page) {
    super(page);
  }

  get usernameField(): Locator {
    return this.page.locator('input[name="email"]');
  }

  get passwordField(): Locator {
    return this.page.locator('input[name="password"]');
  }

  get submitButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  get connectedText(): Locator {
    return this.page.getByText('Connected');
  }

  get startWorkButton(): Locator {
    return this.page.locator('button:has-text("Start work")');
  }

  get confirmButton(): Locator {
    return this.page.locator('button:has-text("Yes")');
  }

  get stopWorkButton(): Locator {
    return this.page.locator('button:has-text("Stop work")');
  }

  get onlineText(): Locator {
    return this.page.getByText('Online');
  }

  get offlineText(): Locator {
    return this.page.getByText('Offline');
  }

  get acceptChatRequestButton(): Locator {
    return this.page.getByText('Accept');
  }

  async login(user: string, pass: string) {
    await test.step('Login on CRM', async () => {
      await this.usernameField.fill(user);
      await this.passwordField.fill(pass);
      await this.submitButton.click();
    });
  }

  async startWork() {
    await test.step('Expert start work', async () => {
      await this.waitForVisible(this.startWorkButton, 10000);
      if (await this.startWorkButton.isVisible()) {
        await this.startWorkButton.click();
        await this.confirmButton.waitFor({ state: 'visible' });
        await this.confirmButton.click();
      }
    });
  }

  async acceptChatRequest() {
    await test.step('Click accept button', async () => {
      await this.acceptChatRequestButton.click();
      await this.waitForHidden(this.acceptChatRequestButton);
    });
  }

  async stopWork() {
    await test.step('Expert stop work', async () => {
      await this.waitForVisible(this.stopWorkButton);
      if (await this.stopWorkButton.isVisible()) {
        await this.stopWorkButton.click();
        await this.confirmButton.waitFor({ state: 'visible' });
        await this.confirmButton.click();
      }
    });
  }


}