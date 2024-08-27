"use strict";
//@ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function compareDateWithToday(dateString, future) {
    const [day, month, year] = dateString.split('-');
    const isoDateString = `${year}-${month}-${day}`;
    const date = new Date(isoDateString);
    const todayDate = new Date();
    if (!future) {
        return date.getTime() < todayDate.getTime();
    }
    return date.getTime() > todayDate.getTime();
}
exports.default = ({ strapi }) => {
    strapi.cron.add({
        // runs every night at 00:00
        formActiveCheck: {
            task: async ({ strapi }) => {
                const activeForms = await strapi.db.query('plugin::api-forms.form').findMany({
                    where: {
                        active: true,
                        $and: [{ date_till: { $not: '' } }, { date_till: { $notNull: true } }],
                    },
                });
                const pastForms = activeForms.filter((form) => {
                    const [datePart, timePart] = form.dateTill.split('T');
                    return compareDateWithToday(datePart);
                });
                Promise.all(pastForms.map((form) => strapi.db.query('plugin::api-forms.form').update({
                    where: {
                        id: form.id,
                    },
                    data: {
                        active: false,
                    },
                })));
                const inActiveForms = await strapi.db.query('plugin::api-forms.form').findMany({
                    where: {
                        active: false,
                    },
                });
                const filteredInactiveForms = inActiveForms.filter((form) => {
                    if (form.dateFrom === '' && form.dateTill === '') {
                        return true;
                    }
                    const isInPast = compareDateWithToday(form.dateFrom.split('T')[0]);
                    const isInFuture = compareDateWithToday(form.dateTill.split('T')[0], true);
                    return isInPast || isInFuture;
                });
                Promise.all(filteredInactiveForms.map((form) => strapi.db.query('plugin::api-forms.form').update({
                    where: {
                        id: form.id,
                    },
                    data: {
                        active: true,
                    },
                })));
                strapi.log.info('Finished form active CRON');
            },
            options: {
                rule: '0 0 * * *',
            },
        },
    });
};
