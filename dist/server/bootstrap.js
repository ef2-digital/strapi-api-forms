"use strict";
//@ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
exports.default = ({ strapi }) => {
    strapi.cron.add({
        // runs every night at 00:00
        formActiveCheck: {
            task: async ({ strapi }) => {
                const today = (0, date_fns_1.format)(new Date(), 'dd-MM-yyyy') + 'T00:00:00.000Z';
                const activeForms = await strapi.db.query('plugin::api-forms.form').findMany({
                    where: {
                        active: true,
                        date_till: {
                            $lt: today
                        }
                    }
                });
                Promise.all(activeForms.map((form) => strapi.db.query('plugin::api-forms.form').update({
                    where: {
                        id: form.id
                    },
                    data: {
                        active: false
                    }
                })));
                const inactiveForms = await strapi.db.query('plugin::api-forms.form').findMany({
                    where: {
                        active: false,
                        date_from: {
                            $gte: today
                        },
                        date_till: {
                            $gte: today
                        }
                    }
                });
                Promise.all(inactiveForms.map((form) => strapi.db.query('plugin::api-forms.form').update({
                    where: {
                        id: form.id
                    },
                    data: {
                        active: true
                    }
                })));
                strapi.log.info('Finished form active CRON');
            },
            options: {
                rule: '0 0  * * *'
            }
        }
    });
};
