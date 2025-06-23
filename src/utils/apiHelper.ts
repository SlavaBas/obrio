import { APIRequestContext, expect } from '@playwright/test';

export class ApiHelper {
  constructor(private api: APIRequestContext) {}

  async login(email: string, password: string): Promise<string> {
    const response = await this.api.post('https://stage-astrocrm.obrio.net/api/v1/auth/login', {
      headers: { 'content-type': 'application/json' },
      data: { email, password },
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    return responseBody.data.access_token;
  }

  async getBalance(token: string): Promise<number> {
    const response = await this.api.get('https://stage-astrocrm.obrio.net/api/v1/auth/balance', {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'authorization': `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    return data.data.balance;
  }
}