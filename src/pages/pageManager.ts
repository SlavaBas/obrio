import { Page} from '@playwright/test';
import { CRMPage } from './crmPage';
import { SignUpPage } from './signUpPage';
import { ExpertPage } from './expertPage';


export class PageManager {
    constructor(private readonly page: Page) {}

    private _crmPage?: CRMPage;
    private _signUpPage?: SignUpPage;
    private _expertPage?: ExpertPage;


    onCRMPage(): CRMPage {
        return this._crmPage ??= new CRMPage(this.page);
    }

    onSignUpPage(): SignUpPage {
        return this._signUpPage ??= new SignUpPage(this.page);
    }

    onExpertPage(): ExpertPage {
        return this._expertPage ??= new ExpertPage(this.page);
    }

    async navigateTo(url: string, options?: Parameters<Page['goto']>[1]) {
        await this.page.goto(url, options);
    }

    withPage(newPage: Page): PageManager {
        return new PageManager(newPage);
    }
}