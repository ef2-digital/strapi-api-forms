"use strict";
/**
 *  controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("plugin::api-forms.form", ({ strapi }) => ({
    async submissions(ctx) {
        const { id } = ctx.params;
        const data = await strapi.service("plugin::api-forms.form").findOne(id, {
            populate: {
                submissions: { sort: "createdAt:desc", offset: 0, limit: 999 },
            },
            sort: "createdAt:desc",
        });
        return {
            data: {
                id: data.id,
                attributes: (({ id, ...object }) => object)(data),
            },
        };
    },
    async get(ctx) {
        const { id } = ctx.params;
        const data = await strapi
            .service("plugin::api-forms.form")
            .findOne(id, { populate: "*" });
        return {
            data: {
                id: data.id,
                attributes: (({ id, ...object }) => object)(data),
            },
        };
    },
    async dashboard(ctx) {
        const sanitizedQuery = await this.sanitizeQuery(ctx);
        const data = await strapi
            .service("plugin::api-forms.form")
            .dashboard(sanitizedQuery);
        return { data: data.results, meta: data.pagination };
    },
}));
