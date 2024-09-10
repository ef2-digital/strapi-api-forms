import { seedFormExists, createSeedForm, SUCCESS_MESSAGE, ERROR_MESSAGE, CONTACT_FIELDS, NEWSLETTER_FIELDS } from './form';

export const generateSeedData = async (strapi) => {
	const formExists = await seedFormExists(strapi, 'Contact');
	const newsLetterExists = await seedFormExists(strapi, 'Newsletter');

	if (formExists && newsLetterExists) {
		strapi.log.info('Form already exists');

		return;
	}

	return await Promise.all([
		!formExists &&
			createSeedForm(strapi, {
				title: 'Contact',
				successMessage: SUCCESS_MESSAGE,
				errorMessage: ERROR_MESSAGE,
				fields: JSON.stringify(CONTACT_FIELDS),
				active: 1,
			}),
		!newsLetterExists &&
			createSeedForm(strapi, {
				title: 'Newsletter',
				successMessage: SUCCESS_MESSAGE,
				errorMessage: ERROR_MESSAGE,
				fields: JSON.stringify(NEWSLETTER_FIELDS),
				active: 1,
			}),
	]).catch((e) => {
		strapi.log.error('error during generating seed data! Stopping the application...');
		throw new Error(e);
	});
};
