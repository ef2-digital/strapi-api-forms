"use strict";
/**
 *  controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("plugin::api-forms.form", ({ strapi }) => ({
    async dashboard(ctx) {
        const sanitizedQuery = await this.sanitizeQuery(ctx);
        const data = await strapi
            .service("plugin::api-forms.form")
            .dashboard(sanitizedQuery);
        return { data: data.results, meta: data.pagination };
    },
}));
