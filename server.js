import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';

export default async function handler(req, res) {
    try {
        const browser = await playwright.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: true,
        });
        
        const context = await browser.newContext({
            viewport: { width: 834, height: 1194 },
            hasTouch: true
        });

        const page = await context.newPage();
        await page.goto(req.query.url || 'https://google.com', { waitUntil: 'networkidle' });

        const screenshot = await page.screenshot({ type: 'jpeg', quality: 60 });
        await browser.close();

        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(screenshot);
    } catch (error) {
        res.status(500).send("Browser failed to start: " + error.message);
    }
}
