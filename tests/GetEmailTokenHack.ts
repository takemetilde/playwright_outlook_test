import {Page} from "@playwright/test";

class GetEmailTokenHack {
    async getToken(page: Page): Promise<string> {
        await page.goto('https://developer.microsoft.com/en-us/graph/graph-explorer');
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('button', {name: 'Sign in'}).click();
        const page1 = await page1Promise;
        await page1.getByRole('textbox', {name: 'Enter your email, phone, or'}).fill('****.autotest@outlook.com');
        await page1.getByRole('button', {name: 'Next'}).click();
        if (await page1.locator('//input[@type="password"]').isVisible({timeout: 10000})) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            await page1.locator('//input[@type="password"]').fill('******');
            if (await page1.getByRole('button', {name: 'Sign in'}).isVisible())
                await page1.getByRole('button', {name: 'Sign in'}).click();
            else
                await page1.getByRole('button', {name: 'Next'}).click();
            await page1.getByRole('button', {name: 'Yes'}).click();
        }
        await page.getByRole('tab', {name: 'Access token'}).click();
        return await page.locator('#access-token').textContent({timeout: 60000});
    }
}

export default new GetEmailTokenHack();
