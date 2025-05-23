import {test, expect} from '@playwright/test';
import getEmailToken from "./GetEmailTokenHack";
import readEmails from "./ReadEmails";

test('has title', async ({page}) => {
    let accessToken = await getEmailToken.getToken(page);
    let response = await readEmails.getEmails(accessToken);
    console.log(response[0]['bodyPreview']);
    console.log(await readEmails.parseEmailToken(response[0]['bodyPreview']));


    await page.goto('https://playwright.dev/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', {name: 'Get started'}).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
});