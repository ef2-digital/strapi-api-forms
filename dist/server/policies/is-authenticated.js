"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (policyContext, config, { strapi }) => {
    const { body } = policyContext.request;
    const { user } = policyContext.state;
    console.log(policyContext);
    if (policyContext.state.user) {
        // if a session is open
        // go to next policy or reach the controller's action
        return true;
    }
    return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
