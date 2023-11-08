/**
 *  service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "plugin::api-forms.submission",
  ({ strapi }) => ({
    async dashboard(params) {
      const { results, pagination } = await super.find(params, {
        populate: ["form"],
      });

      return { results, pagination };
    },
  })
);
