import { L, r, T } from '@faker-js/faker/dist/airline-BUL6NtOJ';
import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../utils/helperBase';
import { ClientData} from '../utils/testData';


export class ClientLoginPage extends HelperBase {
    readonly acceptCoockieButton: Locator;
    readonly signUpButton: Locator;
    readonly createAnAccountText: Locator;
    readonly genderOptions: Locator[];
    readonly nameField: Locator;
    readonly submitButton: Locator;
    readonly dayField: Locator;
    readonly monthField: Locator;
    readonly yearField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly confirmPassordField: Locator;
    readonly privacyConsentCheckbox: Locator;
    readonly emailConsentCheckbox: Locator;
    readonly loader: Locator;
    readonly letsGoButton: Locator;
    readonly createdAccountText: Locator;
    
    


    constructor(page: Page) {
        super(page);
        this.acceptCoockieButton = page.locator('#onetrust-accept-btn-handler');
        this.signUpButton = page.getByText('Sign up');
        this.createAnAccountText = page.getByText('Create an account');
        this.genderOptions = [
            page.getByTestId('man-radio-button'),
            page.getByTestId('woman-radio-button')
        ];
        this.nameField = page.getByTestId('name-field');
        this.submitButton = page.getByTestId('submit-button');
        this.dayField = page.locator('select#day');
        this.monthField = page.locator('select#month');
        this.yearField = page.locator('select#year');
        this.emailField = page.getByTestId('email-field');
        this.passwordField = page.getByTestId('password-field');
        this.confirmPassordField = page.getByTestId('confirm-password-field');
        this.privacyConsentCheckbox = page.locator('label', { has: page.locator('#privacyConsent') });
        this.emailConsentCheckbox = page.locator('label', { has: page.locator('#emailConsent') });
        this.loader = page.locator('.MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate');
        this.letsGoButton = page.getByTestId('lets-go-button');
        this.createdAccountText = page.getByTestId('page-title');


    }

    async acceptCoockies(page: Page) {
        await this.waitForVisible(this.acceptCoockieButton);
        await this.acceptCoockieButton.click()
        await this.waitForHidden(this.acceptCoockieButton)

        const cookies = await page.context().cookies();
        const splitIdCookie = cookies.find(cookie => cookie.name === 'OptanonAlertBoxClosed');
        return splitIdCookie;
    }

    async signUp(data: ClientData):Promise<string> {
        await this.waitForVisible(this.signUpButton);
        await this.signUpButton.click();
        await this.waitForVisible(this.createAnAccountText);
        await this.chooseRandomGender();
        await this.nameField.fill(data.name);
        await this.submitButton.click();
        await this.waitForVisible(this.dayField);
        await this.dayField.selectOption(data.day);
        await this.monthField.selectOption(data.month);
        await this.yearField.selectOption(data.year);
        await this.submitButton.click();
        await this.emailField.fill(data.email);
        await this.passwordField.fill(data.password);
        await this.confirmPassordField.fill(data.password);
        await this.privacyConsentCheckbox.click();
        await this.emailConsentCheckbox.click();
        await this.submitButton.click();
        await this.waitForHidden(this.loader);
        await this.waitForVisible(this.letsGoButton);
        const message = await this.createdAccountText.innerText();
        await this.letsGoButton.click();

        return message;
    }



    async chooseRandomGender() {
        const gender = this.genderOptions[Math.floor(Math.random() * this.genderOptions.length)];
        await gender.check();
        await gender.isChecked();
    }
}
