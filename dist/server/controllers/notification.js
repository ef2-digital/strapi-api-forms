"use strict";
/**
 *  controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("plugin::api-forms.notification", ({ strapi }) => ({
    async updateNotification(ctx) {
        const { id } = ctx.params;
        const { enabled, ...data } = ctx.request.body;
        const notification = await strapi
            .service("plugin::api-forms.notification")
            .update(id, data);
        return {
            data: {
                id: notification.id,
                attributes: (({ id, ...object }) => object)(notification),
            },
        };
    },
}));
