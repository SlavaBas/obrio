import { Page } from '@playwright/test';
import { AdminLoginPage } from './adminLoginPage';
import { AdminMainPage } from './adminMainPage';
import { ClientLoginPage } from './clientLoginPage';
import { ExpertDetailsPage } from './expertDetailsPage';
import { ChatPage } from './chatPage';


export class PageManager {
    private readonly page: Page;
    private readonly adminLoginPage: AdminLoginPage;
    private readonly adminMainPage: AdminMainPage;
    private readonly clientLoginPage: ClientLoginPage;
    private readonly expertDetailsPage: ExpertDetailsPage
    private readonly chatPage: ChatPage


    

    constructor(page: Page) {
        this.page = page;
        this.adminLoginPage = new AdminLoginPage(this.page)
        this.adminMainPage = new AdminMainPage(this.page)
        this.clientLoginPage = new ClientLoginPage(this.page)
        this.expertDetailsPage = new ExpertDetailsPage(this.page)
        this.chatPage = new ChatPage(this.page)

        
    }

    async navigateTo(url: string, options?: Parameters<Page['goto']>[1]) {
        await this.page.goto(url,  options);
    }

    onAdminLoginPage(){
        return this.adminLoginPage;
    }

    onAdminMainPage(){
        return this.adminMainPage;
    }

    onClientLoginPage(){
        return this.clientLoginPage;
    }

    onExpertDetailsPage(){
        return this.expertDetailsPage;
    }

     onChatPage(){
        return this.chatPage;
    }

 





}
