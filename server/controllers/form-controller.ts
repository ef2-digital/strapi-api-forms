/**
 *  controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "plugin::api-forms.form",
  ({ strapi }) => ({
    async submissions(ctx) {
      const { id } = ctx.params;

      const data = await strapi.service("plugin::api-forms.form")!.findOne(id, {
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
        .service("plugin::api-forms.form")!
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
        .service("plugin::api-forms.form")!
        .dashboard(sanitizedQuery);

      return { data: data.results, meta: data.pagination };
    },
  })
);
