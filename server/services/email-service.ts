import { Strapi } from "@strapi/strapi";
const showdown = require("showdown");

import {
  FormType,
  NotificationType,
  SubmissionType,
} from "../../admin/src/utils/types";
import { format, parseISO } from "date-fns";

export default ({ strapi }: { strapi: Strapi }) => ({
  async process(
    notification: NotificationType,
    submission: SubmissionType,
    form: FormType
  ) {
    if (!notification || !submission) {
      return;
    }

    const fields = JSON.parse(submission.submission);
    const message = replaceDynamicVariables(notification.message, fields);

    const converter = new showdown.Converter({
      tables: true,
      strikethrough: true,
    });

    const emailAddress = validateEmail(notification.to)
      ? notification.to
      : getValueFromSubmissionByKey(notification.to, fields);

    strapi.log.info(
      JSON.stringify({
        to: emailAddress,
        from: notification.from,
        subject: notification.subject,
        html: converter.makeHtml(message),
      })
    );

    try {
      await strapi.plugins["email"].services.email.send({
        to: emailAddress,
        from: notification.from,
        subject: notification.subject,
        html: converter.makeHtml(message),
      });
    } catch (error) {
      strapi.log.error(error);
    }
  },
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email);
}

function getValueFromSubmissionByKey(key, submission) {
  console.log(key, submission);
  return submission[key];
}

function replaceDynamicVariables(message, submission) {
  const pattern = /\*\*\s*(.*?)\s*\*\*/g;
  let match;

  while ((match = pattern.exec(message)) !== null) {
    const variableName = match[1].replace(/['"]/g, "");

    const variableValue = submission[variableName];

    if (variableValue !== undefined) {
      message = message.replace(match[0], variableValue);
    }
  }

  const commentPattern = /<!--[\s\S]*?-->/g;
  message = message.replace(commentPattern, "");

  return message;
}
