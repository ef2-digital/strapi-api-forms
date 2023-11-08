"use strict";
/**
 *  service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService("plugin::api-forms.submission", ({ strapi }) => ({
    async dashboard(params) {
        const { results, pagination } = await super.find(params, {
            populate: ["form"],
        });
        return { results, pagination };
    },
}));
