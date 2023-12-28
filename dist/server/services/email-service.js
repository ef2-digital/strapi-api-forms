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
        const converter = new showdown.Converter({
            tables: true,
            strikethrough: true,
        });
        const emailAddress = validateEmail(notification.to)
            ? notification.to
            : getValueFromSubmissionByKey(notification.to, fields);
        strapi.log.info(JSON.stringify({
            to: emailAddress,
            from: notification.from,
            subject: notification.subject,
            html: converter.makeHtml(message),
        }));
        try {
            await strapi.plugins["email"].services.email.send({
                to: emailAddress,
                from: notification.from,
                subject: notification.subject,
                html: converter.makeHtml(message),
            });
        }
        catch (error) {
            strapi.log.error(error);
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
