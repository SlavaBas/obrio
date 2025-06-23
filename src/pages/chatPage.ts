import { Page, Locator, FrameLocator } from '@playwright/test';
import { HelperBase } from '../utils/helperBase';
import { CardData} from '../utils/testData';



export class ChatPage extends HelperBase {


    readonly chatMessageTextarea: Locator;
    readonly sendMessageButton: Locator;
    readonly connectionPopUp: Locator;
    readonly refillBalanceContinueButton: Locator;
    readonly paymentFromCreditCard: Locator;
    readonly frame: FrameLocator;
    readonly cardNumberInput: Locator;
    readonly cardExpiryInput: Locator;
    readonly cardCVVInput: Locator;
    readonly cardOwnerInput: Locator;
    readonly submitButton: Locator;
    readonly closeTopUpButtom: Locator;
    readonly paymentSuccessfullMessage: Locator;
    readonly discountPopUp: Locator;
    readonly chatTimer: Locator;
    readonly sendedMessage: Locator;
    readonly endChatButton: Locator;
    readonly confirmEndChatButton: Locator;



    constructor(page: Page) {
        super(page);
        this.chatMessageTextarea = page.getByTestId('chat-message-textarea');
        this.sendMessageButton = page.getByTestId('send-message-button');
        this.connectionPopUp = page.getByTestId('connection-pop-up');
        this.refillBalanceContinueButton = page.getByTestId('top-up-refill-credits-btn');
        this.paymentFromCreditCard = page.getByTestId('payment-form-credit-card-option');
        this.frame = page.frameLocator('#solid-payment-form-iframe');
        this.cardNumberInput = this.frame.locator('#ccnumber');
        this.cardExpiryInput = this.frame.locator('#cardExpiry');
        this.cardCVVInput = this.frame.locator('#cvv2');
        this.cardOwnerInput = this.frame.locator('#nameoncard');
        this.submitButton = this.frame.getByTestId('submit-button');
        this.paymentSuccessfullMessage = page.getByText('Payment successful')
        this.closeTopUpButtom = page.getByTestId('close-button');
        this.discountPopUp = page.locator('div[data-sentry-component="PackageDiscountPromoOffer"]')
        this.chatTimer = page.getByTestId('chat-header-timer');
        this.endChatButton = page.getByTestId('chat-header-end-chat-button');
        this.confirmEndChatButton = page.getByTestId('prompt-end-chat-button');
        this.sendedMessage = page.locator('#messagesListId');


    }

    async sendMessage(text: string) {
        await this.chatMessageTextarea.fill(text);
        await this.sendMessageButton.click();
    }


    async clickContinueForPurchaseCredits() {
        await this.waitForVisible(this.connectionPopUp);
        await this.waitForHidden(this.connectionPopUp);
        await this.waitForVisible(this.refillBalanceContinueButton, 10000);
    }

    async paymentProcess(data: CardData) {
        await this.refillBalanceContinueButton.click();
        await this.waitForVisible(this.paymentFromCreditCard);
        await this.paymentFromCreditCard.click();
        await this.cardNumberInput.fill(data.number);
        await this.cardExpiryInput.fill(data.expiry);
        await this.cardCVVInput.fill(data.cvv);
        await this.cardOwnerInput.fill(data.owner);
        await this.submitButton.click();
        await this.waitForVisible(this.paymentSuccessfullMessage);
    }
     async closeDiscountPopUp(){
        await this.waitForVisible(this.discountPopUp);
        await this.closeTopUpButtom.click();
        await this.waitForHidden(this.discountPopUp);
        await this.waitForVisible(this.connectionPopUp);
     }

     async checkStartChat() {
        await this.waitForVisible(this.chatTimer);
        await this.waitForVisible(this.endChatButton);

     }

     async checkSendedMessage() {
        await this.waitForVisible(this.sendedMessage);
     }

     async endChat() {
        await this.endChatButton.click();
        await this.waitForVisible(this.confirmEndChatButton);
        await this.confirmEndChatButton.click();
        await this.waitForHidden(this.confirmEndChatButton);

     }





}

