"use strict";
/**
 *  controller
 */
//@ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("plugin::api-forms.submission", ({ strapi }) => ({
    async post(ctx) {
        const { form, submission } = ctx.request.body;
        const parsedSubmission = JSON.parse(submission);
        const files = [];
        if (!form && !parsedSubmission) {
            return ctx.badRequest("No data");
        }
        const strapiForm = await strapi
            .service("plugin::api-forms.form")
            .findOne(form);
        if (!strapiForm) {
            return ctx.badRequest("No form");
        }
        if (ctx.request.files) {
            await Promise.all(Object.entries(ctx.request.files).map(async ([key, file]) => {
                const uploadedFile = await strapi
                    .service("plugin::api-forms.submission")
                    .upload(file);
                if (uploadedFile) {
                    files.push(uploadedFile);
                }
            }));
        }
        const postedSubmission = await strapi
            .service("plugin::api-forms.submission")
            .create({ data: { form, submission: JSON.stringify(parsedSubmission), files }, populate: ["form", "files"] });
        return postedSubmission;
    },
    async dashboard(ctx) {
        const sanitizedQuery = await this.sanitizeQuery(ctx);
        const data = await strapi
            .service("plugin::api-forms.submission")
            .dashboard(sanitizedQuery);
        return { data: data.results, meta: data.pagination };
    },
    async export(ctx) {
        const { formId } = ctx.params;
        return {
            data: await strapi
                .service("plugin::api-forms.submission")
                .export(formId),
            filename: `export-${formId}-${Math.random()}.csv`,
        };
    },
    async get(ctx) {
        const { id } = ctx.params;
        const data = await strapi
            .service("plugin::api-forms.submission")
            .findOne(id, {
            populate: ["form", "files"],
        });
        return {
            data: {
                id: data.id,
                attributes: (({ id, ...object }) => object)(data),
            },
        };
    },
}));
