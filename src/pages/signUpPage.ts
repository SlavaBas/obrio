import { Page, Locator, Cookie, test } from '@playwright/test';
import { HelperBase } from '../utils/helperBase';
import { ClientData } from '../utils/testData';


export class SignUpPage extends HelperBase {
    constructor(page: Page) {
        super(page);
    }

    get acceptCoockieButton(): Locator {
        return this.page.locator('#onetrust-accept-btn-handler');
    }

    get signUpButton(): Locator {
        return this.page.getByText('Sign up');
    }

    get createAnAccountText(): Locator {
        return this.page.getByText('Create an account');
    }

    get genderOptions(): Locator[] {
        return [
            this.page.getByTestId('man-radio-button'),
            this.page.getByTestId('woman-radio-button')
        ];
    }

    get nameField(): Locator {
        return this.page.getByTestId('name-field');
    }

    get submitButton(): Locator {
        return this.page.getByTestId('submit-button');
    }

    get dayField(): Locator {
        return this.page.locator('select#day');
    }

    get monthField(): Locator {
        return this.page.locator('select#month');
    }

    get yearField(): Locator {
        return this.page.locator('select#year');
    }

    get emailField(): Locator {
        return this.page.getByTestId('email-field');
    }

    get passwordField(): Locator {
        return this.page.getByTestId('password-field');
    }

    get confirmPassordField(): Locator {
        return this.page.getByTestId('confirm-password-field');
    }

    get privacyConsentCheckbox(): Locator {
        return this.page.locator('label', { has: this.page.locator('#privacyConsent') });
    }

    get emailConsentCheckbox(): Locator {
        return this.page.locator('label', { has: this.page.locator('#emailConsent') });
    }

    get loader(): Locator {
        return this.page.locator('.MuiCircularProgress-circle.MuiCircularProgress-circleIndeterminate');
    }

    get letsGoButton(): Locator {
        return this.page.getByTestId('lets-go-button');
    }

    get createdAccountText(): Locator {
        return this.page.getByTestId('page-title');
    }



    async acceptCookies(): Promise<Cookie | undefined> {
        return await test.step('Accept cookies and return Optanon cookie', async () => {
            if (await this.acceptCoockieButton.isVisible({ timeout: 3000 })) {
                await this.acceptCoockieButton.click();
                await this.waitForHidden(this.acceptCoockieButton);
            }
            const cookies = await this.page.context().cookies();
            return cookies.find(cookie => cookie.name === 'OptanonAlertBoxClosed');
        });
    }



    async signUpNewUser(data: ClientData): Promise<string> {
        await test.step('Open registration form', async () => {
            await this.signUpButton.click();
        });

        await test.step('Fill first regastration page', async () => {
            await this.chooseRandomGender();
            await this.nameField.fill(data.name);
        });
        await test.step('Submit first regastration page', async () => {
            await this.submitButton.click();
        });
        await test.step('Fill second regastration page', async () => {
            await this.dayField.selectOption(data.day);
            await this.monthField.selectOption(data.month);
            await this.yearField.selectOption(data.year);
        });
        await test.step('Submit second regastration page', async () => {
            await this.submitButton.click();
        });
        await test.step('Fill third  regastration page', async () => {
            await this.emailField.fill(data.email);
            await this.passwordField.fill(data.password);
            await this.confirmPassordField.fill(data.password);
            await this.privacyConsentCheckbox.click();
            await this.emailConsentCheckbox.click();
        });
        await test.step('Submit third regastration page', async () => {
            await this.submitButton.click();
        });
        return await test.step('Confirm successful registration', async () => {
            await this.waitForHidden(this.loader);
            const message = await this.createdAccountText.innerText();
            await this.letsGoButton.click();

            return message;
        });
    }



    async chooseRandomGender() {
        const gender = this.genderOptions[Math.floor(Math.random() * this.genderOptions.length)];
        await gender.check();
        await gender.isChecked();
    }
}
