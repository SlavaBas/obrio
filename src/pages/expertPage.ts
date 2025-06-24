import { Page, Locator, FrameLocator, test } from '@playwright/test';
import { HelperBase } from '../utils/helperBase';
import { CardData } from '../utils/testData';



export class ExpertPage extends HelperBase {


    constructor(page: Page) {
        super(page);
    }
    get resendEmailPopUp(): Locator {
        return this.page.locator('div[data-sentry-component="EmailResend"]');
    }

    get closePopUpButton(): Locator {
        return this.page.getByTestId('close-button');
    }

    get expertCardName(): Locator {
        return this.page.getByTestId('expert-card-name');
    }

    get expertCardStatus(): Locator {
        return this.page.getByTestId('expert-status');
    }

    get startChatButton(): Locator {
        return this.page.getByTestId('expert-card-chat-button');
    }

    get chatMessageTextarea(): Locator {
        return this.page.getByTestId('chat-message-textarea');
    }

    get sendMessageButton(): Locator {
        return this.page.getByTestId('send-message-button');
    }

    get connectionPopUp(): Locator {
        return this.page.getByTestId('connection-pop-up');
    }

    get refillBalanceContinueButton(): Locator {
        return this.page.getByTestId('top-up-refill-credits-btn');
    }

    get paymentFromCreditCard(): Locator {
        return this.page.getByTestId('payment-form-credit-card-option');
    }

    get frame(): FrameLocator {
        return this.page.frameLocator('#solid-payment-form-iframe');
    }

    get cardNumberInput(): Locator {
        return this.frame.locator('#ccnumber');
    }

    get cardExpiryInput(): Locator {
        return this.frame.locator('#cardExpiry');
    }
    get cardCVVInput(): Locator {
        return this.frame.locator('#cvv2');
    }

    get cardOwnerInput(): Locator {
        return this.frame.locator('#nameoncard');
    }

    get submitButton(): Locator {
        return this.frame.getByTestId('submit-button');
    }

    get paymentSuccessMessage(): Locator {
        return this.page.getByText('Payment successful');
    }

    get closeTopUpButton(): Locator {
        return this.page.getByTestId('close-button');
    }

    get discountPopUp(): Locator {
        return this.page.locator('div[data-sentry-component="PackageDiscountPromoOffer"]');
    }

    get chatTimer(): Locator {
        return this.page.getByTestId('chat-header-timer');
    }

    get endChatButton(): Locator {
        return this.page.getByTestId('chat-header-end-chat-button');
    }

    get confirmEndChatButton(): Locator {
        return this.page.getByTestId('prompt-end-chat-button');
    }

    get sentMessage(): Locator {
        return this.page.locator('#messagesListId');
    }


    async startChatWithExpert(): Promise<{ name: string; status: string }> {

        await this.closeConfirmEmailPopUp();
        const { name, status } = await this.checkExpertData();
        await this.startChat();
        return { name, status };

    }

    async closeConfirmEmailPopUp() {
        await test.step('Close email confirmation popup', async () => {
            await this.closePopUpButton.click();
            await this.waitForHidden(this.resendEmailPopUp);
        });
    }

    async checkExpertData(): Promise<{ name: string; status: string }> {
        return await test.step('Check expert data', async () => {
            const expertCardName = await this.expertCardName.innerText();
            const expertCardStatus = await this.expertCardStatus.innerText();
            return { name: expertCardName, status: expertCardStatus };
        });
    }

    async startDialogWithExpert(text: string){
        this.startChat();
        this.sendMessage(text);
    }

    async startChat() {
        await test.step('Click start chat button', async () => {
            await this.startChatButton.click();
        });

    }

    async sendMessage(text: string) {
        await test.step('Send message', async () => {
            await this.chatMessageTextarea.fill(text);
            await this.sendMessageButton.click();
        });
    }

    async addMoneyForAccount(data: CardData){
        this.clickContinueForPurchaseCredits();
        this.paymentProcess(data);
        this.closeDiscountPopUp
    }

    async clickContinueForPurchaseCredits() {
        await test.step('Click refill balance continue button', async () => {
            await this.waitForVisible(this.connectionPopUp);
            await this.waitForHidden(this.connectionPopUp);
            await this.waitForVisible(this.refillBalanceContinueButton, 10000);
            await this.refillBalanceContinueButton.click();
        });
    }

    async paymentProcess(data: CardData) {
        await test.step('Payment', async () => {
            await this.paymentFromCreditCard.click();
            await this.cardNumberInput.fill(data.number);
            await this.cardExpiryInput.fill(data.expiry);
            await this.cardCVVInput.fill(data.cvv);
            await this.cardOwnerInput.fill(data.owner);
            await this.submitButton.click();
            await this.waitForVisible(this.paymentSuccessMessage);
        });
    }
    async closeDiscountPopUp() {
        await test.step('Close discount button', async () => {
            if (await this.closePopUpButton.isVisible()) {
                await this.closeTopUpButton.click();
                await this.waitForHidden(this.discountPopUp);
            }
            await this.waitForVisible(this.connectionPopUp);
        });
    }



    async checkChatStarted() {
        await test.step('Check that chat is started', async () => {
            await this.waitForVisible(this.chatTimer);
            await this.waitForVisible(this.endChatButton);
        });

    }

    async checkSentMessage() {
        await test.step('Check sent message', async () => {
            await this.waitForVisible(this.sentMessage);
        });
    }

    async endChat() {
        await test.step('End chat', async () => {
            await this.endChatButton.click();
            await this.waitForVisible(this.confirmEndChatButton);
            await this.confirmEndChatButton.click();
            await this.waitForHidden(this.confirmEndChatButton);
        });

    }





}

