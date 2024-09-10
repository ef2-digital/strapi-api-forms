export const CONTACT_FIELDS = [
	{
		name: 'Bedrijfsnaam',
		label: 'Bedrijfsnaam',
		type: 'text',
		options: [],
		config: { required: true, ui: { width: '100%', classNames: '', hideLabel: false } },
	},
	{
		name: 'Voornaam',
		label: 'Voornaam',
		type: 'text',
		options: [],
		config: { required: true, ui: { width: '33%', classNames: '', hideLabel: false } },
	},
	{
		name: 'Tussenvoegsel',
		label: 'Tussenvoegsel',
		type: 'text',
		options: [],
		config: { required: false, ui: { width: '33%', classNames: '', hideLabel: false } },
	},
	{
		name: 'Achternaam',
		label: 'Achternaam',
		type: 'text',
		options: [],
		config: { required: true, ui: { width: '33%', classNames: '', hideLabel: false } },
	},
	{
		name: 'E-mailadres',
		label: 'E-mailadres',
		type: 'email',
		options: [],
		config: { required: true, ui: { width: '100%', classNames: '', hideLabel: false } },
	},
	{
		name: 'Vraag',
		label: 'Vraag',
		type: 'textarea',
		options: [],
		config: { required: false, ui: { width: '100%', classNames: '', hideLabel: false } },
	},
];
export const NEWSLETTER_FIELDS = [
	{
		name: 'E-mailadres',
		label: 'E-mailadres',
		type: 'email',
		options: [],
		config: { required: true, ui: { width: '100%', classNames: '', hideLabel: false } },
	},
];

export const SUCCESS_MESSAGE =
	'<h3>Bericht succesvol verzonden</h3><p>Uw bericht is succesvol verzonden, wij nemen spoedig contact met u op.</p>';
export const ERROR_MESSAGE = '<h3>Er is iets mis gegaan</h3><p>Er is iets mis gegaan, probeer het later opnieuw.</p>';

export const seedFormExists = async (strapi, form) => {
	const [seedForm] = await strapi.entityService.findMany('plugin::api-forms.form', {
		filters: {
			title: form,
		},
	});
	return !!seedForm;
};

export const createSeedForm = async (strapi, form) => {
	const response = await strapi.entityService
		.create('plugin::api-forms.form', {
			data: form,
		})
		.catch((error) => {
			console.log('Error creating form', JSON.stringify(error));
		});

	return response;
};
