import { Builder, By, Key, until } from 'selenium-webdriver';
import { parse, parseAnnotations } from './parse';
import { makeOutputDirectory, outputMarkdown } from './output';
import config from './config';

const AMAZON_KINDLE_READER_URL = 'https://read.amazon.co.uk';
const NAV_WAIT_IN_MS = 10000;

async function runHighlightsScraper() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get(AMAZON_KINDLE_READER_URL);

        const originalWindowId = await driver.getWindowHandle();

        const signinButton = await driver.findElement(By.id('top-sign-in-btn'));
        await signinButton.click();

        const emailInput = await driver.findElement(By.id('ap_email'));
        await emailInput.sendKeys(config.loginEmail);

        const passwordInput = await driver.findElement(By.id('ap_password'));
        await passwordInput.sendKeys(config.loginPassword, Key.RETURN);

        const notesButton = await driver.findElement(By.id('notes_button'));
        await notesButton.click();

        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, NAV_WAIT_IN_MS);

        const windows = await driver.getAllWindowHandles();
        windows.forEach(async (windowId) => {
            if (windowId !== originalWindowId) {
                await driver.switchTo().window(windowId);
            }
        });

        const libraryElement = await driver.wait(until.elementLocated(By.id('library-section')), NAV_WAIT_IN_MS);
        const html = await libraryElement.getAttribute('innerHTML');

        const libraryItems = parse(html);

        makeOutputDirectory();

        for (const libraryItem of libraryItems) {
            const libraryItemLink = await driver.findElement(By.partialLinkText(libraryItem.title));
            await libraryItemLink.click();
            const annotationsElement = await driver.wait(
                until.elementLocated(By.id('annotation-section')),
                NAV_WAIT_IN_MS,
            );
            const annotationsHtml = await annotationsElement.getAttribute('innerHTML');
            const annotations = parseAnnotations(annotationsHtml);

            await outputMarkdown({ ...libraryItem, annotations });
        }
    } finally {
        setTimeout(() => {
            driver.quit();
        }, 5000);
    }
}

runHighlightsScraper();
