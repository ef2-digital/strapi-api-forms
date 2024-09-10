"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeedData = void 0;
const form_1 = require("./form");
const generateSeedData = async (strapi) => {
    const formExists = await (0, form_1.seedFormExists)(strapi, 'Contact');
    const newsLetterExists = await (0, form_1.seedFormExists)(strapi, 'Newsletter');
    if (formExists && newsLetterExists) {
        strapi.log.info('Form already exists');
        return;
    }
    return await Promise.all([
        !formExists &&
            (0, form_1.createSeedForm)(strapi, {
                title: 'Contact',
                successMessage: form_1.SUCCESS_MESSAGE,
                errorMessage: form_1.ERROR_MESSAGE,
                fields: JSON.stringify(form_1.CONTACT_FIELDS),
                active: 1,
            }),
        !newsLetterExists &&
            (0, form_1.createSeedForm)(strapi, {
                title: 'Newsletter',
                successMessage: form_1.SUCCESS_MESSAGE,
                errorMessage: form_1.ERROR_MESSAGE,
                fields: JSON.stringify(form_1.NEWSLETTER_FIELDS),
                active: 1,
            }),
    ]).catch((e) => {
        strapi.log.error('error during generating seed data! Stopping the application...');
        throw new Error(e);
    });
};
exports.generateSeedData = generateSeedData;
