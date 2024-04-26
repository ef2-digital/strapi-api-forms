"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ForbiddenError } = require("@strapi/utils").errors;
exports.default = {
    async afterCreate(event) {
        const { result, params } = event;
        if (!result.id) {
            throw new ForbiddenError("No form");
        }
        const defaultEmail = await strapi.plugins["email"].services.email.getProviderSettings().settings.defaultFrom;
        const message = JSON.parse(result.fields).map((field) => {
            if (field.type === 'file') {
                return '';
            }
            return '**' + field.label + '**: **' + field.name + '**<!--rehype:style=font-size: 12px;color: white; background: #4945ff;padding:4px; padding-right: 16px;padding-left: 16px;border-radius: 4px;-->\\';
        });
        const notification = await strapi.entityService.create("plugin::api-forms.notification", {
            data: {
                form: result.id,
                enabled: true,
                identifier: "notification",
                service: "emailService",
                from: defaultEmail,
                to: defaultEmail,
                message: message.join("\n").toString(),
                subject: "New submission from API form: " + result.title,
            },
        });
        const confirmation = await strapi.entityService.create("plugin::api-forms.notification", {
            data: {
                form: result.id,
                enabled: false,
                identifier: "confirmation",
                service: "emailService",
                from: defaultEmail,
                to: "",
                subject: "",
                message: message.join("\n").toString(),
            },
        });
        return [confirmation, notification];
    },
};
