import { faker } from '@faker-js/faker';
import { S } from '@faker-js/faker/dist/airline-BUL6NtOJ';



export interface CardData {
    number: string;
    expiry: string;
    cvv: string;
    owner: string;
};

export interface AdminUrl {
    adminUrl: string;
}

export interface ClientUrl {
    clientUrl: string;
}

export interface ClientToExpertURL {
    clientUrl: string;
}


export interface ClientData {
    name: string;
    day: string;
    month: string;
    year: string;
    email: string;
    password: string;
}


export interface Mesage {
    message: string;
}
export class TestData {

    getCardData() {
        return {
            number: '4067429974719265',
            expiry: '1234',
            cvv: '123',
            owner: 'Name Surname'
        };
    }

    getAdminUrl(): string {
        return 'https://stage-astrocrm.obrio.net/login';

    }

    getClientUrl(): string {
        return 'https://stage-asknebula.asknebula.com/app/login';
    }

    getClientToExpertUrl(): string {
        return 'https://stage-asknebula.asknebula.com/app/expert/9bbab846-377a-447c-bfa9-30846dec07ea';
    }


    getClientData(): ClientData {
        const date = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

        return {
            name: faker.person.firstName(),
            day: date.getDate().toString(),
            month: faker.date.month({ abbreviated: true }),
            year: date.getFullYear().toString(),
            email: faker.internet.email({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                provider: 'ukr.net',
            }),
            password: '12345aQ'
        };
    }

    getMessage(): string {
        return 'Lorem ipsum'
    }


}