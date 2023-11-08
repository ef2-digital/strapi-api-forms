//@ts-nocheck
import { factories } from "@strapi/strapi";
import { FormType } from "../../admin/src/utils/types";

export default factories.createCoreService(
  "plugin::api-forms.notification",
  ({ strapi }) => ({
    async process(handler: any, submission: any, form: FormType) {
      return await strapi
        .plugin("api-forms")
        .service(handler.service)
        .process(handler, submission, form);
    },
  })
);
