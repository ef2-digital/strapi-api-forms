//@ts-nocheck

import { Strapi } from '@strapi/strapi';
import { format } from 'date-fns';

export default ({ strapi }: { strapi: Strapi }) => {
    strapi.cron.add({
        // runs every second
        formActiveCheck: {
            task: async ({ strapi }) => {
                const today = format(new Date(), 'dd-MM-yyyy') + 'T00:00:00.000Z';
                const forms = await strapi.db.query('plugin::api-forms.form').findMany({
                    where: {
                        active: true,
                        date_till: {
                            $lte: today
                        }
                    }
                });

                Promise.all(
                    forms.map((form) =>
                        strapi.db.query('plugin::api-forms.form').update({
                            where: {
                                id: form.id
                            },
                            data: {
                                active: false
                            }
                        })
                    )
                )
                    .then(() => {
                        strapi.log.info('All forms updated');
                    })
                    .catch((error) => {
                        strapi.log.error('Error updating forms', error);
                    });

                strapi.log.info('Finished form active CRON');
            },
            options: {
                rule: '0 0  * * *'
            }
        }
    });
};
