"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  service
 */
const strapi_1 = require("@strapi/strapi");
const node_1 = require("@json2csv/node");
exports.default = strapi_1.factories.createCoreService('plugin::api-forms.submission', ({ strapi }) => ({
    async dashboard(params) {
        const { results, pagination } = await super.find(params, {
            populate: ['form']
        });
        return { results, pagination };
    },
    async export(formId) {
        const { results } = await super.find({ where: { form: formId } });
        const data = results.map((result) => {
            return {
                ...JSON.parse(result.submission),
                createdAt: result.createdAt
            };
        });
        const parser = new node_1.AsyncParser();
        return await parser.parse(data).promise();
    },
    async upload(file) {
        try {
            const createdFiles = await strapi.plugins.upload.services.upload.upload({
                data: {
                    fileInfo: {
                        name: file.name,
                        caption: file.name,
                        alternativeText: file.name
                    }
                },
                files: file
            });
            return createdFiles[0];
        }
        catch (error) {
            strapi.log.error(error);
        }
    }
}));
