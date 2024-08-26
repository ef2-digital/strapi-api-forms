import { Strapi } from '@strapi/strapi';
const showdown = require('showdown');
const request = require('request');

import { FormType, NotificationType, SubmissionType, EmailSubmissionType } from '../../admin/src/utils/types';
import { contentTypes } from '@strapi/utils';

export default ({ strapi }: { strapi: Strapi }) => ({
	async process(notification: NotificationType, submission: SubmissionType, form: FormType) {
		if (!notification || !submission) {
			return;
		}

		const fields = JSON.parse(submission.submission);
		const provider = strapi.plugins['email'].services.email.getProviderSettings();
		const message = replaceDynamicVariables(notification.message, fields);
		const emailAddress = validateEmail(notification.to) ? notification.to : getValueFromSubmissionByKey(notification.to, fields);
		const converter = new showdown.Converter({
			tables: true,
			strikethrough: true,
		});

		if (!emailAddress) {
			strapi.log.error('No valid email address found');
			return;
		}

		const emailSubmission: EmailSubmissionType = {
			to: emailAddress,
			from: notification.from,
			subject: notification.subject,
			html: converter.makeHtml(message),
		};

		if (submission.files) {
			const files = await getFiles(submission, provider.provider);

			switch (provider.provider) {
				case 'mailgun':
					emailSubmission.attachment = files;
					break;
				default:
					emailSubmission.attachments = files;
					break;
			}
		}

		strapi.log.info('Sending email');
		strapi.log.info(JSON.stringify(emailSubmission));

		try {
			await strapi.plugins['email'].services.email.send(emailSubmission);
		} catch (error) {
			strapi.log.error('Something went wrong sending email: ' + error);
			strapi.log.error(JSON.stringify(error));
		}
	},
});

function validateEmail(emails) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emails.split(',').every((email) => pattern.test(email.trim()));
}

function getValueFromSubmissionByKey(key, submission) {
	return submission[key];
}

function replaceDynamicVariables(message, submission) {
	const pattern = /\*\*\s*(.*?)\s*\*\*\W*\*\*\1\*\*/;
	let match;

	while ((match = pattern.exec(message)) !== null) {
		const variableName = match[1].replace(/['"]/g, '');

		const variableValue = submission[variableName];

	    	message = message.replace(match[0], `**${variableName}:** ${variableValue ?? '-'}`);
	}

	const commentPattern = /<!--[\s\S]*?-->/g;
	message = message.replace(commentPattern, '');

	return message;
}

async function getFiles(submission, provider) {
	const files = await Promise.all(
		submission.files.map((file) => {
			const isAbsolute = /^(https?:\/\/)/.test(file.url);

			if (!isAbsolute) {
				let attachment = {};
				attachment['filename'] = file.name;
				attachment[provider === 'mailgun' ? 'data' : 'path'] = `${strapi.config.get('server.url')}${file.url}`;

				return attachment;
			}

			return request(`${file.url}`);
		})
	);

	return files;
}
