/**
 *  service
 */
import { factories } from "@strapi/strapi";
import { AsyncParser } from "@json2csv/node";

export default factories.createCoreService(
  "plugin::api-forms.submission",
  ({ strapi }) => ({
    async dashboard(params) {
      const { results, pagination } = await super.find(params, {
        populate: ["form"],
      });

      return { results, pagination };
    },

    async export(formId) {
      const { results } = await super.find({ where: { form: formId } });

      const data = results.map((result) => {
        return {
          ...JSON.parse(result.submission),
          createdAt: result.createdAt,
        };
      });

      const parser = new AsyncParser();

      return await parser.parse(data).promise();
    },
  })
);
