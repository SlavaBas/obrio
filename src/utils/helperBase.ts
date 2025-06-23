import { Page, Locator } from "@playwright/test"

export class HelperBase {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
        await locator.waitFor({ state: 'visible',  timeout});
    }

     async waitForHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'hidden' });
    }

    

}