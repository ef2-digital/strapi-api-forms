"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService("plugin::api-forms.notification", ({ strapi }) => ({
    async process(handler, submission, form) {
        return await strapi
            .plugin("api-forms")
            .service(handler.service)
            .process(handler, submission, form);
    },
}));
