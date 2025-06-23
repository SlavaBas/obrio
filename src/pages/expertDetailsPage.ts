import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../utils/helperBase';
import { ClientData } from '../utils/testData';


export class ExpertDetailsPage extends HelperBase {

    readonly resendEmailPopUp: Locator;
    readonly closePopUpButton: Locator;
    readonly expertCardName: Locator;
    readonly expertCardStatus: Locator;
    readonly startChatButton: Locator;
    readonly chatMessageTextarea: Locator;


    constructor(page: Page) {
        super(page);
        this.resendEmailPopUp = page.locator('div[data-sentry-component="EmailResend"]')
        this.closePopUpButton = page.getByTestId('close-button')
        this.expertCardName = page.getByTestId('expert-card-name');
        this.expertCardStatus = page.getByTestId('expert-status');
        this.startChatButton = page.getByTestId('expert-card-chat-button');
        this.chatMessageTextarea = page.getByTestId('chat-message-textarea');

    }

    async startChatWithExpert(): Promise<{ name: string; status: string }> {
        await this.closeConfirmEmailPopUp();
        const { name, status } = await this.checkExpertData();
        await this.startChat();
        return { name, status };
    }

    async closeConfirmEmailPopUp() {

        await this.waitForVisible(this.resendEmailPopUp);
        await this.closePopUpButton.click();
        await this.waitForHidden(this.resendEmailPopUp);
    }

    async checkExpertData(): Promise<{ name: string; status: string }> {

        const expertCardName = await this.expertCardName.innerText();
        const expertCardStatus = await this.expertCardStatus.innerText();
        return { name: expertCardName, status: expertCardStatus };
    }

    async startChat() {
        await this.startChatButton.click();
        await this.waitForVisible(this.chatMessageTextarea);

    }
}

