import { test, expect, request as globalRequest } from '@playwright/test';



test('Login via API', async () => {
  const apiContext = await globalRequest.newContext();

  const response = await apiContext.post('https://stage-astrocrm.obrio.net/api/v1/auth/login', {
    headers: {
      
      'content-type': 'application/json'
    },

    data: {
      email: 'shumitska@gmail.com',
      password: 'Bn57!aF790'
    }
  });

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  const token = responseBody.data.access_token;
  console.log('Ответ:', token);



  const responseGet = await apiContext.get('https://stage-astrocrm.obrio.net/api/v1/auth/balance', {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'authorization': 'Bearer ' + token
      
    }
  });

  expect(responseGet.ok()).toBeTruthy();

  const balanceData = await responseGet.json();
  const balance = balanceData.data.balance;
  console.log('Balance:', balance);

});


