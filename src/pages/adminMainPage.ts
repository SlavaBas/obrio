import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../utils/helperBase'; 
import { th } from '@faker-js/faker/.';


export class AdminMainPage extends HelperBase{

  readonly connectedText: Locator;
  readonly startWorkButton: Locator;
  readonly confirmButton: Locator;
  readonly stopWorkButton: Locator;
  readonly onlineText: Locator;
  readonly offlineText: Locator;
  readonly acceptChatRequestButton: Locator;
  


  constructor(page: Page) {
    super(page)
    this.connectedText = page.getByText('Connected');
    this.startWorkButton = page.locator('button:has-text("Start work")');
    this.confirmButton = page.locator('button:has-text("Yes")')
    this.stopWorkButton = page.locator('button:has-text("Stop work")');
    this.onlineText = page.getByText('Online');
    this.offlineText = page.getByText('Offline');
    this.acceptChatRequestButton = page.getByText('Accept');
    
  }

  async startWork() {
    await this.waitForVisible(this.startWorkButton, 10000);
    if (await this.startWorkButton.isVisible()){
      await this.startWorkButton.click();
      await this.confirmButton.waitFor({ state: 'visible' });
      await this.confirmButton.click();
    }
    
  }


  async acceptChatRequest() {
    await this.waitForVisible(this.acceptChatRequestButton);
    await this.acceptChatRequestButton.click();
    await this.waitForHidden(this.acceptChatRequestButton);

  }

  async stopWork() {
    await this.waitForVisible(this.stopWorkButton);
    if (await this.stopWorkButton.isVisible()){
      await this.stopWorkButton.click();
      await this.confirmButton.waitFor({ state: 'visible' });
      await this.confirmButton.click();
    }

  }

  
}