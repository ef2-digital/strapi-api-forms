"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const showdown = require("showdown");
exports.default = ({ strapi }) => ({
    async process(notification, submission, form) {
        if (!notification || !submission) {
            return;
        }
        const fields = JSON.parse(submission.submission);
        const message = replaceDynamicVariables(notification.message, fields);
        let files = [];
        const converter = new showdown.Converter({
            tables: true,
            strikethrough: true,
        });
        const emailAddress = validateEmail(notification.to)
            ? notification.to
            : getValueFromSubmissionByKey(notification.to, fields);
        if (submission.files) {
            files = submission.files.map((file) => {
                return {
                    filename: file.name,
                    path: `${strapi.config.get('server.url')}${file.url}`,
                };
            });
        }
        try {
            strapi.log.info(JSON.stringify({
                to: emailAddress,
                from: notification.from,
                subject: notification.subject,
                html: converter.makeHtml(message),
            }));
            await strapi.plugins["email"].services.email.send({
                to: 'daan@ef2.nl',
                from: 'daan@ef2.nl',
                subject: notification.subject,
                html: converter.makeHtml(message),
                attachments: files !== null && files !== void 0 ? files : [],
            });
        }
        catch (error) {
            strapi.log.error('Something went wrong: ' + error);
            console.log(JSON.stringify(error));
        }
    },
});
function validateEmail(emails) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.split(",").every((email) => pattern.test(email.trim()));
}
function getValueFromSubmissionByKey(key, submission) {
    return submission[key];
}
function replaceDynamicVariables(message, submission) {
    const pattern = /\*\*\s*(.*?)\s*\*\*/g;
    let match;
    while ((match = pattern.exec(message)) !== null) {
        const variableName = match[1].replace(/['"]/g, "");
        const variableValue = submission[variableName];
        if (variableValue !== undefined) {
            message = message.replace(match[0], variableValue);
        }
    }
    const commentPattern = /<!--[\s\S]*?-->/g;
    message = message.replace(commentPattern, "");
    return message;
}
