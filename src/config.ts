import * as path from 'path';

if (!process.env.AMAZON_EMAIL_ADDRESS) throw new Error('AMAZON_EMAIL_ADDRESS must be set');
if (!process.env.AMAZON_PASSWORD) throw new Error('AMAZON_PASSWORD must be set');

const HOME_PATH = process.env.HOME || process.env.USERPROFILE || '';

function getFolderPath() {
    const outputFolderLocation = process.env.OUTPUT_FOLDER_LOCATION || 'output';
    const absolutePath = path.join(HOME_PATH, outputFolderLocation, 'Kindle Highlights');
    return absolutePath;
}

const config = {
    loginEmail: process.env.AMAZON_EMAIL_ADDRESS,
    loginPassword: process.env.AMAZON_PASSWORD,
    outputFolderPath: getFolderPath(),
};

export default config;
