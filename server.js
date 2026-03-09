import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
import { put, get } from '@vercel/blob';

export default async function handler(req, res) {
    const { url, x, y } = req.query;
    
    // 1. Launch Browser
    const browser = await playwright.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true
    });

    // 2. iPad Emulation
    const context = await browser.newContext({
        viewport: { width: 834, height: 1194 },
        hasTouch: true,
        isMobile: true
    });

    const page = await context.newPage();
    await page.goto(url || 'https://google.com');

    // 3. Handle Touch Input
    if (x && y) {
        await page.touchscreen.tap(parseInt(x), parseInt(y));
        await page.waitForTimeout(600); // Wait for the page to react
    }

    // 4. Capture the "iPad Screen"
    const screenshot = await page.screenshot({ type: 'jpeg', quality: 70 });
    
    await browser.close();

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(screenshot);
}
