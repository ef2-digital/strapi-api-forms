const { ForbiddenError } = require("@strapi/utils").errors;

export default {
  async afterCreate(event) {
    const { result, params } = event;

    if (!result.id) {
      throw new ForbiddenError("No form");
    }

    const defaultEmail = await strapi.plugins[
      "email"
    ].services.email.getProviderSettings().settings.defaultFrom;

    return await strapi.entityService.create("plugin::api-forms.notification", {
      data: {
        form: result.id,
        enabled: true,
        identifier: "notification",
        service: "emailService",
        from: defaultEmail,
        to: defaultEmail,
        subject: "New submission from API form: " + result.title,
      },
    });
  },
};
