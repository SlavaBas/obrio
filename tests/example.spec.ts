import { request } from '@playwright/test';
import { test, expect } from '../src/fixtures/pageFixtures';
import { ApiHelper } from '../src/utils/apiHelper';
import { PageManager } from '../src/pages/pageManager';




test('expert start work ', async ({ pageManager, testData, page }) => {
  await pageManager.navigateTo(testData.getAdminUrl(), { waitUntil: 'networkidle' })
  await expect(page).toHaveTitle('AstroCRM');
  await pageManager.onCRMPage().login('shumitska@gmail.com', 'Bn57!aF790');
  await pageManager.onCRMPage().startWork();
  await expect(pageManager.onCRMPage().stopWorkButton).toBeVisible();
  await expect(pageManager.onCRMPage().onlineText).toBeVisible();

  await pageManager.onCRMPage().stopWork();
  await expect(pageManager.onCRMPage().startWorkButton).toBeVisible();
  await expect(pageManager.onCRMPage().offlineText).toBeVisible();

});


test('create account', async ({ pageManager, testData, browser, page, }) => {
  await pageManager.navigateTo(testData.getClientUrl());
  await expect(page).toHaveTitle('Log In ✦ Nebula');
  // const splitIdCookie = await pageManager.onSignUpPage().acceptCoockies(page);
  // expect(splitIdCookie).toBeTruthy();

  const message = await pageManager.onSignUpPage().signUpNewUser(testData.getClientData());
  await expect(message).toEqual('You successfully created your account!')

  const context = await browser.newContext();
  const adminPage = await context.newPage();
  const adminManager = new PageManager(adminPage);
  await adminManager.navigateTo(testData.getAdminUrl(), { waitUntil: 'networkidle' })
  await expect(adminPage).toHaveTitle('AstroCRM');
  await adminManager.onCRMPage().login('shumitska@gmail.com', 'Bn57!aF790');
  await adminManager.onCRMPage().startWork();
  await expect(adminManager.onCRMPage().stopWorkButton).toBeVisible();
  await expect(adminManager.onCRMPage().onlineText).toBeVisible();

  const apiContext = await request.newContext();
  const authApi = new ApiHelper(apiContext);
  const token = await authApi.login('shumitska@gmail.com', 'Bn57!aF790');
  const startBalance = await authApi.getBalance(token);


  await page.bringToFront();
  await pageManager.navigateTo(testData.getClientToExpertUrl());
  const { name, status } = await pageManager.onExpertPage().startChatWithExpert();
  await expect(name).toEqual('Test astrologer')
  await expect(status).toEqual('Online')
  await pageManager.onExpertPage().sendMessage(testData.getMessage());
  await pageManager.onExpertPage().clickContinueForPurchaseCredits();
  await pageManager.onExpertPage().paymentProcess(testData.getCardData());
  await pageManager.onExpertPage().closeDiscountPopUp();

  
  await adminPage.bringToFront();            
  await adminManager.onCRMPage().acceptChatRequest();


  await page.bringToFront();
  await pageManager.onExpertPage().checkChatStarted();
  await pageManager.onExpertPage().sendMessage(testData.getMessage());
  await pageManager.onExpertPage().checkSentMessage();
  await page.waitForTimeout(30000);
  await pageManager.onExpertPage().endChat();

  
  await adminPage.bringToFront();
  await adminManager.onCRMPage().stopWork();
  await expect(adminManager.onCRMPage().startWorkButton).toBeVisible();
  await expect(adminManager.onCRMPage().offlineText).toBeVisible();


  const endBalance = await authApi.getBalance(token);
  expect(endBalance).not.toEqual(startBalance);


});










