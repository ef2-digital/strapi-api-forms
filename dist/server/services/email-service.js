"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const showdown = require("showdown");
const date_fns_1 = require("date-fns");
exports.default = ({ strapi }) => ({
    async process(notification, submission, form) {
        if (!notification || !submission) {
            return;
        }
        const parsedData = Object.assign({
            submission: {
                createdAt: (0, date_fns_1.format)((0, date_fns_1.parseISO)(submission.createdAt), "dd-MM-yyyy HH:mm"),
                fields: JSON.parse(submission.submission),
            },
        });
        const message = replaceDynamicVariables(notification.message, JSON.parse(submission.submission));
        const converter = new showdown.Converter({
            tables: true,
            strikethrough: true,
        });
        console.info({
            to: notification.to,
            from: notification.from,
            subject: notification.subject,
            html: converter.makeHtml(message),
        });
        try {
            await strapi.plugins["email"].services.email.send({
                to: validateEmail(notification.to)
                    ? notification.to
                    : getValueFromSubmissionByKey(notification.to, parsedData.fields),
                from: notification.from,
                subject: notification.subject,
                html: converter.makeHtml(message),
            });
        }
        catch (err) {
            console.error(err);
        }
    },
});
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
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
