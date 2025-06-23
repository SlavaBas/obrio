import { request } from '@playwright/test';
import { test, expect } from '../src/fixtures/pageFixtures';
import { ApiHelper } from '../src/utils/apiHelper';
import { PageManager } from '../src/pages/pageManager';




test('expert start work ', async ({ pageManager, testData, page }) => {
  await pageManager.navigateTo(testData.getAdminUrl(), { waitUntil: 'networkidle' })
  await expect(page).toHaveTitle('AstroCRM');
  await pageManager.onAdminLoginPage().login('shumitska@gmail.com', 'Bn57!aF790');
  await pageManager.onAdminMainPage().startWork();
  await expect(pageManager.onAdminMainPage().stopWorkButton).toBeVisible();
  await expect(pageManager.onAdminMainPage().onlineText).toBeVisible();

  await pageManager.onAdminMainPage().stopWork();
  await expect(pageManager.onAdminMainPage().startWorkButton).toBeVisible();
  await expect(pageManager.onAdminMainPage().offlineText).toBeVisible();

});


test('create account', async ({ pageManager, testData, browser, page, }) => {
  await pageManager.navigateTo(testData.getClientUrl());
  await expect(page).toHaveTitle('Log In ✦ Nebula');
  // const splitIdCookie = await pageManager.onClientLoginPage().acceptCoockies(page);
  // expect(splitIdCookie).toBeTruthy();

  const message = await pageManager.onClientLoginPage().signUp(testData.getClientData());
  await expect(message).toEqual('You successfully created your account!')

  const context = await browser.newContext();
  const adminPage = await context.newPage();
  const adminManager = new PageManager(adminPage);
  await adminManager.navigateTo(testData.getAdminUrl(), { waitUntil: 'networkidle' })
  await expect(adminPage).toHaveTitle('AstroCRM');
  await adminManager.onAdminLoginPage().login('shumitska@gmail.com', 'Bn57!aF790');
  await adminManager.onAdminMainPage().startWork();
  await expect(adminManager.onAdminMainPage().stopWorkButton).toBeVisible();
  await expect(adminManager.onAdminMainPage().onlineText).toBeVisible();

  const apiContext = await request.newContext();
  const authApi = new ApiHelper(apiContext);
  const token = await authApi.login('shumitska@gmail.com', 'Bn57!aF790');
  const startBalance = await authApi.getBalance(token);


  await page.bringToFront();
  await pageManager.navigateTo(testData.getClientToExpertUrl());
  const { name, status } = await pageManager.onExpertDetailsPage().startChatWithExpert();
  await expect(name).toEqual('Test astrologer')
  await expect(status).toEqual('Online')
  await pageManager.onChatPage().sendMessage(testData.getMessage());
  await pageManager.onChatPage().clickContinueForPurchaseCredits();
  await pageManager.onChatPage().paymentProcess(testData.getCardData());
  await pageManager.onChatPage().closeDiscountPopUp();

  
  await adminPage.bringToFront();            
  await adminManager.onAdminMainPage().acceptChatRequest();


  await page.bringToFront();
  await pageManager.onChatPage().checkStartChat();
  await pageManager.onChatPage().sendMessage(testData.getMessage());
  await pageManager.onChatPage().checkSendedMessage();
  await page.waitForTimeout(30000);
  await pageManager.onChatPage().endChat();

  
  await adminPage.bringToFront();
  await adminManager.onAdminMainPage().stopWork();
  await expect(adminManager.onAdminMainPage().startWorkButton).toBeVisible();
  await expect(adminManager.onAdminMainPage().offlineText).toBeVisible();
  

  const endBalance = await authApi.getBalance(token);
  expect(endBalance).not.toEqual(startBalance);


});










