/**
 *  controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "plugin::api-forms.submission",
  ({ strapi }) => ({
    async post(ctx) {
      const { data } = ctx.request.body;

      if (!data) {
        return ctx.badRequest("No data");
      }

      const form = await strapi
        .service("plugin::api-forms.form")!
        .findOne(data.form);

      if (!form) {
        return ctx.badRequest("No form");
      }
      


      const submission = await strapi
        .service("plugin::api-forms.submission")!
        .create(ctx.request.body, { populate: ["form"] });

      return submission;
    },
    async dashboard(ctx) {
      const sanitizedQuery = await this.sanitizeQuery(ctx);

      const data = await strapi
        .service("plugin::api-forms.submission")!
        .dashboard(sanitizedQuery);

      return { data: data.results, meta: data.pagination };
    },
    async get(ctx) {
      const { id } = ctx.params;

      const data = await strapi
        .service("plugin::api-forms.submission")!
        .findOne(id, {
          populate: ["form "],
        });

      return {
        data: {
          id: data.id,
          attributes: (({ id, ...object }) => object)(data),
        },
      };
    },
  })
);
