"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService("plugin::api-forms.form", ({ strapi }) => ({
    async dashboard(params) {
        params = Object.assign({ ...params }, { populate: "*" });
        let { results, pagination } = await super.find(params);
        results = results.map((result) => {
            return {
                id: result.id,
                attributes: (({ id, ...object }) => object)(result),
            };
        });
        return { results, pagination };
    },
}));
