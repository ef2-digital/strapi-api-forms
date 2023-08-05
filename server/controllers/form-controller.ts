/**
 *  controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "plugin::api-forms.form",
  ({ strapi }) => ({
    async dashboard(ctx) {
      const sanitizedQuery = await this.sanitizeQuery(ctx);

      const data = await strapi
        .service("plugin::api-forms.form")!
        .dashboard(sanitizedQuery);

      return { data: data.results, meta: data.pagination };
    },
  })
);
